"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Download, FileText, Loader2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { errorText, formatDateTime, voteRequest } from "@/components/vote/vote-api";
import { downloadCsv, openVoterPdf } from "@/components/vote/voter-export";
import { formatPhone } from "@/lib/vote/phone";
import type { PollView, PollVoter } from "@/lib/vote/types";

/** Owner-only list of who voted for what. It loads fresh every time it is opened. */
export function PollVoters({ poll }: { poll: PollView }) {
  const [open, setOpen] = useState(false);
  const [voters, setVoters] = useState<PollVoter[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [popupBlocked, setPopupBlocked] = useState(false);

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
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              title="Opens the print box. Choose Save as PDF there."
              onClick={() => setPopupBlocked(!openVoterPdf(poll, voters))}
            >
              <FileText className="h-4 w-4" aria-hidden="true" />
              Download PDF
            </Button>
            <Button variant="outline" size="sm" className="gap-2" onClick={() => downloadCsv(poll, voters)}>
              <Download className="h-4 w-4" aria-hidden="true" />
              Download CSV
            </Button>
          </div>
        )}
      </div>

      {open && popupBlocked && (
        <p className="mt-2 text-sm text-yellow-300">
          Your browser blocked the new tab. Allow pop-ups for this site, then press Download PDF again.
        </p>
      )}

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
