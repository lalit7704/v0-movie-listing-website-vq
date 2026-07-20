import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Contact | Onemovie",
  description: "Contact Onemovie about catalogue corrections, privacy questions or site support.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background"><Navbar />
      <main className="mx-auto max-w-3xl px-4 pb-16 pt-24 sm:px-6">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Contact Onemovie</h1>
        <p className="mt-5 leading-7 text-muted-foreground">Use support for catalogue corrections, privacy requests, accessibility problems and technical issues. For a correction, include the page URL, the field that is wrong and a reliable source.</p>
        <div className="mt-8 rounded-xl border border-border bg-card p-6">
          <h2 className="text-xl font-semibold text-foreground">Telegram support</h2>
          <p className="mt-2 mb-5 text-muted-foreground">Messages are handled through the Onemovie support bot. Do not send passwords, payment details or other sensitive information.</p>
          <Button asChild><a href="https://t.me/onemoviebylalit_bot?start=support" target="_blank" rel="noopener noreferrer"><MessageCircle className="mr-2 h-4 w-4" />Open support</a></Button>
        </div>
      </main><Footer /></div>
  );
}
