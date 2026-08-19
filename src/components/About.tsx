import Reveal from "./Reveal";
import { T, Img } from "../editor/Editable";

const facts: [string, string][] = [
  ["Base", "Lagos, Nigeria — remote-first"],
  ["Day roles", "IndustryNite · El Carnaval"],
  ["Night machine", "3 faceless media properties"],
  ["Languages", "English · Yoruba"],
  ["Status", "Open to global work"],
];

const pillars = ["Music Ops & Campaigns", "Faceless Media", "Events & Activations", "Creative Production"];

export default function About() {
  return (
    <section id="about" className="bg-grid-light relative bg-paper-50 py-24 text-ink-900 md:py-36">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
          {/* sticky left */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <T id="about.eyebrow" as="p" className="font-mono text-[11px] uppercase tracking-[0.3em] text-bronze-600">
                  01 — About
                </T>
                <T
                  id="about.heading"
                  as="h2"
                  className="mt-6 font-display text-4xl font-light leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.4rem]"
                >
                  The strategist behind the <em className="font-normal text-bronze-600">stage</em> and the{" "}
                  <em className="font-normal text-bronze-600">screen</em>.
                </T>
              </Reveal>

              <Reveal delay={150} className="mt-12 hidden lg:block">
                <div className="relative w-60">
                  <div className="absolute -inset-2 -translate-x-2 -translate-y-2 border border-bronze-500/40" aria-hidden />
                  <Img
                    id="about.portrait"
                    src="./images/portrait-seated.jpg"
                    alt="Ishola in a brown suede jacket, studio portrait"
                    className="relative w-full border border-ink-900/15 object-cover"
                  />
                  <T id="about.portrait.caption" as="p" className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-mist-500">
                    Second take — same room, softer light
                  </T>
                </div>
              </Reveal>

              <Reveal delay={220} className="mt-10 hidden lg:block">
                <dl className="divide-y divide-ink-900/10 border-y border-ink-900/10">
                  {facts.map(([k, v], i) => (
                    <div key={k} className="flex items-baseline justify-between gap-4 py-3">
                      <T id={`about.fact.${i}.key`} as="dt" className="font-mono text-[10px] uppercase tracking-[0.22em] text-mist-500">
                        {k}
                      </T>
                      <T id={`about.fact.${i}.value`} as="dd" className="text-right text-sm font-semibold text-ink-800">
                        {v}
                      </T>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </div>

          {/* scrolling right */}
          <div className="lg:col-span-7 lg:pl-6">
            <Reveal>
              <T
                id="about.p1"
                as="p"
                className="text-lg leading-[1.85] text-ink-700 first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-[4.6rem] first-letter:font-medium first-letter:leading-[0.78] first-letter:text-bronze-600 sm:text-xl"
              >
                Ishola Ayodele Ridwan works in the space where culture is made and where it is
                measured. By day, he sits with senior leadership at IndustryNite, turning raw
                creative ideas into campaigns, stages, bookings and decks that actually ship. By
                night, he runs a quiet machine of faceless entertainment feeds that millions of
                strangers scroll through in London, New York, Dublin and Toronto.
              </T>
            </Reveal>

            <Reveal delay={100}>
              <T id="about.p2" as="p" className="mt-8 text-lg leading-[1.85] text-ink-700 sm:text-xl">
                His range is the point. One week it is a{" "}
                <strong className="font-semibold text-ink-900">₦50 million+, 200-influencer artist campaign</strong>; the
                next, a ninety-second cut that crosses{" "}
                <strong className="font-semibold text-ink-900">one million views</strong>. He learned the business the
                long way — photography, design, events, administration — so when he says “growth,”
                it comes with production instincts, operator discipline and an accountant&rsquo;s eye
                for what actually moves.
              </T>
            </Reveal>

            <Reveal delay={160}>
              <T id="about.p3" as="p" className="mt-8 text-lg leading-[1.85] text-ink-700 sm:text-xl">
                He is not a channel-hopper. He is a system: research the trend, cut the story in the
                first two seconds, package it, publish it, read the analytics, repeat. AI sharpens
                the workflow. Taste decides what ships.
              </T>
            </Reveal>

            <Reveal delay={200}>
              <blockquote className="mt-12 border-l-2 border-bronze-500 pl-6">
                <T
                  id="about.pullquote"
                  as="p"
                  className="font-display text-2xl font-light italic leading-snug text-ink-900 sm:text-[1.7rem]"
                >
                  &ldquo;A deck, a stage and a TikTok feed are the same job: get the right story in
                  front of the right person before they decide to leave.&rdquo;
                </T>
              </blockquote>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-12 grid grid-cols-2 gap-px border border-ink-900/15 bg-ink-900/15 sm:grid-cols-4">
                {pillars.map((p, i) => (
                  <div key={p} className="group bg-paper-50 px-4 py-5 transition-colors duration-300 hover:bg-ink-950">
                    <span className="mb-3 block h-px w-6 bg-bronze-500 transition-all duration-300 group-hover:w-10" />
                    <T
                      id={`about.pillar.${i}`}
                      as="p"
                      className="text-sm font-semibold leading-snug text-ink-800 transition-colors group-hover:text-paper-50"
                    >
                      {p}
                    </T>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
