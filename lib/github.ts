const GITHUB_API = "https://api.github.com";

export class GitHubError extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}

function getConfig() {
  return {
    token: process.env.GITHUB_TOKEN || "",
    repo: process.env.GITHUB_REPO || "lalit7704/v0-movie-listing-website-vq",
    branch: process.env.GITHUB_BRANCH || "main",
  };
}

export function isGitHubConfigured() {
  return Boolean(process.env.GITHUB_TOKEN);
}

async function github<T>(path: string, init: RequestInit & { raw?: boolean } = {}): Promise<T> {
  const { token, repo } = getConfig();
  const { raw, ...requestInit } = init;
  const response = await fetch(`${GITHUB_API}/repos/${repo}${path}`, {
    ...requestInit,
    cache: "no-store",
    headers: {
      Accept: raw ? "application/vnd.github.raw+json" : "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      ...(requestInit.body ? { "Content-Type": "application/json" } : {}),
    },
  });

  if (!response.ok) {
    const detail = (await response.json().catch(() => null)) as { message?: string } | null;
    throw new GitHubError(
      `GitHub: ${detail?.message || `request failed (${response.status})`}`,
      response.status
    );
  }

  return (raw ? await response.text() : await response.json()) as T;
}

/**
 * Reads `path` at the branch head, rewrites it with `update`, and pushes a commit.
 * Uses the Git data API so large data files work, and retries when the branch
 * moved underneath us (the ref update is then not a fast-forward).
 */
export async function updateRepoFile(
  path: string,
  message: string,
  update: (content: string) => string
): Promise<{ commitSha: string; commitUrl: string }> {
  const { branch } = getConfig();

  for (let attempt = 0; ; attempt++) {
    const ref = await github<{ object: { sha: string } }>(`/git/ref/heads/${branch}`);
    const parentSha = ref.object.sha;
    const parent = await github<{ tree: { sha: string } }>(`/git/commits/${parentSha}`);
    const current = await github<string>(`/contents/${path}?ref=${parentSha}`, { raw: true });

    const tree = await github<{ sha: string }>("/git/trees", {
      method: "POST",
      body: JSON.stringify({
        base_tree: parent.tree.sha,
        tree: [{ path, mode: "100644", type: "blob", content: update(current) }],
      }),
    });
    const commit = await github<{ sha: string; html_url: string }>("/git/commits", {
      method: "POST",
      body: JSON.stringify({ message, tree: tree.sha, parents: [parentSha] }),
    });

    try {
      await github(`/git/refs/heads/${branch}`, {
        method: "PATCH",
        body: JSON.stringify({ sha: commit.sha, force: false }),
      });
      return { commitSha: commit.sha, commitUrl: commit.html_url };
    } catch (error) {
      if (attempt < 2 && error instanceof GitHubError && error.status === 422) continue;
      throw error;
    }
  }
}
