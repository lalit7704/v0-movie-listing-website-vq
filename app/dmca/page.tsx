import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DMCA | Onemovie",
  description:
    "DMCA policy for Onemovie. Report copyright infringement and takedown requests.",
};

export default function DmcaPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-[1100px] mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">DMCA</h1>

        <p className="text-muted-foreground mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-6 text-foreground/90">
          <section>
            <h2 className="text-xl font-semibold mb-2">Copyright Claims</h2>
            <p className="text-muted-foreground">
              If you believe that copyrighted material has been posted or
              linked without authorization, please contact us with the
              following information:
            </p>
            <ul className="list-disc pl-6 mt-2 text-muted-foreground">
              <li>Your contact information</li>
              <li>A description of the copyrighted work</li>
              <li>The URL of the allegedly infringing content</li>
              <li>A statement of good faith belief</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Takedown Requests</h2>
            <p className="text-muted-foreground">
              We will review notices and respond in accordance with applicable
              law.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

