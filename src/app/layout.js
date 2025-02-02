import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Hero from "@/components/layout/hero";
import Section from "@/components/layout/section";
import Footer from "@/components/layout/footer";
import Pricing from "@/components/layout/pricing";
import FAQ from "@/components/layout/faq";

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body>
        <Navbar />
        <Hero />
        <Section />
        <Pricing />
        <FAQ />
        <Footer />

        {children}
      </body>
    </html>
  );
}
