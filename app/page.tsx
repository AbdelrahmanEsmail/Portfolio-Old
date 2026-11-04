import { About } from './components/about/About';
import { Contact } from './components/contact/Contact';
import { Effects } from './components/effects/Effects';
import { SitePets } from './components/effects/SitePets';
import { Experience } from './components/experience/Experience';
import { Hero } from './components/hero/Hero';
import { Marquee } from './components/hero/Marquee';
import { CommandPalette } from './components/site/CommandPalette';
import { Footer } from './components/site/Footer';
import { Header } from './components/site/Header';
import { Toolkit } from './components/toolkit/Toolkit';
import { Toaster } from './components/ui/Toaster';
import { Work } from './components/work/Work';

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Marquee />
        <About />
        <Work />
        <Experience />
        <Toolkit />
        <Contact />
      </main>
      <Footer />
      <CommandPalette />
      <Toaster />
      <Effects />
      <SitePets />
    </>
  );
}
