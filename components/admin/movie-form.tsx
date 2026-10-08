"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { ClipboardPaste, ExternalLink, GitCommitHorizontal, Loader2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Notice } from "@/components/admin/notice";
import { MOVIE_CATEGORIES, slugify } from "@/lib/movie-source";

const EMPTY_FIELDS = {
  category: "Bollywood" as string,
  title: "",
  slug: "",
  id: "",
  videoUrl: "",
  downloadUrl: "",
  poster: "",
  description: "",
  seoDescription: "",
  year: String(new Date().getFullYear()),
  duration: "",
  rating: "",
  genre: "",
  language: "Hindi",
  quality: "HD",
  director: "",
  cast: "",
  keywords: "",
  featured: false,
};

type MovieFields = typeof EMPTY_FIELDS;
type TextField = Exclude<keyof MovieFields, "featured">;

interface AddResult {
  id: string;
  slug: string;
  file: string;
  commitUrl: string;
  pagePath: string;
}

const normalizeCategory = (value: string) => value.toLowerCase().replace(/[\s-]+/g, "");

/** Fills the form from a movie object written like the entries in the data files. */
function fieldsFromJson(text: string, current: MovieFields): MovieFields {
  const cleaned = text.trim().replace(/,\s*$/, "").replace(/,(\s*[}\]])/g, "$1");
  const data: unknown = JSON.parse(cleaned);
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new Error("Paste a single movie object, starting with { and ending with }");
  }

  const source = data as Record<string, unknown>;
  const next = { ...current };
  for (const key of Object.keys(EMPTY_FIELDS) as (keyof MovieFields)[]) {
    const value = source[key];
    // A pasted id usually belongs to an existing movie, so new ones always get a fresh id.
    if (key === "id" || key === "category" || value === undefined || value === null) continue;
    if (key === "featured") next.featured = Boolean(value);
    else next[key] = Array.isArray(value) ? value.join(", ") : String(value);
  }

  if (typeof source.category === "string") {
    const wanted = normalizeCategory(source.category);
    const match = MOVIE_CATEGORIES.find(
      (category) => normalizeCategory(category) === wanted || `${normalizeCategory(category)}s` === wanted
    );
    if (match) next.category = match;
  }
  return next;
}

