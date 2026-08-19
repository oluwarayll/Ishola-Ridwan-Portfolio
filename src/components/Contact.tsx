import Reveal from "./Reveal";
import { T } from "../editor/Editable";
import { useContent } from "../editor/ContentContext";

const DEFAULT_EMAIL = "isholaridwan650@gmail.com";
const DEFAULT_LINK = "linktr.ee/oluwaray";

const cards: [string, string, string][] = [
  ["Based in", "Lagos, Nigeria", "Open to travel and relocation for the right project."],
  ["Languages", "English · Yoruba", "Comfortable briefing, writing and presenting in both."],
  ["Available for", "Remote & freelance", "International remote work, consulting and project engagements."],
];

export default function Contact() {
  const { getPlain } = useContent();

  // links follow whatever you type into them
  const email = getPlain("contact.email", DEFAULT_EMAIL);
  const link = getPlain("contact.link", DEFAULT_LINK).replace(/^https?:\/\//, "");

  return (
    <section id="contact" className="bg-grid-dark relative overflow-hidden bg-ink-950 pt-24 md:pt-36">
      <div className="pointer-events-none absolute -left-40 top-10 h-[30rem] w-[30rem] rounded-full bg-bronze-500/12 blur-[140px]" />
      <span
        aria-hidden
        className="text-outline-bronze pointer-events-none absolute -top-8 right-0 select-none whitespace-nowrap font-display text-[18vw] font-semibold leading-none opacity-60"
      >
        TALK
      </span>

      <div className="relative mx-auto max-w-[1440px] px-5 md:px-10">
        <Reveal>
          <T id="contact.eyebrow" as="p" className="font-mono text-[11px] uppercase tracking-[0.3em] text-bronze-300">
            06 — Contact
          </T>
        </Reveal>
        <Reveal delay={100}>
          <T
            id="contact.heading"
            as="h2"
            className="mt-8 max-w-4xl font-display text-[2.6rem] font-light leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Have a campaign, a stage, or an <em className="text-bronze-300">audience</em> in mind?
          </T>
        </Reveal>
        <Reveal delay={180}>
          <T id="contact.sub" as="p" className="mt-8 max-w-xl text-lg leading-relaxed text-mist-300">
            Tell me about the story. I&rsquo;ll show you how it travels — from the first two seconds
            to the final invoice.
          </T>
        </Reveal>

        <Reveal delay={260}>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${email}`}
              className="group relative overflow-hidden bg-bronze-400 px-8 py-5 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-950 transition-colors duration-300"
            >
              <span className="absolute inset-0 translate-y-full bg-paper-50 transition-transform duration-400 ease-out group-hover:translate-y-0" />
              <T id="contact.email" className="relative">
                {DEFAULT_EMAIL}
              </T>
            </a>
            <a
              href={`https://${link}`}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-3 border border-paper-50/25 px-8 py-5 font-mono text-[11px] uppercase tracking-[0.22em] text-paper-50 transition-colors duration-300 hover:border-bronze-400 hover:text-bronze-300"
            >
              <T id="contact.link">{DEFAULT_LINK}</T>
              <span
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden
              >
                ↗
              </span>
            </a>
          </div>
        </Reveal>

        <div className="mt-20 grid grid-cols-1 gap-px border border-paper-50/12 bg-paper-50/12 sm:grid-cols-3">
          {cards.map(([k, v, d], i) => (
            <Reveal key={k} delay={i * 100} className="h-full">
              <div className="group h-full bg-ink-950 p-8 transition-colors duration-400 hover:bg-ink-850">
                <T id={`contact.card.${i}.key`} as="p" className="font-mono text-[10px] uppercase tracking-[0.24em] text-bronze-400">
                  {k}
                </T>
                <T id={`contact.card.${i}.value`} as="p" className="mt-4 font-display text-2xl font-medium tracking-tight">
                  {v}
                </T>
                <T id={`contact.card.${i}.desc`} as="p" className="mt-2 text-sm leading-relaxed text-mist-400">
                  {d}
                </T>
              </div>
            </Reveal>
          ))}
        </div>

        {/* footer */}
        <footer className="mt-20 flex flex-col gap-6 border-t border-paper-50/12 py-10 md:flex-row md:items-center md:justify-between">
          <div>
            <T id="footer.name" as="p" className="font-display text-lg font-medium tracking-wide">
              Ishola Ayodele Ridwan
            </T>
            <T id="footer.role" as="p" className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-mist-500">
              Creative &amp; Digital Growth Strategist &amp; Media Operator — © 2026
            </T>
          </div>
          <T id="footer.tagline" as="p" className="font-mono text-[10px] uppercase tracking-[0.2em] text-mist-500">
            Built with taste · shipped with discipline
          </T>
          <a
            href="#top"
            className="group flex w-fit items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-paper-50/70 transition-colors hover:text-bronze-300"
          >
            <T id="footer.top">Back to top</T>
            <span
              className="flex h-9 w-9 items-center justify-center border border-paper-50/20 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-bronze-400"
              aria-hidden
            >
              ↑
            </span>
          </a>
        </footer>
      </div>
    </section>
  );
}
