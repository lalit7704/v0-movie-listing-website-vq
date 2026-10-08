"use client";

import { useState, type FormEvent } from "react";
import { LogIn, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/components/auth-provider";

export function AdminLogin() {
  const { signInWithEmail } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    setBusy(true);
    const result = await signInWithEmail(email.trim(), password);
    setBusy(false);
    if (result.error) setMessage(result.error);
  }

  return (
    <section className="mx-auto max-w-md rounded-lg border border-border bg-card p-6 shadow-xl sm:p-8">
      <div className="mb-6 text-center">
        <ShieldCheck className="mx-auto mb-3 h-10 w-10 text-primary" aria-hidden="true" />
        <h1 className="text-2xl font-bold text-foreground">Admin Login</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Only the owner and users added by the owner can open the admin panel.
        </p>
      </div>

      <form className="space-y-3" onSubmit={handleSubmit}>
        <Input
          type="email"
          required
          autoComplete="email"
          placeholder="Email address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Input
          type="password"
          required
          autoComplete="current-password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        {message && <p className="text-sm text-yellow-300">{message}</p>}
        <Button className="w-full gap-2" type="submit" disabled={busy}>
          <LogIn className="h-4 w-4" aria-hidden="true" />
          {busy ? "Please wait..." : "Login"}
        </Button>
      </form>
    </section>
  );
}
