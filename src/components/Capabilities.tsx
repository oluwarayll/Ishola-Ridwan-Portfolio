import type { ReactNode } from "react";
import Reveal from "./Reveal";
import { T } from "../editor/Editable";

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-7 w-7"
      aria-hidden
    >
      {children}
    </svg>
  );
}

const caps: { title: string; desc: string; icon: ReactNode }[] = [
  {
    title: "Creative Strategy & Campaigns",
    desc: "Concepts that survive contact with a budget — from the first whiteboard to the final cut.",
    icon: (
      <Icon>
        <circle cx="12" cy="12" r="9" />
        <path d="M15.5 8.5 13.2 13.2 8.5 15.5l2.3-4.7z" />
      </Icon>
    ),
  },
  {
    title: "Content Growth & Audience Research",
    desc: "Region by region, age by age — knowing exactly who is watching and why they stay.",
    icon: (
      <Icon>
        <path d="M3 17c2.5 0 2.5-3 5-3s2.5 3 5 3 2.5-3 5-3" />
        <path d="M3 21h18" />
        <path d="M6 11V7M12 11V4M18 11V6" />
      </Icon>
    ),
  },
  {
    title: "Music & Artist Operations",
    desc: "Bookings, campaign delivery, stakeholder communication and logistics that don't wobble.",
    icon: (
      <Icon>
        <path d="M4 14v-4M8 17V7M12 20V4M16 17V7M20 14v-4" />
      </Icon>
    ),
  },
  {
    title: "Event & Activation Delivery",
    desc: "Two years of recurring events, owned end-to-end — prep, talent, production, floor.",
    icon: (
      <Icon>
        <path d="M4 21V9M4 9l8-5 8 5M4 21h16" />
        <path d="M9 21v-6h6v6" />
      </Icon>
    ),
  },
  {
    title: "Brand Relations",
    desc: "Keeping brands, artists and partners in the same room — and the same conversation.",
    icon: (
      <Icon>
        <circle cx="9" cy="12" r="5.5" />
        <circle cx="15" cy="12" r="5.5" />
      </Icon>
    ),
  },
  {
    title: "Decks & Presentations",
    desc: "Client-facing stories built to close — structure, design and the numbers behind them.",
    icon: (
      <Icon>
        <rect x="3" y="5" width="13" height="9" />
        <path d="M8 19h13v-7" />
        <path d="M11 9.5 13 8l2 1.5" />
      </Icon>
    ),
  },
  {
    title: "Short-Form Video",
    desc: "Hooks in the first two seconds, pacing in every frame, retention as the KPI.",
    icon: (
      <Icon>
        <rect x="8" y="3" width="8" height="18" rx="1.5" />
        <path d="M11.2 9.5v5l4-2.5z" />
      </Icon>
    ),
  },
  {
    title: "Photography & Video",
    desc: "A photography-led foundation — portrait, event, commercial and brand shoots.",
    icon: (
      <Icon>
        <path d="M4 8h3l2-3h6l2 3h3v12H4z" />
        <circle cx="12" cy="13" r="3.5" />
      </Icon>
    ),
  },
  {
    title: "Graphic Design & Branding",
    desc: "Identity, layouts and campaign collateral that keep the whole machine looking sharp.",
    icon: (
      <Icon>
        <path d="M12 3 5 10l4 4 7-7z" />
        <path d="M9 14l-4 4 3 3 4-4" />
        <path d="M14 10l3 3" />
      </Icon>
    ),
  },
  {
    title: "AI-Enabled Creative Workflows",
    desc: "ChatGPT, Gemini, Claude and Midjourney as crew members — taste stays human.",
    icon: (
      <Icon>
        <rect x="6" y="6" width="12" height="12" rx="2" />
        <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" />
        <path d="M12 9.5v5M9.5 12h5" />
      </Icon>
    ),
  },
];

const tools = [
  "CapCut", "Adobe Photoshop", "Adobe Lightroom", "Adobe Premiere Pro", "Canva", "CorelDRAW",
  "WordPress", "ChatGPT", "Gemini", "Claude", "Figma", "Midjourney",
];

const degrees: [string, string, string][] = [
  ["BSc Accounting", "Miva Open University", "Final year · expected completion Dec 2026"],
  ["National Diploma — Purchasing & Supply", "Kwara State Polytechnic", "2013 — 2015"],
];

const certificates: [string, string, string][] = [
  ["Fundamentals of Digital Marketing", "Certificate", "2020"],
  ["Cinematography", "MAP Academy", "Certificate"],
  ["Graphic Design & Advertising", "Enagy Multimedia", "Certificate"],
];

