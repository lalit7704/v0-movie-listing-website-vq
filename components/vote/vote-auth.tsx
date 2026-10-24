"use client";

import { useEffect, useState, type FormEvent } from "react";
import { ArrowLeft, KeyRound, Loader2, Vote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Notice } from "@/components/admin/notice";
import { errorText, voteRequest } from "@/components/vote/vote-api";
import type { VoteUser } from "@/lib/vote/types";

type Mode = "login" | "signup";

interface Challenge {
  challengeId: string;
  sentTo: string;
  resendAfter: number;
  devCode?: string;
}

/**
 * Signup: name + phone + password, then the OTP creates the account.
 * Login: phone + password, then the OTP signs in.
 */
export function VoteAuth({ heading, onSignedIn }: { heading: string; onSignedIn: (user: VoteUser) => void }) {
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [code, setCode] = useState("");
  const [resendIn, setResendIn] = useState(0);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (resendIn <= 0) return;
    const timer = setTimeout(() => setResendIn((seconds) => seconds - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendIn]);

  async function requestOtp() {
    setMessage(null);
    setBusy(true);
    try {
      const body = mode === "signup" ? { name, phone, password } : { phone, password };
      const data = await voteRequest<Challenge>(`/api/vote/auth/${mode}`, "POST", body);
      setChallenge(data);
      setCode("");
      setResendIn(data.resendAfter);
    } catch (caught) {
      setMessage(errorText(caught));
    } finally {
      setBusy(false);
    }
  }

  function handleDetails(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (mode === "signup" && password !== confirmPassword) {
      setMessage("Both passwords must match");
      return;
    }
    void requestOtp();
  }

  async function verify(value: string) {
    if (!challenge || busy || value.length !== 6) return;
    setMessage(null);
    setBusy(true);
    try {
      const data = await voteRequest<{ user: VoteUser }>("/api/vote/auth/verify", "POST", {
        challengeId: challenge.challengeId,
        code: value,
      });
      onSignedIn(data.user);
    } catch (caught) {
      setMessage(errorText(caught));
      setCode("");
      setBusy(false);
    }
  }

  function switchMode(next: string) {
    setMode(next as Mode);
    setMessage(null);
    setPassword("");
    setConfirmPassword("");
  }

  return (
    <section className="mx-auto max-w-md rounded-lg border border-border bg-card p-6 shadow-xl sm:p-8">
      <div className="mb-6 text-center">
        <Vote className="mx-auto mb-3 h-10 w-10 text-primary" aria-hidden="true" />
        <h1 className="text-2xl font-bold text-foreground">{heading}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {challenge
            ? `Enter the 6 digit OTP sent to ${challenge.sentTo}.`
            : mode === "signup"
              ? "Create your account with your mobile number and a password."
              : "Login with your mobile number and password. We will send an OTP to confirm."}
        </p>
      </div>

      {challenge ? (
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            void verify(code);
          }}
        >
          {challenge.devCode && (
            <Notice tone="warning">
              Test mode: no SMS provider is set up, so the OTP is <strong>{challenge.devCode}</strong>.
            </Notice>
          )}
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={code}
              onChange={setCode}
              onComplete={(value: string) => void verify(value)}
              disabled={busy}
              autoFocus
              inputMode="numeric"
              pattern="^[0-9]+$"
              aria-label="OTP"
            >
              <InputOTPGroup>
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <InputOTPSlot key={index} index={index} className="h-11 w-11 text-base" />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>
          {message && <p className="text-center text-sm text-yellow-300">{message}</p>}
          <Button className="w-full gap-2" type="submit" disabled={busy || code.length !== 6}>
            {busy ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <KeyRound className="h-4 w-4" aria-hidden="true" />
            )}
            {mode === "signup" ? "Verify and create account" : "Verify and login"}
          </Button>
          <div className="flex items-center justify-between text-sm">
            <button
              type="button"
              className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
              onClick={() => {
                setChallenge(null);
                setMessage(null);
              }}
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Change number
            </button>
            <button
              type="button"
              className="text-primary hover:underline disabled:cursor-not-allowed disabled:text-muted-foreground disabled:no-underline"
              disabled={busy || resendIn > 0}
              onClick={() => void requestOtp()}
            >
              {resendIn > 0 ? `Resend OTP in ${resendIn}s` : "Resend OTP"}
            </button>
          </div>
        </form>
      ) : (
        <>
          <Tabs value={mode} onValueChange={switchMode} className="mb-5">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Create account</TabsTrigger>
            </TabsList>
          </Tabs>

          <form className="space-y-4" onSubmit={handleDetails}>
            {mode === "signup" && (
              <div className="space-y-1.5">
                <Label htmlFor="vote-name">Your name</Label>
                <Input
                  id="vote-name"
                  required
                  minLength={2}
                  maxLength={60}
                  autoComplete="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
            )}
            <div className="space-y-1.5">
              <Label htmlFor="vote-phone">Mobile number</Label>
              <div className="flex">
                <span className="inline-flex items-center rounded-l-md border border-r-0 border-input bg-muted px-3 text-sm text-muted-foreground">
                  +91
                </span>
                <Input
                  id="vote-phone"
                  type="tel"
                  required
                  inputMode="numeric"
                  autoComplete="tel-national"
                  placeholder="10 digit number"
                  className="rounded-l-none"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="vote-password">Password</Label>
              <Input
                id="vote-password"
                type="password"
                required
                minLength={mode === "signup" ? 6 : 1}
                maxLength={72}
                autoComplete={mode === "signup" ? "new-password" : "current-password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              {mode === "signup" && <p className="text-xs text-muted-foreground">At least 6 characters.</p>}
            </div>
            {mode === "signup" && (
              <div className="space-y-1.5">
                <Label htmlFor="vote-password-confirm">Confirm password</Label>
                <Input
                  id="vote-password-confirm"
                  type="password"
                  required
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
              </div>
            )}
            {message && <p className="text-sm text-yellow-300">{message}</p>}
            <Button className="w-full gap-2" type="submit" disabled={busy}>
              {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
              Send OTP
            </Button>
          </form>
        </>
      )}
    </section>
  );
}
