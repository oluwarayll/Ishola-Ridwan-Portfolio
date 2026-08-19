import { T, Img } from "../editor/Editable";

const heroStats: [string, string][] = [
  ["7M", "TikTok views in 12 months"],
  ["40K+", "Followers across 3 properties"],
  ["12+ yrs", "In creative & operations"],
];

export default function Hero() {
  return (
    <section id="top" className="bg-grid-dark relative flex min-h-screen flex-col overflow-hidden">
      {/* ambient glows */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[38rem] w-[38rem] rounded-full bg-bronze-500/15 blur-[140px]" />
      <div className="pointer-events-none absolute -left-52 bottom-0 h-[30rem] w-[30rem] rounded-full bg-clay-500/10 blur-[120px]" />

      {/* giant outlined watermark */}
      <span
        aria-hidden
        className="text-outline pointer-events-none absolute -bottom-6 left-0 select-none whitespace-nowrap font-display text-[26vw] font-semibold leading-none tracking-tight opacity-70"
      >
        RIDWAN
      </span>

      <div className="relative mx-auto grid w-full max-w-[1440px] flex-1 grid-cols-1 items-center gap-12 px-5 pb-24 pt-32 md:px-10 lg:grid-cols-12 lg:gap-8 lg:pt-28">
        {/* left — name & intro */}
        <div className="order-2 lg:order-1 lg:col-span-7">
          <div className="fade-late mb-8 flex flex-wrap items-center gap-x-6 gap-y-2" style={{ animationDelay: "0.15s" }}>
            <T id="hero.eyebrow" className="font-mono text-[11px] uppercase tracking-[0.28em] text-bronze-300">
              Portfolio — 2026
            </T>
            <span className="hidden h-4 w-px bg-paper-50/25 sm:block" />
            <T id="hero.location" className="font-mono text-[11px] uppercase tracking-[0.28em] text-mist-400">
              Lagos, Nigeria · Working globally
            </T>
          </div>

          <h1 className="font-display leading-[0.94] tracking-[-0.02em]">
            <span className="mask-line text-[17vw] font-light text-paper-50 sm:text-[15vw] lg:text-[7.6vw]">
              <T id="hero.name.1" as="span" style={{ animationDelay: "0.2s" }}>
                Ishola
              </T>
            </span>
            <span className="mask-line text-[17vw] font-light italic text-bronze-300 sm:text-[15vw] lg:text-[7.6vw]">
              <T id="hero.name.2" as="span" style={{ animationDelay: "0.34s" }}>
                Ayodele
              </T>
            </span>
            <span className="mask-line text-[17vw] font-semibold text-paper-50 sm:text-[15vw] lg:text-[7.6vw]">
              <T id="hero.name.3" as="span" style={{ animationDelay: "0.48s" }}>
                Ridwan
              </T>
            </span>
          </h1>

          <T
            id="hero.title"
            as="p"
            className="fade-up-late mt-8 font-mono text-xs uppercase tracking-[0.3em] text-paper-50/80 sm:text-sm"
            style={{ animationDelay: "0.75s" }}
          >
            Creative &amp; Digital Growth Strategist &amp; Media Operator
          </T>

          <T
            id="hero.intro"
            as="p"
            className="fade-up-late mt-5 max-w-xl text-base leading-relaxed text-mist-300 sm:text-lg"
            style={{ animationDelay: "0.85s" }}
          >
            I build the bridge between culture and the algorithm — artist campaigns, live events,
            decks that close the room, and short-form media properties that millions of strangers
            stop scrolling for.
          </T>

          <div className="fade-up-late mt-10 flex flex-wrap items-center gap-4" style={{ animationDelay: "0.95s" }}>
            <a
              href="#work"
              className="group relative overflow-hidden bg-paper-50 px-7 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-950 transition-colors duration-300"
            >
              <span className="absolute inset-0 translate-y-full bg-bronze-400 transition-transform duration-400 ease-out group-hover:translate-y-0" />
              <T id="hero.cta.1" className="relative">
                View selected work
              </T>
            </a>
            <a
              href="#contact"
              className="group flex items-center gap-3 border border-paper-50/25 px-7 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-paper-50 transition-colors duration-300 hover:border-bronze-400 hover:text-bronze-300"
            >
              <T id="hero.cta.2">Start a conversation</T>
              <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                →
              </span>
            </a>
          </div>

          {/* bottom meta strip */}
          <div
            className="fade-up-late mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-paper-50/15 pt-6"
            style={{ animationDelay: "1.05s" }}
          >
            {heroStats.map(([big, small], i) => (
              <div key={small}>
                <T id={`hero.stat.${i}.value`} as="p" className="font-display text-2xl font-medium text-bronze-300 sm:text-3xl">
                  {big}
                </T>
                <T
                  id={`hero.stat.${i}.label`}
                  as="p"
                  className="mt-1 font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-mist-400"
                >
                  {small}
                </T>
              </div>
            ))}
          </div>
        </div>

        {/* right — portrait */}
        <div className="fade-late order-1 lg:order-2 lg:col-span-5" style={{ animationDelay: "0.4s" }}>
          <div className="relative mx-auto max-w-md lg:max-w-none">
            {/* offset bronze frame */}
            <div className="absolute -inset-3 translate-x-4 translate-y-4 border border-bronze-400/40" aria-hidden />
            <figure className="relative overflow-hidden border border-paper-50/15 bg-ink-800">
              <Img
                id="hero.portrait"
                src="./images/portrait-suede.jpg"
                alt="Ishola Ayodele Ridwan in a charcoal suit, studio portrait"
                className="kenburns aspect-[4/5] w-full object-cover"
              />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-ink-950/90 to-transparent px-5 pb-4 pt-14 font-mono text-[10px] uppercase tracking-[0.2em] text-paper-50/70">
                <T id="hero.caption.1">Studio portrait</T>
                <T id="hero.caption.2" className="text-bronze-300">
                  Lagos · 2026
                </T>
              </figcaption>
            </figure>

            {/* rotating badge */}
            <div className="absolute -left-10 -top-10 hidden h-32 w-32 sm:block lg:-left-14 lg:-top-14 lg:h-36 lg:w-36">
              <svg viewBox="0 0 100 100" className="spin-slow h-full w-full" aria-hidden>
                <defs>
                  <path id="badge-circle" d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" />
                </defs>
                <circle cx="50" cy="50" r="49" className="fill-ink-950/90 stroke-bronze-400/40" strokeWidth="0.75" />
                <text
                  className="fill-bronze-300"
                  style={{ fontSize: "7.6px", letterSpacing: "0.14em", fontFamily: "IBM Plex Mono, monospace" }}
                >
                  <textPath href="#badge-circle">AVAILABLE FOR GLOBAL PROJECTS · REMOTE ·</textPath>
                </text>
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xl text-bronze-300" aria-hidden>
                ↓
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div
        className="fade-late absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
        style={{ animationDelay: "1.3s" }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-mist-500">Scroll</span>
        <span className="relative h-10 w-px overflow-hidden bg-paper-50/15">
          <span className="scroll-dot absolute left-0 top-0 h-3 w-px bg-bronze-300" />
        </span>
      </div>
    </section>
  );
}
