import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Works from "@/components/Works";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* Sticky Glass Navbar */}
      <Navbar />

      {/* Main Sections */}
      <main className="flex-1 w-full bg-background flex flex-col">
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Works />
        <Services />
        <Contact />
      </main>

      {/* Social Footer */}
      <Footer />
    </>
  );
}
