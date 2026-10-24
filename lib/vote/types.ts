/** Shapes shared by the /vote pages and the /api/vote routes. */

export type VoteRole = "owner" | "manager" | "voter";

export interface VoteUser {
  id: string;
  name: string;
  phone: string;
  role: VoteRole;
}

export interface PollOptionView {
  id: string;
  label: string;
  /** Hidden from voters until they vote or the poll closes. */
  votes: number | null;
}

export interface PollView {
  id: string;
  question: string;
  description: string | null;
  isOpen: boolean;
  /** The stored status; a poll can still be closed by its end time while this says "open". */
  status: "open" | "closed";
  endsAt: string | null;
  createdAt: string;
  createdBy: string | null;
  options: PollOptionView[];
  totalVotes: number | null;
  myOptionId: string | null;
}

export interface VoteManager {
  id: string;
  name: string;
  phone: string;
  lastLoginAt: string | null;
}
