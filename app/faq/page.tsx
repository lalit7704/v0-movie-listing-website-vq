import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Onemovie",
  description: "Answers about browsing movie and series information on Onemovie.",
  alternates: { canonical: "/faq" },
};

const questions = [
  ["Is Onemovie free to browse?", "Yes. You can browse the catalogue and read available title information without a subscription."],
  ["What information does a title page provide?", "Depending on availability, a title page may include a synopsis, release year, language, runtime, genres, cast, director, artwork and a third-party rating."],
  ["Can I download movies from Onemovie?", "No. Onemovie is a discovery catalogue and does not provide movie downloads. Please use a licensed cinema, broadcaster or streaming service available in your region."],
  ["Are ratings written by Onemovie?", "No. Unless explicitly labelled as an Onemovie review, ratings and factual metadata may originate from third-party databases and are shown as discovery signals."],
  ["How can I report incorrect information?", "Use the support option on the relevant title page when available. Include the title and the field that needs correction so the listing can be reviewed."],
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-[1100px] mx-auto w-full">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Frequently Asked Questions</h1>
        <p className="mt-3 mb-8 text-muted-foreground">Common questions about the Onemovie catalogue.</p>
        <div className="space-y-7">
          {questions.map(([question, answer], index) => (
            <section key={question}>
              <h2 className="text-xl font-semibold mb-2 text-foreground">{index + 1}. {question}</h2>
              <p className="leading-7 text-muted-foreground">{answer}</p>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
