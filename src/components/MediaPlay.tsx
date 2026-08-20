import Reveal from "./Reveal";
import { T, Img } from "../editor/Editable";

interface Property {
  tag: string;
  tagTone: "current" | "archived";
  index: string;
  title: string;
  desc: string;
  stats: [string, string][];
  audience: string[];
  note: string;
}

const properties: Property[] = [
  {
    tag: "Current",
    tagTone: "current",
    index: "01",
    title: "Flagship Entertainment Feed",
    desc: "A faceless celebrity & entertainment news property built for international English-speaking audiences, run through a research-to-publishing system.",
    stats: [
      ["7M", "views · 12 mo"],
      ["12.6K", "followers"],
      ["117.9K", "likes"],
      ["10.2K / 4.5K", "shares / comments"],
    ],
    audience: ["UK 45.5%", "US 20.5%", "Ireland", "Canada", "85%+ aged 25+"],
    note: "Monetised through TikTok's creator rewards ecosystem.",
  },
  {
    tag: "Archived",
    tagTone: "archived",
    index: "02",
    title: "Culture Archive",
    desc: "The second property — a story-first entertainment page whose repeat experiments set the template for compliant, durable audience acquisition.",
    stats: [
      ["15.3K", "followers"],
      ["221K", "likes"],
      ["1.6M", "peak video views"],
      ["1.4M", "second-peak views"],
    ],
    audience: ["International EN audience", "Multi-region retention"],
    note: "Lessons here shaped the current flagship's acquisition model.",
  },
  {
    tag: "Archived",
    tagTone: "archived",
    index: "03",
    title: "Viral Shorts Lab",
    desc: "The earliest lab — rapid short-form experiments that proved the format and produced a string of six-figure viral clips.",
    stats: [
      ["12K", "followers"],
      ["96.7K", "likes"],
      ["1.2M", "peak video views"],
      ["575K–859K", "four more viral clips"],
    ],
    audience: ["Format testing", "Hook & pacing research"],
    note: "The proving ground for the cut-in-the-first-two-seconds rule.",
  },
];

const steps: [string, string, string][] = [
  ["01", "Trend watch", "Daily monitoring of what's moving across regions and formats."],
  ["02", "Story selection", "Only stories with a built-in stop scroll make the shortlist."],
  ["03", "AI-assisted scripting", "ChatGPT, Gemini and Claude compress research into tight scripts."],
  ["04", "Asset sourcing", "Visuals curated for pacing, not filler — Midjourney where it fits."],
  ["05", "Short-form production", "Cut, captioned and colour-graded in CapCut and Premiere."],
  ["06", "Publish & analyse", "Analytics feed the next day's selection. The loop never sleeps."],
];

