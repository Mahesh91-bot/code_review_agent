import LandingNav from "../components/landing/LandingNav";
import LandingHero from "../components/landing/LandingHero";
import LandingFeatures from "../components/landing/LandingFeatures";
import LandingBento from "../components/landing/LandingBento";
import LandingFlow from "../components/landing/LandingFlow";
import LandingPersona from "../components/landing/LandingPersona";
import LandingHindsight from "../components/landing/LandingHindsight";
import LandingCta from "../components/landing/LandingCta";
import LandingFooter from "../components/landing/LandingFooter";

export default function LandingPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-surface text-on-surface selection:bg-primary-container selection:text-on-primary-fixed">
      <LandingNav />
      <main className="flex-grow">
        <LandingHero />
        <LandingFeatures />
        <LandingBento />
        <LandingFlow />
        <LandingPersona />
        <LandingHindsight />
        <LandingCta />
      </main>
      <LandingFooter />
    </div>
  );
}
