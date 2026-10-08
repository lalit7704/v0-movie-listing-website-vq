import type { Video } from "@/data/videos";

/** Categories the admin form can add to, with the data file and array each one lives in. */
export const MOVIE_CATEGORIES = ["Bollywood", "Hollywood", "South Indian", "Web Series", "Cartoon"] as const;
export type MovieCategory = (typeof MOVIE_CATEGORIES)[number];

export const CATEGORY_SOURCES: Record<MovieCategory, { file: string; exportName: string }> = {
  Bollywood: { file: "data/bollywood.ts", exportName: "bollywoodVideos" },
  Hollywood: { file: "data/hollywood.ts", exportName: "hollywoodVideos" },
  "South Indian": { file: "data/south-indian.ts", exportName: "southindianVideos" },
  "Web Series": { file: "data/web-series.ts", exportName: "webSeriesVideos" },
  Cartoon: { file: "data/cartoon.ts", exportName: "cartoonVideos" },
};

/** Same rules as generateSlug in data/videos.ts, without pulling the movie data into the browser. */
export function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** A bare number is treated as a post in the private download channel. */
export function normalizeDownloadUrl(value: string) {
  const trimmed = value.trim();
  return /^\d+$/.test(trimmed) ? `https://t.me/c/3845134502/${trimmed}` : trimmed;
}

const FIELD_ORDER: (keyof Video)[] = [
  "id",
  "title",
  "slug",
  "videoUrl",
  "downloadUrl",
  "poster",
  "description",
  "seoDescription",
  "category",
  "year",
  "duration",
  "rating",
  "genre",
  "language",
  "quality",
  "featured",
  "director",
  "cast",
  "keywords",
];

/** Formats a movie the way entries are hand-written in the data files. */
export function serializeMovie(movie: Video, eol = "\n") {
  const lines = FIELD_ORDER.filter((key) => movie[key] !== undefined).map((key) => {
    const value = movie[key];
    const json = Array.isArray(value)
      ? `[${value.map((item) => JSON.stringify(item)).join(", ")}]`
      : JSON.stringify(value);
    return `  ${JSON.stringify(key)}: ${json}`;
  });
  return `{${eol}${lines.join(`,${eol}`)}${eol}}`;
}

/** Index of the quote that closes the string starting at `start`. */
function skipString(source: string, start: number) {
  const quote = source[start];
  for (let i = start + 1; i < source.length; i++) {
    if (source[i] === "\\") i++;
    else if (source[i] === quote) return i;
  }
  throw new Error("Unterminated string in data file");
}

/**
 * Finds the array literal assigned to `export const <exportName>` and returns the
 * position just after its last element, skipping strings and comments on the way.
 */
function locateArrayEnd(source: string, exportName: string) {
  const declaration = new RegExp(`export\\s+const\\s+${exportName}\\b[^=]*=\\s*\\[`).exec(source);
  if (!declaration) throw new Error(`Could not find ${exportName} in the data file`);

  let depth = 0;
  let lastEnd = -1;
  let lastChar = "";
  for (let i = declaration.index + declaration[0].length - 1; i < source.length; i++) {
    const char = source[i];

    if (char === "/" && source[i + 1] === "/") {
      const lineEnd = source.indexOf("\n", i);
      if (lineEnd === -1) break;
      i = lineEnd;
      continue;
    }
    if (char === "/" && source[i + 1] === "*") {
      const commentEnd = source.indexOf("*/", i + 2);
      if (commentEnd === -1) break;
      i = commentEnd + 1;
      continue;
    }
    if (/\s/.test(char)) continue;

    if (char === '"' || char === "'" || char === "`") {
      i = skipString(source, i);
    } else if (char === "[" || char === "{" || char === "(") {
      depth++;
    } else if (char === "]" || char === "}" || char === ")") {
      depth--;
      if (depth === 0) return { insertAt: lastEnd, lastChar };
    }
    lastEnd = i + 1;
    lastChar = source[i];
  }
  throw new Error(`The ${exportName} array is not closed`);
}

/** Appends `movie` as the last entry of the `exportName` array. */
export function insertMovie(source: string, exportName: string, movie: Video) {
  const eol = source.includes("\r\n") ? "\r\n" : "\n";
  const { insertAt, lastChar } = locateArrayEnd(source, exportName);
  const separator = lastChar === "[" || lastChar === "," ? "" : ",";
  return (
    source.slice(0, insertAt) + separator + eol + serializeMovie(movie, eol) + source.slice(insertAt)
  );
}

/** Literal string values of `key` in a data file (e.g. every "id": "2001"). */
export function getUsedValues(source: string, key: "id" | "slug") {
  const pattern = new RegExp(`(?<![\\w$])["']?${key}["']?\\s*:\\s*["']([^"']+)["']`, "g");
  return [...source.matchAll(pattern)].map((match) => match[1]);
}

/** Continues the file's most recent numeric id, skipping any id already taken. */
export function nextMovieId(source: string, takenIds: Set<string>) {
  const numericIds = getUsedValues(source, "id").filter((id) => /^\d+$/.test(id));
  let candidate = Number(numericIds.at(-1) ?? 1000) + 1;
  while (takenIds.has(String(candidate))) candidate++;
  return String(candidate);
}
