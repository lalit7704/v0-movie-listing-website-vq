import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Onemovie",
  description:
    "Read the Privacy Policy for Onemovie. Learn how we handle user information and content access.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-[1100px] mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Privacy Policy
        </h1>

        <p className="text-muted-foreground mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-6 text-foreground/90">
          <section>
            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <p className="text-muted-foreground">
              Onemovie is a third-party content streaming website. We don’t store
              media files on our servers. Content is provided by non-affiliated
              third parties, and we may display links to content hosted elsewhere.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Information We Collect</h2>
            <p className="text-muted-foreground">
              We may collect basic analytics and usage information (such as IP
              address, browser type, and page views) to understand site
              performance. We do not require you to submit personal information
              to browse pages.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Cookies & Analytics</h2>
            <p className="text-muted-foreground">
              We may use cookies and similar technologies to improve user
              experience and collect analytics. This may include third-party
              services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Ads</h2>
            <p className="text-muted-foreground">
              We may display advertisements served by third-party ad networks.
              Those networks may collect information about ad performance and
              your interactions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Contact</h2>
            <p className="text-muted-foreground">
              If you have questions about this Privacy Policy, contact us via the
              site’s Support/Contact options.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

