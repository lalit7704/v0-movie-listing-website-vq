"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { Loader2, Trash2, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Notice } from "@/components/admin/notice";
import { PersonAvatar } from "@/components/vote/vote-ui";
import { errorText, formatDateTime, voteRequest } from "@/components/vote/vote-api";
import { formatPhone } from "@/lib/vote/phone";
import type { VoteManager } from "@/lib/vote/types";

export function VoteAdminTeam() {
  const [managers, setManagers] = useState<VoteManager[] | null>(null);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ tone: "success" | "error"; text: string } | null>(null);

  const loadManagers = useCallback(async () => {
    try {
      const data = await voteRequest<{ managers: VoteManager[] }>("/api/vote/admin/users");
      setManagers(data.managers);
    } catch (caught) {
      setMessage({ tone: "error", text: errorText(caught) });
    }
  }, []);

  useEffect(() => {
    void loadManagers();
  }, [loadManagers]);

  async function handleAdd(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage(null);
    try {
      const data = await voteRequest<{ created: boolean }>("/api/vote/admin/users", "POST", { phone, name, password });
      setMessage({
        tone: "success",
        text: data.created
          ? "मैनेजर जुड़ गया। वह /vote/admin पर इसी नंबर और पासवर्ड से लॉग इन करके Telegram बॉट से OTP ले सकता है।"
          : "इस नंबर का अकाउंट पहले से था। अब यह मैनेजर है।",
      });
      setPhone("");
      setName("");
      setPassword("");
      await loadManagers();
    } catch (caught) {
      setMessage({ tone: "error", text: errorText(caught) });
    } finally {
      setBusy(false);
    }
  }

  async function handleRemove(manager: VoteManager) {
    if (!window.confirm(`${manager.name} को मैनेजर से हटाएँ? उनका वोटिंग अकाउंट बना रहेगा।`)) return;
    setBusy(true);
    setMessage(null);
    try {
      await voteRequest(`/api/vote/admin/users?id=${encodeURIComponent(manager.id)}`, "DELETE");
      setMessage({ tone: "success", text: `${manager.name} अब वोटिंग मैनेज नहीं कर सकते।` });
      await loadManagers();
    } catch (caught) {
      setMessage({ tone: "error", text: errorText(caught) });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-8">
      {message && <Notice tone={message.tone}>{message.text}</Notice>}

      <form onSubmit={handleAdd} className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="border-b border-border px-5 py-4 sm:px-6">
          <h2 className="text-base font-semibold text-foreground">मैनेजर जोड़ें</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            मैनेजर पोल बना, बंद और हटा सकते हैं और सारे नतीजे देख सकते हैं। मैनेजर सिर्फ़ आप जोड़ या हटा सकते हैं।
            लॉग इन OTP के लिए इस नंबर पर Telegram होना चाहिए। अगर इस नंबर का वोटिंग अकाउंट पहले से है, तो नाम और
            पासवर्ड डालना ज़रूरी नहीं; पासवर्ड खाली छोड़ेंगे तो उनका पुराना पासवर्ड ही रहेगा।
          </p>
        </div>
        <div className="grid gap-4 p-5 sm:grid-cols-3 sm:p-6">
          <div className="space-y-1.5">
            <Label htmlFor="manager-phone">मोबाइल नंबर *</Label>
            <Input
              id="manager-phone"
              type="tel"
              inputMode="numeric"
              required
              placeholder="10 अंकों का नंबर"
              value={phone}
              disabled={busy}
              onChange={(event) => setPhone(event.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="manager-name">नाम</Label>
            <Input
              id="manager-name"
              maxLength={60}
              value={name}
              disabled={busy}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="manager-password">पासवर्ड</Label>
            <Input
              id="manager-password"
              type="password"
              autoComplete="new-password"
              minLength={6}
              maxLength={72}
              value={password}
              disabled={busy}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end border-t border-border bg-white/[0.015] px-5 py-3 sm:px-6">
          <Button type="submit" className="gap-2" disabled={busy}>
            {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <UserPlus className="h-4 w-4" aria-hidden="true" />}
            मैनेजर जोड़ें
          </Button>
        </div>
      </form>

      <section className="overflow-hidden rounded-xl border border-border bg-card">
        <h2 className="border-b border-border px-5 py-4 text-base font-semibold text-foreground sm:px-6">मैनेजर</h2>
        {managers === null ? (
          <Loader2 className="m-5 h-5 w-5 animate-spin text-muted-foreground" aria-label="मैनेजर लोड हो रहे हैं" />
        ) : managers.length === 0 ? (
          <p className="px-5 py-6 text-sm text-muted-foreground sm:px-6">अभी सिर्फ़ आप वोटिंग मैनेज कर सकते हैं।</p>
        ) : (
          <ul className="divide-y divide-border">
            {managers.map((manager) => (
              <li key={manager.id} className="flex items-center gap-3 px-5 py-3.5 sm:px-6">
                <PersonAvatar name={manager.name} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{manager.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatPhone(manager.phone)} ·{" "}
                    {manager.lastLoginAt ? `आख़िरी लॉग इन: ${formatDateTime(manager.lastLoginAt)}` : "अभी तक लॉग इन नहीं किया"}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={busy}
                  onClick={() => void handleRemove(manager)}
                  aria-label={`${manager.name} को हटाएँ`}
                  title="मैनेजर से हटाएँ"
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
