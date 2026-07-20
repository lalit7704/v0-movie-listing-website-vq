import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Editorial Policy | Onemovie",
  description: "How Onemovie sources, labels, reviews and corrects movie catalogue information.",
  alternates: { canonical: "/editorial-policy" },
};

export default function EditorialPolicyPage() {
  return (
    <div className="min-h-screen bg-background"><Navbar />
      <main className="mx-auto max-w-4xl px-4 pb-16 pt-24 sm:px-6">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Editorial Policy</h1>
        <p className="mt-5 leading-7 text-muted-foreground">Onemovie separates factual catalogue data from original editorial opinion. This page explains how listings are prepared and corrected.</p>
        <div className="mt-10 space-y-8 text-muted-foreground">
          <section><h2 className="text-xl font-semibold text-foreground">Catalogue information</h2><p className="mt-3 leading-7">Titles, release dates, runtime, cast, crew, genres, artwork and external ratings may originate from third-party movie databases or rights holders. Availability varies by title, and these facts are checked for obvious formatting and category errors before publication.</p></section>
          <section><h2 className="text-xl font-semibold text-foreground">Reviews and opinions</h2><p className="mt-3 leading-7">An external synopsis or rating is not presented as an Onemovie review. Original reviews, recommendations or analysis are labelled as editorial content and should identify their author and publication or update date.</p></section>
          <section><h2 className="text-xl font-semibold text-foreground">Corrections</h2><p className="mt-3 leading-7">We update demonstrably incorrect catalogue facts and clearly broken references. Send the affected page URL, the incorrect field and a reliable supporting source through our <Link href="/contact" className="text-primary hover:underline">contact page</Link>.</p></section>
          <section><h2 className="text-xl font-semibold text-foreground">Independence and advertising</h2><p className="mt-3 leading-7">Advertising does not determine catalogue placement or editorial conclusions. Sponsored material or affiliate relationships will be disclosed where they appear.</p></section>
        </div>
      </main><Footer /></div>
  );
}
