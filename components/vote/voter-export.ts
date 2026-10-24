import { formatDateTime } from "@/components/vote/vote-api";
import { formatPhone } from "@/lib/vote/phone";
import type { PollView, PollVoter } from "@/lib/vote/types";

/** votes-which-movie-should-we-add-next, used for both the CSV and the PDF file name. */
function exportName(poll: PollView) {
  const slug = poll.question.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40);
  return `votes-${slug || "poll"}`;
}

/** Spreadsheet apps run cells that start with these as formulas, and names are typed by voters. */
function csvCell(value: string) {
  const safe = /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;
  return `"${safe.replace(/"/g, '""')}"`;
}

export function downloadCsv(poll: PollView, voters: PollVoter[]) {
  const lines = [
    ["Name", "Mobile", "Voted for", "Voted at"],
    // 10 digits without +91, so Excel shows the number as it is.
    ...voters.map((voter) => [voter.name, voter.phone.replace(/^\+91/, ""), voter.option, formatDateTime(voter.votedAt)]),
  ];
  // The BOM makes Excel read Hindi names as UTF-8.
  const csv = "\uFEFF" + lines.map((line) => line.map(csvCell).join(",")).join("\r\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = `${exportName(poll)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

const htmlEntities: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

/** Voter names go into a page on this site's origin, so they must never become markup. */
function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => htmlEntities[char]);
}

const reportStyles = `
  @page { size: A4; margin: 14mm; }
  * { box-sizing: border-box; }
  body { margin: 0; padding: 24px; color: #111; background: #fff;
    font: 12px/1.45 "Segoe UI", "Nirmala UI", "Noto Sans", "Noto Sans Devanagari", Arial, sans-serif; }
  h1 { margin: 0 0 4px; font-size: 20px; }
  h2 { margin: 22px 0 8px; font-size: 14px; }
  .meta { margin: 0; color: #555; }
  table { width: 100%; border-collapse: collapse; }
  th, td { padding: 6px 8px; border: 1px solid #d4d4d4; text-align: left; vertical-align: top; }
  th { background: #f2f2f2; font-weight: 600; }
  thead { display: table-header-group; }
  tr { break-inside: avoid; }
  .num { text-align: right; font-variant-numeric: tabular-nums; }
  .nowrap { white-space: nowrap; }
  .results { width: auto; min-width: 50%; }
  @media print { body { padding: 0; } }
`;

/** A print-ready page with the poll's results and every voter. */
export function buildVoterReport(poll: PollView, voters: PollVoter[], printedAt = new Date()) {
  const total = poll.totalVotes ?? 0;
  const results = poll.options
    .map((option) => {
      const votes = option.votes ?? 0;
      const percent = total ? Math.round((votes / total) * 100) : 0;
      return `<tr><td>${escapeHtml(option.label)}</td><td class="num">${votes}</td><td class="num">${percent}%</td></tr>`;
    })
    .join("");
  const rows = voters
    .map(
      (voter, index) =>
        `<tr><td class="num">${index + 1}</td><td>${escapeHtml(voter.name)}</td>` +
        `<td class="nowrap">${escapeHtml(formatPhone(voter.phone))}</td><td>${escapeHtml(voter.option)}</td>` +
        `<td class="nowrap">${escapeHtml(formatDateTime(voter.votedAt))}</td></tr>`
    )
    .join("");

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(exportName(poll))}</title>
<style>${reportStyles}</style>
</head>
<body>
<h1>${escapeHtml(poll.question)}</h1>
<p class="meta">Onemovie voting · ${poll.isOpen ? "Open" : "Closed"} · ${total} ${total === 1 ? "vote" : "votes"} · Downloaded ${escapeHtml(formatDateTime(printedAt.toISOString()))}</p>
<h2>Results</h2>
<table class="results">
<thead><tr><th>Option</th><th class="num">Votes</th><th class="num">%</th></tr></thead>
<tbody>${results}</tbody>
</table>
<h2>Voters</h2>
<table>
<thead><tr><th class="num">#</th><th>Name</th><th>Mobile</th><th>Voted for</th><th>Voted at</th></tr></thead>
<tbody>${rows}</tbody>
</table>
</body>
</html>`;
}

/**
 * Opens the report in a new tab and starts printing, where "Save as PDF" makes the file.
 * The browser lays out Hindi names correctly, which PDF libraries do not. Returns false if pop-ups are blocked.
 */
export function openVoterPdf(poll: PollView, voters: PollVoter[]) {
  const report = window.open("", "_blank");
  if (!report) return false;
  report.document.open();
  report.document.write(buildVoterReport(poll, voters));
  report.document.close();
  report.focus();
  // Give the new tab a moment to lay out the table before the print dialog takes a snapshot.
  report.setTimeout(() => report.print(), 300);
  return true;
}
