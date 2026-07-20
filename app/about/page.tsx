import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "About Onemovie",
  description: "Learn what Onemovie does, how its catalogue is organised, and how third-party information is handled.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 pb-16 pt-24 sm:px-6">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">About Onemovie</h1>
        <p className="mt-5 text-lg leading-8 text-muted-foreground">
          Onemovie is an independent movie-discovery catalogue built to help visitors browse films and series by language, cinema category and genre. The site brings commonly requested title information into a consistent, searchable format.
        </p>

        <div className="mt-10 space-y-8 text-muted-foreground">
          <section>
            <h2 className="text-xl font-semibold text-foreground">What you can find here</h2>
            <p className="mt-3 leading-7">
              Catalogue pages group titles into Bollywood, Hollywood, South Indian cinema, web series, cartoons and genre collections. A title page may include a synopsis, year, runtime, language, genres, cast, director, artwork and rating. Some fields may be unavailable for older or recently announced titles.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground">Sources and editorial approach</h2>
            <p className="mt-3 leading-7">
              Factual movie metadata and artwork can originate from third-party databases and rights holders. Onemovie organises that information for discovery and does not present third-party ratings as its own reviews. We aim to correct inaccurate titles, categories and links when they are identified, and we clearly distinguish catalogue facts from our own guidance.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground">Copyright and corrections</h2>
            <p className="mt-3 leading-7">
              Copyright belongs to the respective owners. Rights holders can review the information required for a removal notice on our <Link href="/dmca" className="text-primary hover:underline">DMCA page</Link>. Visitors should use the support option shown on a title page to report an incorrect or unavailable listing.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground">Privacy and site rules</h2>
            <p className="mt-3 leading-7">
              Details about optional accounts, analytics and advertising are in our <Link href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>. Use of the service is also subject to the <Link href="/terms-of-service" className="text-primary hover:underline">Terms of Service</Link>.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
