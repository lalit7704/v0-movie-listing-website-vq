import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Onemovie",
  description:
    "Read the Terms of Service for Onemovie. Learn about site usage, content availability, and disclaimers.",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-[1100px] mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Terms of Service
        </h1>

        <p className="text-muted-foreground mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-6 text-foreground/90">
          <section>
            <h2 className="text-xl font-semibold mb-2">Disclaimer</h2>
            <p className="text-muted-foreground">
              Onemovie is a third-party streaming website. We do not host media
              files on our servers. Content is provided by non-affiliated third
              parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Use of the Site</h2>
            <p className="text-muted-foreground">
              By using this website, you agree to comply with all applicable
              laws and understand that content availability may change.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">DMCA</h2>
            <p className="text-muted-foreground">
              If you believe any content infringes your rights, please follow
              the DMCA process provided via site support.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

