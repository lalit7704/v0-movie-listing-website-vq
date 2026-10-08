"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { Loader2, Trash2, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Notice } from "@/components/admin/notice";

interface AdminUser {
  id: string;
  email: string;
  lastSignInAt: string | null;
}

export function AdminUsers() {
  const [users, setUsers] = useState<AdminUser[] | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ tone: "success" | "error"; text: string } | null>(null);

  const loadUsers = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/users", { cache: "no-store" });
      const data = await response.json();
      if (data.success) setUsers(data.users);
      else setMessage({ tone: "error", text: data.error || "Could not load users" });
    } catch (caught) {
      setMessage({ tone: "error", text: caught instanceof Error ? caught.message : "Network error" });
    }
  }, []);

  useEffect(() => {
    void loadUsers();
  }, [loadUsers]);

  async function handleAdd(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage(null);
    try {
      const response = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!data.success) {
        setMessage({ tone: "error", text: data.error || "Could not add user" });
        return;
      }
      setMessage({
        tone: "success",
        text: `${email} can now log in at /admin with this email and password.`,
      });
      setEmail("");
      setPassword("");
      await loadUsers();
    } catch (caught) {
      setMessage({ tone: "error", text: caught instanceof Error ? caught.message : "Network error" });
    } finally {
      setBusy(false);
    }
  }

  async function handleRemove(user: AdminUser) {
    if (!window.confirm(`Remove admin access for ${user.email}?`)) return;
    setBusy(true);
    setMessage(null);
    try {
      const response = await fetch(`/api/admin/users?id=${encodeURIComponent(user.id)}`, { method: "DELETE" });
      const data = await response.json();
      setMessage(
        data.success
          ? { tone: "success", text: `${user.email} can no longer open the admin panel.` }
          : { tone: "error", text: data.error || "Could not remove user" }
      );
      await loadUsers();
    } catch (caught) {
      setMessage({ tone: "error", text: caught instanceof Error ? caught.message : "Network error" });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-5">
      {message && <Notice tone={message.tone}>{message.text}</Notice>}

      <form onSubmit={handleAdd} className="rounded-lg border border-border bg-card p-4 sm:p-5">
        <h2 className="mb-1 text-base font-semibold text-foreground">Add a user</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Added users can add movies and use the Telegram tools. Only you can manage users.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="admin-user-email">Email *</Label>
            <Input
              id="admin-user-email"
              type="email"
              required
              value={email}
              disabled={busy}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="admin-user-password">Password *</Label>
            <Input
              id="admin-user-password"
              type="password"
              autoComplete="new-password"
              required
              minLength={6}
              value={password}
              disabled={busy}
              onChange={(event) => setPassword(event.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              At least 6 characters. They log in with this email and password.
            </p>
          </div>
        </div>
        <Button type="submit" className="mt-4 gap-2" disabled={busy}>
          {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <UserPlus className="h-4 w-4" aria-hidden="true" />}
          Add user
        </Button>
      </form>

      <section className="rounded-lg border border-border bg-card p-4 sm:p-5">
        <h2 className="mb-4 text-base font-semibold text-foreground">Users with access</h2>
        {users === null ? (
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" aria-label="Loading users" />
        ) : users.length === 0 ? (
          <p className="text-sm text-muted-foreground">Only you have access right now.</p>
        ) : (
          <ul className="divide-y divide-border">
            {users.map((user) => (
              <li key={user.id} className="flex items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{user.email}</p>
                  <p className="text-xs text-muted-foreground">
                    {user.lastSignInAt
                      ? `Last login ${new Date(user.lastSignInAt).toLocaleString()}`
                      : "Has not logged in yet"}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={busy}
                  onClick={() => void handleRemove(user)}
                  aria-label={`Remove ${user.email}`}
                  title="Remove access"
                >
                  <Trash2 className="h-4 w-4 text-red-400" aria-hidden="true" />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
