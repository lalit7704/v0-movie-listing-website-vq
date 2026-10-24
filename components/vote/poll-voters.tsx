"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Download, Loader2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { errorText, formatDateTime, voteRequest } from "@/components/vote/vote-api";
import { formatPhone } from "@/lib/vote/phone";
import type { PollView, PollVoter } from "@/lib/vote/types";

/** Spreadsheet apps run cells that start with these as formulas, and names are typed by voters. */
function csvCell(value: string) {
  const safe = /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;
  return `"${safe.replace(/"/g, '""')}"`;
}

function downloadCsv(poll: PollView, voters: PollVoter[]) {
  const lines = [
    ["Name", "Mobile", "Voted for", "Voted at"],
    // 10 digits without +91, so Excel shows the number as it is.
    ...voters.map((voter) => [voter.name, voter.phone.replace(/^\+91/, ""), voter.option, formatDateTime(voter.votedAt)]),
  ];
  // The BOM makes Excel read Hindi names as UTF-8.
  const csv = "﻿" + lines.map((line) => line.map(csvCell).join(",")).join("\r\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = `votes-${poll.question.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) || "poll"}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

/** Owner-only list of who voted for what. It loads fresh every time it is opened. */
export function PollVoters({ poll }: { poll: PollView }) {
  const [open, setOpen] = useState(false);
  const [voters, setVoters] = useState<PollVoter[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function toggle() {
    if (open) {
      setOpen(false);
      return;
    }
    setOpen(true);
    setVoters(null);
    setError(null);
    try {
      const data = await voteRequest<{ voters: PollVoter[] }>(
        `/api/vote/admin/votes?pollId=${encodeURIComponent(poll.id)}`
      );
      setVoters(data.voters);
    } catch (caught) {
      setError(errorText(caught));
    }
  }

  return (
    <div className="mt-4 border-t border-border pt-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Button variant="ghost" size="sm" className="gap-2 px-2" onClick={() => void toggle()}>
          <Users className="h-4 w-4" aria-hidden="true" />
          {open ? "Hide voters" : `Show voters (${poll.totalVotes ?? 0})`}
          {open ? <ChevronUp className="h-4 w-4" aria-hidden="true" /> : <ChevronDown className="h-4 w-4" aria-hidden="true" />}
        </Button>
        {open && voters && voters.length > 0 && (
          <Button variant="outline" size="sm" className="gap-2" onClick={() => downloadCsv(poll, voters)}>
            <Download className="h-4 w-4" aria-hidden="true" />
            Download CSV
          </Button>
        )}
      </div>

      {open && (
        <div className="mt-3">
          {error ? (
            <p className="text-sm text-yellow-300">{error}</p>
          ) : voters === null ? (
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" aria-label="Loading voters" />
          ) : voters.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nobody has voted yet.</p>
          ) : (
            <div className="max-h-96 overflow-auto rounded-md border border-border">
              <table className="w-full min-w-[520px] text-left text-sm">
                <thead className="sticky top-0 bg-card text-xs text-muted-foreground">
                  <tr className="border-b border-border">
                    <th className="px-3 py-2 font-medium">Name</th>
                    <th className="px-3 py-2 font-medium">Mobile</th>
                    <th className="px-3 py-2 font-medium">Voted for</th>
                    <th className="px-3 py-2 font-medium">Voted at</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {voters.map((voter, index) => (
                    <tr key={`${voter.phone}-${index}`}>
                      <td className="px-3 py-2 text-foreground">{voter.name}</td>
                      <td className="whitespace-nowrap px-3 py-2 tabular-nums text-muted-foreground">
                        {formatPhone(voter.phone)}
                      </td>
                      <td className="px-3 py-2 text-foreground">{voter.option}</td>
                      <td className="whitespace-nowrap px-3 py-2 text-muted-foreground">{formatDateTime(voter.votedAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