export default function MediaPlay() {
  return (
    <section id="work" className="bg-grid-light relative bg-paper-50 py-24 text-ink-900 md:py-36">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <T id="work.eyebrow" as="p" className="font-mono text-[11px] uppercase tracking-[0.3em] text-bronze-600">
              03 — Selected work
            </T>
            <T
              id="work.heading"
              as="h2"
              className="mt-6 max-w-2xl font-display text-4xl font-light leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.4rem]"
            >
              The portfolio of the <em className="text-bronze-600">invisible</em>.
            </T>
          </Reveal>
          <Reveal delay={150}>
            <T id="work.note" as="p" className="max-w-sm text-sm leading-relaxed text-mist-500">
              Three faceless entertainment-media properties, built and operated solo, aimed at
              international English-speaking audiences. No face on camera — the system is the star.
            </T>
          </Reveal>
        </div>

        {/* property cards */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {properties.map((p, pi) => (
            <Reveal key={p.index} delay={pi * 110} className="h-full">
              <article className="group flex h-full flex-col border border-ink-900/15 bg-paper-50 p-7 transition-all duration-500 hover:-translate-y-2 hover:border-ink-950 hover:shadow-[0_24px_60px_-24px_rgba(12,13,16,0.45)]">
                <div className="flex items-center justify-between">
                  <T
                    id={`work.card.${pi}.tag`}
                    className={
                      p.tagTone === "current"
                        ? "bg-bronze-500 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-paper-50"
                        : "border border-ink-900/25 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-700"
                    }
                  >
                    {p.tag}
                  </T>
                  <span className="font-display text-4xl font-light text-ink-900/20 transition-colors duration-500 group-hover:text-bronze-500/50">
                    {p.index}
                  </span>
                </div>
                <T id={`work.card.${pi}.title`} as="h3" className="mt-6 font-display text-2xl font-medium tracking-tight">
                  {p.title}
                </T>
                <T id={`work.card.${pi}.desc`} as="p" className="mt-3 text-sm leading-relaxed text-mist-500">
                  {p.desc}
                </T>

                <dl className="mt-7 grid grid-cols-2 gap-px bg-ink-900/10">
                  {p.stats.map(([v, l], si) => (
                    <div key={l} className="flex flex-col bg-paper-50 p-4">
                      <T
                        id={`work.card.${pi}.stat.${si}.label`}
                        as="dt"
                        className="order-2 mt-1 font-mono text-[9.5px] uppercase tracking-[0.16em] text-mist-500"
                      >
                        {l}
                      </T>
                      <T
                        id={`work.card.${pi}.stat.${si}.value`}
                        as="dd"
                        className="order-1 font-display text-xl font-medium text-ink-900"
                      >
                        {v}
                      </T>
                    </div>
                  ))}
                </dl>

                <div className="mt-5 flex flex-wrap gap-2">
                  {p.audience.map((a, ai) => (
                    <T
                      key={a}
                      id={`work.card.${pi}.aud.${ai}`}
                      className="border border-ink-900/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-700 transition-colors duration-300 group-hover:border-bronze-500/40"
                    >
                      {a}
                    </T>
                  ))}
                </div>

                <p className="mt-auto pt-6 font-mono text-[11px] leading-relaxed tracking-wide text-bronze-600">
                  ↗ <T id={`work.card.${pi}.note`}>{p.note}</T>
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        {/* behind-the-feed banner */}
        <Reveal delay={120} className="mt-16">
          <div className="grid grid-cols-1 overflow-hidden border border-ink-950 bg-ink-950 text-paper-50 lg:grid-cols-2">
            <div className="relative min-h-[280px] overflow-hidden lg:min-h-[460px]">
              <Img
                id="work.banner.image"
                src="./images/working.jpg"
                alt="Editing a vertical short-form video late at night"
                className="kenburns absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-ink-950/60" />
              <T
                id="work.banner.badge"
                className="absolute left-5 top-5 bg-ink-950/80 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-bronze-300"
              >
                Behind the feed
              </T>
              <T
                id="work.banner.caption"
                as="p"
                className="absolute bottom-5 left-5 right-5 font-display text-xl font-light italic text-paper-50/90"
              >
                The room where a million views get their first two seconds.
              </T>
            </div>
            <div className="p-8 md:p-12">
              <T id="work.flow.eyebrow" as="p" className="font-mono text-[11px] uppercase tracking-[0.3em] text-bronze-300">
                Inside the workflow
              </T>
              <T id="work.flow.heading" as="h3" className="mt-4 font-display text-3xl font-light tracking-tight">
                Six steps. <em className="text-bronze-300">Every day.</em>
              </T>
              <ol className="mt-9 grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2">
                {steps.map(([n, t, d], i) => (
                  <li key={n} className="group/step border-t border-paper-50/15 pt-4">
                    <p className="flex items-baseline gap-3">
                      <span className="font-mono text-[11px] text-bronze-400">{n}</span>
                      <T
                        id={`work.flow.${i}.title`}
                        className="font-display text-lg font-medium transition-colors duration-300 group-hover/step:text-bronze-300"
                      >
                        {t}
                      </T>
                    </p>
                    <T id={`work.flow.${i}.desc`} as="p" className="mt-1.5 pl-7 text-[13px] leading-relaxed text-mist-400">
                      {d}
                    </T>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
