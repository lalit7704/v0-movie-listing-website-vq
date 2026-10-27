"use client";

import { useEffect, useState, type FormEvent } from "react";
import { ArrowLeft, Check, Eye, EyeOff, Loader2, Send, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Notice } from "@/components/admin/notice";
import { CAMPAIGN, Eyebrow } from "@/components/vote/vote-ui";
import { errorText, voteRequest } from "@/components/vote/vote-api";
import type { VoteUser } from "@/lib/vote/types";

type Mode = "login" | "signup";

interface Challenge {
  challengeId: string;
  sentTo: string;
  resendAfter: number;
  /** See OtpDelivery in lib/vote/otp.ts. */
  delivery: "telegram" | "link" | "dev";
  telegramLink: string | null;
  devCode?: string;
}

const challengeText: Record<Challenge["delivery"], (sentTo: string) => string> = {
  telegram: (sentTo) => `हमने आपके Telegram (${sentTo}) पर 6 अंकों का कोड भेजा है।`,
  link: (sentTo) => `${sentTo} के लिए 6 अंकों का कोड हमारे Telegram बॉट से लें।`,
  dev: (sentTo) => `${sentTo} के लिए 6 अंकों का कोड डालें।`,
};

const panels = {
  voter: {
    ...CAMPAIGN,
    intro: "सिर्फ़ तीन आसान स्टेप में:",
    steps: [
      ["अपना अकाउंट बनाएँ", "मोबाइल नंबर और पासवर्ड से।"],
      ["Telegram पर वेरिफ़ाई करें", "हमारा बॉट आपको 6 अंकों का कोड भेजेगा।"],
      ["अपना वोट डालें", "हर पोल में एक व्यक्ति, एक वोट।"],
    ],
  },
  admin: {
    eyebrow: "वोटिंग एडमिन",
    title: "चुनाव के पोल संभालें",
    intro: "सिर्फ़ मुख्य एडमिन और उनके जोड़े गए मैनेजर के लिए।",
    steps: [
      ["लॉग इन करें", "वही मोबाइल नंबर जो मुख्य एडमिन ने जोड़ा है।"],
      ["Telegram पर वेरिफ़ाई करें", "हमारा बॉट आपको 6 अंकों का कोड भेजेगा।"],
      ["पोल संभालें", "पोल बनाएँ, बंद करें और नतीजे देखें।"],
    ],
  },
};

/**
 * Signup: name + phone + password, then the Telegram OTP creates the account.
 * Login: phone + password, then the Telegram OTP signs in.
 */