function Field({
  id,
  label,
  hint,
  className,
  children,
}: {
  id: string;
  label: string;
  hint?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`space-y-1.5 ${className ?? ""}`}>
      <Label htmlFor={id}>{label}</Label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="rounded-lg border border-border bg-card p-4 sm:p-5">
      <legend className="px-1 text-sm font-semibold text-foreground">{title}</legend>
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

export function MovieForm() {
  const [fields, setFields] = useState<MovieFields>(EMPTY_FIELDS);
  const [jsonText, setJsonText] = useState("");
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AddResult | null>(null);

  const slugPreview = slugify(fields.slug || fields.title);

  const text = (name: TextField) => ({
    id: `movie-${name}`,
    name,
    value: fields[name],
    disabled: isSaving,
    onChange: (event: { target: { value: string } }) =>
      setFields((current) => ({ ...current, [name]: event.target.value })),
  });

  function applyJson() {
    setJsonError(null);
    try {
      setFields((current) => fieldsFromJson(jsonText, current));
      setJsonText("");
    } catch (caught) {
      setJsonError(caught instanceof Error ? caught.message : "That is not valid JSON");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/admin/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      const data = await response.json();
      if (!data.success) {
        setError(data.error || "Could not add the movie");
        return;
      }
      setResult(data as AddResult);
      setFields((current) => ({
        ...EMPTY_FIELDS,
        category: current.category,
        language: current.language,
        quality: current.quality,
      }));
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Network error");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="space-y-5">
      {result && (
        <Notice tone="success">
          <p className="font-semibold">
            Movie added with ID {result.id} to {result.file} and pushed to GitHub.
          </p>
          <p className="mt-1">Vercel will deploy it automatically; it shows on the site in about 1–3 minutes.</p>
          <div className="mt-3 flex flex-wrap gap-4">
            <a href={result.commitUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 underline">
              <GitCommitHorizontal className="h-4 w-4" aria-hidden="true" />
              View commit
            </a>
            <a href={result.pagePath} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 underline">
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              Movie page (after deploy)
            </a>
          </div>
        </Notice>
      )}

      <details className="rounded-lg border border-border bg-card p-4 sm:p-5">
        <summary className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-foreground">
          <ClipboardPaste className="h-4 w-4 text-primary" aria-hidden="true" />
          Paste movie JSON to fill the form
        </summary>
        <div className="mt-4 space-y-3">
          <Textarea
            rows={6}
            placeholder={'{\n  "title": "...",\n  "videoUrl": "...",\n  "genre": ["Action", "Drama"]\n}'}
            value={jsonText}
            onChange={(event) => setJsonText(event.target.value)}
            className="font-mono text-xs"
          />
          {jsonError && <p className="text-sm text-red-300">{jsonError}</p>}
          <Button type="button" variant="outline" size="sm" disabled={!jsonText.trim()} onClick={applyJson}>
            Fill form
          </Button>
        </div>
      </details>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Section title="Basic info">
          <Field id="movie-category" label="Category *">
            <select
              {...text("category")}
              className="border-input h-9 w-full rounded-md border bg-background px-3 text-sm text-foreground"
            >
              {MOVIE_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </Field>
          <Field id="movie-title" label="Title *">
            <Input {...text("title")} required placeholder="Saale Aashiq (2025) - Romantic Drama Movie" />
          </Field>
          <Field
            id="movie-slug"
            label="Slug"
            hint={slugPreview ? `Page: /movie/${slugPreview}` : "Leave empty to build it from the title"}
          >
            <Input {...text("slug")} placeholder="saale-aashiq-2025" />
          </Field>
          <Field id="movie-id" label="ID" hint="Leave empty for the next free ID">
            <Input {...text("id")} placeholder="Auto" />
          </Field>
        </Section>

        <Section title="Links">
          <Field id="movie-videoUrl" label="Video URL *">
            <Input {...text("videoUrl")} type="url" required placeholder="https://youtu.be/..." />
          </Field>
          <Field
            id="movie-downloadUrl"
            label="Download URL (Telegram)"
            hint="Full t.me link, or just the post number from the private channel"
          >
            <Input {...text("downloadUrl")} placeholder="https://t.me/c/3845134502/372" />
          </Field>
          <Field id="movie-poster" label="Poster URL *" className="sm:col-span-2">
            <div className="flex gap-3">
              <Input {...text("poster")} type="url" required placeholder="https://m.media-amazon.com/images/M/..." />
              {/^https?:\/\//.test(fields.poster) && (
                <img
                  src={fields.poster}
                  alt="Poster preview"
                  className="h-16 w-11 flex-shrink-0 rounded object-cover"
                  referrerPolicy="no-referrer"
                />
              )}
            </div>
          </Field>
        </Section>

        <Section title="Details">
          <Field id="movie-year" label="Year *">
            <Input {...text("year")} type="number" required min={1900} max={2100} />
          </Field>
          <Field id="movie-duration" label="Duration *">
            <Input {...text("duration")} required placeholder="2h 20m" />
          </Field>
          <Field id="movie-rating" label="Rating (0–10) *">
            <Input {...text("rating")} type="number" required min={0} max={10} step={0.1} placeholder="7.5" />
          </Field>
          <Field id="movie-genre" label="Genre *" hint="Comma separated">
            <Input {...text("genre")} required placeholder="Romance, Drama" />
          </Field>
          <Field id="movie-language" label="Language *">
            <Input {...text("language")} required />
          </Field>
          <Field id="movie-quality" label="Quality *">
            <Input {...text("quality")} required />
          </Field>
          <Field id="movie-director" label="Director">
            <Input {...text("director")} placeholder="Siddharth Singh, Garima Wahal" />
          </Field>
          <Field id="movie-cast" label="Cast" hint="Comma separated">
            <Input {...text("cast")} placeholder="Tahir Raj Bhasin, Mithila Palkar" />
          </Field>
          <Field id="movie-keywords" label="Keywords" hint="Comma separated" className="sm:col-span-2">
            <Input {...text("keywords")} placeholder="Saale Aashiq, Saale Aashiq 2025, Tahir Raj Bhasin" />
          </Field>
          <label className="flex items-center gap-2 text-sm text-foreground sm:col-span-2">
            <input
              type="checkbox"
              checked={fields.featured}
              disabled={isSaving}
              onChange={(event) => setFields((current) => ({ ...current, featured: event.target.checked }))}
              className="h-4 w-4 accent-primary"
            />
            Featured (shown in popular movie recommendations)
          </label>
        </Section>

        <Section title="Description">
          <Field id="movie-description" label="Description *" className="sm:col-span-2">
            <Textarea {...text("description")} required rows={8} />
          </Field>
          <Field id="movie-seoDescription" label="SEO description" className="sm:col-span-2">
            <Textarea {...text("seoDescription")} rows={3} />
          </Field>
        </Section>

        {error && <Notice tone="error">{error}</Notice>}

        <Button type="submit" disabled={isSaving} className="h-11 w-full gap-2 font-semibold">
          {isSaving ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <Upload className="h-4 w-4" aria-hidden="true" />
          )}
          {isSaving ? "Adding and pushing..." : "Add Movie & Push"}
        </Button>
      </form>
    </div>
  );
}
