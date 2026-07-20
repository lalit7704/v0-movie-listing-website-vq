import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Onemovie",
  description: "How Onemovie handles account data, analytics, cookies and advertising.",
  alternates: { canonical: "/privacy-policy" },
};

const sections = [
  {
    title: "Overview",
    text: "Onemovie is a movie-discovery catalogue. We organise information about films and series so visitors can browse titles by category, language and genre.",
  },
  {
    title: "Information we collect",
    text: "We may receive technical and usage information such as IP address, browser type, device information, referring page and pages visited. This information is used for security, diagnostics and understanding site performance.",
  },
  {
    title: "Optional accounts",
    text: "If you sign in with Google, we receive basic account details such as your name, email address and profile image. Account features may store wishlist, preferences and related activity. Browsing does not require an account.",
  },
  {
    title: "Cookies and local storage",
    text: "We use cookies, local storage and similar technologies for site preferences, optional account features and analytics. You can remove stored data through your browser controls.",
  },
  {
    title: "Google advertising",
    text: "We may use Google AdSense. Google and its partners may use cookies to serve, measure and personalise ads based on visits to this and other websites. Visitors can manage personalised advertising in Google Ads Settings. Where legally required, advertising cookies will only be used after consent.",
  },
  {
    title: "Service providers and retention",
    text: "Hosting, authentication, analytics and advertising providers may process limited data on our behalf. We retain information only for as long as it is needed for the relevant feature, security, legal obligations or dispute resolution.",
  },
  {
    title: "Your choices",
    text: "You may browse without signing in, manage cookies in your browser, change advertising preferences through Google, and request correction or deletion of account information through the support options available on the site.",
  },
  {
    title: "Updates",
    text: "We may update this policy when site features or legal requirements change. Material changes will be reflected on this page with an updated effective date.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-[1100px] mx-auto w-full">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Privacy Policy</h1>
        <p className="mt-3 mb-8 text-sm text-muted-foreground">Effective date: July 20, 2026</p>
        <div className="space-y-7">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-semibold mb-2 text-foreground">{section.title}</h2>
              <p className="leading-7 text-muted-foreground">{section.text}</p>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