export function VoteAuth({
  audience,
  onSignedIn,
}: {
  audience: keyof typeof panels;
  onSignedIn: (user: VoteUser) => void;
}) {
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [code, setCode] = useState("");
  const [resendIn, setResendIn] = useState(0);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const panel = panels[audience];
  const activeStep = challenge ? 1 : 0;

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
      setMessage("दोनों पासवर्ड एक जैसे होने चाहिए");
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

  function switchMode(next: Mode) {
    setMode(next);
    setMessage(null);
    setPassword("");
    setConfirmPassword("");
  }

  const title = challenge ? "अपना नंबर वेरिफ़ाई करें" : mode === "signup" ? "नया अकाउंट बनाएँ" : "लॉग इन करें";
  const subtitle = challenge
    ? challengeText[challenge.delivery](challenge.sentTo)
    : mode === "signup"
      ? "बस एक मिनट लगेगा। आपका नंबर Telegram पर वेरिफ़ाई होगा।"
      : "अपने मोबाइल नंबर और पासवर्ड से लॉग इन करें।";

  return (
    <section lang="hi" className="mx-auto grid max-w-4xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/40 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
      <aside className="relative hidden flex-col justify-between gap-10 overflow-hidden border-r border-border p-8 md:flex lg:p-10">
        <div aria-hidden="true" className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative">
          <Eyebrow>{panel.eyebrow}</Eyebrow>
          <h2 className="mt-2 text-2xl font-bold leading-snug text-foreground">{panel.title}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{panel.intro}</p>
          <ol className="mt-8 space-y-6">
            {panel.steps.map(([stepTitle, stepText], index) => (
              <li key={stepTitle} className="flex gap-4">
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold ring-1 ring-inset ${
                    index < activeStep
                      ? "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30"
                      : index === activeStep
                        ? "bg-primary text-primary-foreground ring-primary"
                        : "bg-white/5 text-muted-foreground ring-white/10"
                  }`}
                >
                  {index < activeStep ? <Check className="h-4 w-4" aria-hidden="true" /> : index + 1}
                </span>
                <div>
                  <p className={`text-sm font-semibold ${index <= activeStep ? "text-foreground" : "text-muted-foreground"}`}>
                    {stepTitle}
                  </p>
                  <p className="mt-0.5 text-sm text-muted-foreground">{stepText}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <p className="relative flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
          आपका मोबाइल नंबर किसी दूसरे वोटर को नहीं दिखाया जाता।
        </p>
      </aside>

      <div className="p-6 sm:p-10">
        <div className="mb-6 border-b border-border pb-5 md:hidden">
          <Eyebrow>{panel.eyebrow}</Eyebrow>
          <p className="mt-1 text-lg font-bold leading-snug text-foreground">{panel.title}</p>
        </div>
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>

        {challenge ? (
          <form
            className="mt-6 space-y-5"
            onSubmit={(event) => {
              event.preventDefault();
              void verify(code);
            }}
          >
            {challenge.devCode && (
              <Notice tone="warning">
                टेस्ट मोड: Telegram बॉट सेट नहीं है, इसलिए कोड है <strong>{challenge.devCode}</strong>।
              </Notice>
            )}
            {challenge.delivery === "link" && (
              <ol className="space-y-2 rounded-lg border border-border bg-white/[0.02] p-4 text-sm text-muted-foreground">
                {["नीचे “Telegram खोलें” दबाएँ।", "Start दबाएँ, फिर “अपना फ़ोन नंबर शेयर करें” दबाएँ।", "बॉट से मिला 6 अंकों का कोड यहाँ डालें।"].map(
                  (step, index) => (
                    <li key={step} className="flex gap-3">
                      <span className="font-semibold tabular-nums text-foreground">{index + 1}.</span>
                      {step}
                    </li>
                  )
                )}
              </ol>
            )}
            {challenge.telegramLink && (
              <Button
                asChild
                variant={challenge.delivery === "link" ? "default" : "outline"}
                className={`w-full gap-2 ${challenge.delivery === "link" ? "h-11 bg-[#229ED9] text-white hover:bg-[#1c8ec4]" : ""}`}
              >
                <a href={challenge.telegramLink} target="_blank" rel="noopener noreferrer">
                  <Send className="h-4 w-4" aria-hidden="true" />
                  Telegram खोलें
                </a>
              </Button>
            )}
            <div>
              <Label className="mb-2 block">6 अंकों का कोड</Label>
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
                    <InputOTPSlot key={index} index={index} className="h-12 w-11 text-lg sm:w-12" />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>
            {message && <p className="text-sm text-yellow-300">{message}</p>}
            <Button size="lg" className="w-full gap-2" type="submit" disabled={busy || code.length !== 6}>
              {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
              {mode === "signup" ? "वेरिफ़ाई करके अकाउंट बनाएँ" : "वेरिफ़ाई करके लॉग इन करें"}
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
                नंबर बदलें
              </button>
              <button
                type="button"
                className="font-medium text-primary hover:underline disabled:cursor-not-allowed disabled:font-normal disabled:text-muted-foreground disabled:no-underline"
                disabled={busy || resendIn > 0}
                onClick={() => void requestOtp()}
              >
                {resendIn > 0 ? `${resendIn} सेकंड में दोबारा भेजें` : "कोड दोबारा भेजें"}
              </button>
            </div>
          </form>
        ) : (
          <form className="mt-6 space-y-4" onSubmit={handleDetails}>
            {mode === "signup" && (
              <div className="space-y-1.5">
                <Label htmlFor="vote-name">पूरा नाम</Label>
                <Input
                  id="vote-name"
                  required
                  minLength={2}
                  maxLength={60}
                  autoComplete="name"
                  placeholder="जैसा आप दिखाना चाहें"
                  className="h-11"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
            )}
            <div className="space-y-1.5">
              <Label htmlFor="vote-phone">मोबाइल नंबर</Label>
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
                  placeholder="98765 43210"
                  className="h-11 rounded-l-none"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="vote-password">पासवर्ड</Label>
              <div className="relative">
                <Input
                  id="vote-password"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={mode === "signup" ? 6 : 1}
                  maxLength={72}
                  autoComplete={mode === "signup" ? "new-password" : "current-password"}
                  placeholder={mode === "signup" ? "कम से कम 6 अक्षर" : undefined}
                  className="h-11 pr-11"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? "पासवर्ड छुपाएँ" : "पासवर्ड दिखाएँ"}
                  onClick={() => setShowPassword((shown) => !shown)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
                </button>
              </div>
            </div>
            {mode === "signup" && (
              <div className="space-y-1.5">
                <Label htmlFor="vote-password-confirm">पासवर्ड दोबारा डालें</Label>
                <Input
                  id="vote-password-confirm"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  className="h-11"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
              </div>
            )}
            {message && <p className="text-sm text-yellow-300">{message}</p>}
            <Button size="lg" className="w-full gap-2" type="submit" disabled={busy}>
              {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Send className="h-4 w-4" aria-hidden="true" />}
              Telegram पर OTP पाएँ
            </Button>
            <p className="pt-2 text-center text-sm text-muted-foreground">
              {mode === "login" ? "नए हैं? " : "पहले से अकाउंट है? "}
              <button
                type="button"
                className="font-medium text-foreground underline-offset-4 hover:underline"
                onClick={() => switchMode(mode === "login" ? "signup" : "login")}
              >
                {mode === "login" ? "अकाउंट बनाएँ" : "लॉग इन करें"}
              </button>
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
