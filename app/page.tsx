import Hero from "@/app/components/Hero";
import Nav from "@/app/components/Nav";
import Reel from "@/app/components/Reel";
import Scoreboard from "@/app/components/Scoreboard";
import { About, Contact, Experience, Footer, Impact, WritingPreview } from "@/app/components/Sections";
import { navLinks } from "@/app/lib/nav";

export default function Home() {
  return (
    <>
      <Nav links={navLinks()} />
      <main id="main">
        <Hero />
        <Scoreboard />
        <About />
        <Experience />
        <Reel />
        <WritingPreview />
        <Impact />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