export default function Capabilities() {
  return (
    <section id="capabilities" className="bg-grid-light relative bg-paper-50 py-24 text-ink-900 md:py-36">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <T id="cap.eyebrow" as="p" className="font-mono text-[11px] uppercase tracking-[0.3em] text-bronze-600">
              05 — Capabilities
            </T>
            <T
              id="cap.heading"
              as="h2"
              className="mt-6 max-w-2xl font-display text-4xl font-light leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.4rem]"
            >
              What I bring to <em className="text-bronze-600">the table</em>.
            </T>
          </Reveal>
          <Reveal delay={150}>
            <T id="cap.note" as="p" className="max-w-sm text-sm leading-relaxed text-mist-500">
              Multidisciplinary by necessity, deliberate by design — the full loop from idea to
              audience, in one pair of hands.
            </T>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-px border border-ink-900/15 bg-ink-900/15 sm:grid-cols-2 lg:grid-cols-5">
          {caps.map((c, i) => (
            <Reveal key={c.title} delay={(i % 5) * 70} className="h-full">
              <div className="group flex h-full flex-col bg-paper-50 p-7 transition-colors duration-500 hover:bg-ink-950">
                <span className="text-bronze-600 transition-all duration-500 group-hover:-translate-y-1 group-hover:text-bronze-300">
                  {c.icon}
                </span>
                <T
                  id={`cap.item.${i}.title`}
                  as="h3"
                  className="mt-5 font-display text-lg font-medium leading-snug tracking-tight transition-colors duration-500 group-hover:text-paper-50"
                >
                  {c.title}
                </T>
                <T
                  id={`cap.item.${i}.desc`}
                  as="p"
                  className="mt-2.5 text-[13px] leading-relaxed text-mist-500 transition-colors duration-500 group-hover:text-mist-300"
                >
                  {c.desc}
                </T>
              </div>
            </Reveal>
          ))}
        </div>

        {/* full capability index */}
        <Reveal delay={100} className="mt-8">
          <T id="cap.index" as="p" className="font-mono text-[11px] uppercase leading-loose tracking-[0.18em] text-mist-500">
            <span className="text-bronze-600">Full index —</span> Creative Strategy &amp; Campaigns · Content
            Growth &amp; Audience Research · Music &amp; Artist Operations · Event &amp; Activation Delivery ·
            Brand Relations · Creative Operations · Project Coordination · Decks &amp; Presentations ·
            Short-Form Content · Photography &amp; Video · Graphic Design &amp; Branding · WordPress ·
            AI-Enabled Creative Workflows
          </T>
        </Reveal>

        {/* tools */}
        <Reveal delay={100} className="mt-14">
          <div className="flex flex-col gap-5 border border-ink-900/15 bg-paper-100 p-8 sm:flex-row sm:items-center sm:justify-between md:p-10">
            <div>
              <T id="cap.tools.eyebrow" as="p" className="font-mono text-[11px] uppercase tracking-[0.3em] text-bronze-600">
                Tools of the trade
              </T>
              <T id="cap.tools.heading" as="p" className="mt-3 font-display text-2xl font-light tracking-tight">
                The crew I <em className="text-bronze-600">work with daily</em>.
              </T>
            </div>
            <div className="flex max-w-2xl flex-wrap gap-2">
              {tools.map((t, i) => (
                <T
                  key={t}
                  id={`cap.tool.${i}`}
                  className="cursor-default border border-ink-900/20 px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-800 transition-all duration-300 hover:border-ink-950 hover:bg-ink-950 hover:text-bronze-300"
                >
                  {t}
                </T>
              ))}
            </div>
          </div>
        </Reveal>

        {/* education */}
        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2">
          <Reveal>
            <div>
              <T id="cap.edu.title" as="p" className="font-mono text-[11px] uppercase tracking-[0.3em] text-bronze-600">
                Education
              </T>
              <ul className="mt-6 divide-y divide-ink-900/10 border-y border-ink-900/10">
                {degrees.map(([deg, school, meta], i) => (
                  <li key={deg} className="group flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between">
                    <div>
                      <T
                        id={`cap.edu.${i}.name`}
                        as="p"
                        className="font-display text-xl font-medium tracking-tight transition-colors duration-300 group-hover:text-bronze-700"
                      >
                        {deg}
                      </T>
                      <T id={`cap.edu.${i}.org`} as="p" className="mt-1 text-sm text-mist-500">
                        {school}
                      </T>
                    </div>
                    <T
                      id={`cap.edu.${i}.meta`}
                      as="p"
                      className="shrink-0 font-mono text-[11px] uppercase tracking-[0.16em] text-mist-500"
                    >
                      {meta}
                    </T>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div>
              <T id="cap.cert.title" as="p" className="font-mono text-[11px] uppercase tracking-[0.3em] text-bronze-600">
                Training &amp; certificates
              </T>
              <ul className="mt-6 divide-y divide-ink-900/10 border-y border-ink-900/10">
                {certificates.map(([name, org, meta], i) => (
                  <li key={name} className="group flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between">
                    <div>
                      <T
                        id={`cap.cert.${i}.name`}
                        as="p"
                        className="font-display text-xl font-medium tracking-tight transition-colors duration-300 group-hover:text-bronze-700"
                      >
                        {name}
                      </T>
                      <T id={`cap.cert.${i}.org`} as="p" className="mt-1 text-sm text-mist-500">
                        {org}
                      </T>
                    </div>
                    <T
                      id={`cap.cert.${i}.meta`}
                      as="p"
                      className="shrink-0 font-mono text-[11px] uppercase tracking-[0.16em] text-mist-500"
                    >
                      {meta}
                    </T>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
