import type { MouseEvent } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Quote from "./components/Quote";
import Impact from "./components/Impact";
import MediaPlay from "./components/MediaPlay";
import Experience from "./components/Experience";
import Capabilities from "./components/Capabilities";
import Contact from "./components/Contact";
import { ContentProvider, useContent } from "./editor/ContentContext";


function Site() {
  const { editing } = useContent();

  // while editing, clicking a link should never navigate away mid-edit
  const guardLinks = (e: MouseEvent<HTMLDivElement>) => {
    if (!editing) return;
    const target = e.target as HTMLElement;
    if (target.closest("[data-editor-ui]")) return;
    const anchor = target.closest("a");
    if (anchor) e.preventDefault();
  };

  return (
    <div
      className="overflow-x-clip bg-ink-950 font-body text-paper-50 antialiased"
      onClickCapture={guardLinks}
    >
      <div className="noise-overlay" aria-hidden="true" />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Quote />
        <Impact />
        <MediaPlay />
        <Experience />
        <Capabilities />
        <Contact />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ContentProvider>
      <Site />
    </ContentProvider>
  );
}
