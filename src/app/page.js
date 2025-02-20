import Hero from "@/components/features/hero";
import Section from "@/components/features/section";
import Pricing from "@/components/features/pricing";
import FAQ from "@/components/features/faq";
import DocumentUploader from "@/components/features/doc_uploader";
import Poll from "@/components/features/pool";
import InterventionRequest from "@/components/features/interventionRequest";
import SharedCalendar from "@/components/features/calendar";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Section />
      <Pricing />
      <FAQ />
    </main>
  );
}
