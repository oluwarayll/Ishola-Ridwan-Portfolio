import Reveal from "./Reveal";
import { T } from "../editor/Editable";

interface Role {
  period: string;
  place: string;
  location: string;
  title: string;
  points: string[];
  tags?: string[];
}

const roles: Role[] = [
  {
    period: "Jan 2024 — Present",
    place: "IndustryNite.xyz",
    location: "Lagos · Hybrid",
    title: "Director — Music Operations, Creative Strategy & Events",
    points: [
      "Partner with the CEO and internal teams to develop creative concepts, campaign strategies and execution plans for artists, brands, cultural projects and live experiences.",
      "Coordinate music and artist-related operations — bookings, campaign delivery, stakeholder communication, project logistics and creative requirements.",
      "Lead and coordinate recurring Industry Nite events for nearly two years with substantial ownership across preparation, talent coordination, production support and on-the-ground delivery — frequently with limited support.",
      "Develop project decks, proposals, campaign materials and client-facing presentations; support commercial administration including invoicing and project documentation.",
      "Support projects and cultural initiatives including Felabration, Don't Gag Me and 16 Stories.",
    ],
    tags: [
      "MTN", "Johnnie Walker", "Hennessy", "Digifon", "TRACE Naija", "Oxytane", "Vybz FM", "CREAM",
      "2Baba", "D'banj", "Frank Edwards", "El Carnaval",
    ],
  },
  {
    period: "2025 — Present",
    place: "Independent",
    location: "Remote · International",
    title: "Digital Media Operator — Faceless Entertainment Media Portfolio",
    points: [
      "Build and operate faceless celebrity and entertainment news properties for international English-speaking audiences, with current and previous pages at five-figure follower counts.",
      "Drive the current property to 7M post views in the latest 12-month analytics window — 117.9K likes, 10.2K shares, 4.5K comments.",
      "Grow an audience concentrated in the UK and US with 85%+ of viewers aged 25+, demonstrating repeatable targeting beyond a local market.",
      "Run a research-to-publishing workflow: trend monitoring, story selection, AI-assisted research and scripting, visual asset sourcing, short-form production.",
      "Monetise qualifying content through TikTok's creator rewards ecosystem while improving compliant acquisition and platform durability.",
    ],
  },
  {
    period: "2018 — Present",
    place: "PBA Studios",
    location: "Lagos · Project-based",
    title: "Founder & Creative Lead",
    points: [
      "Founded and operate a photography-led creative business delivering photography, videography, graphic design, branding, content creation and selected WordPress builds.",
      "Manage projects from client brief and visual concept through production, editing and final delivery — creative direction plus hands-on technical execution.",
      "Built a broad visual-production foundation across portrait, event, commercial and brand-focused work; selected portfolio work available on Behance.",
    ],
  },
];

const earlier: [string, string][] = [
  ["House of Ebony Spa", "Social media & brand support for a newly launched spa — identity, content direction, early audience."],
  ["Legal Practice", "Personal assistant & social media support — administration, page management, client coordination."],
  ["Smartfix Innovative", "Marketing, graphic design, content creation and website development support."],
  ["Sally Bawa Fashion House", "Project support, design preparation and photographic content production."],
  ["Hitech Café & P.M Petroleum", "Customer service, administration and day-to-day operational experience."],
];

export default function Experience() {
  return (
    <section id="experience" className="relative bg-ink-950 py-24 md:py-36">
      <div className="pointer-events-none absolute right-0 top-24 h-80 w-80 rounded-full bg-clay-500/10 blur-[120px]" />
      <div className="relative mx-auto max-w-[1440px] px-5 md:px-10">
        <Reveal>
          <T id="exp.eyebrow" as="p" className="font-mono text-[11px] uppercase tracking-[0.3em] text-bronze-300">
            04 — Experience
          </T>
          <T
            id="exp.heading"
            as="h2"
            className="mt-6 max-w-3xl font-display text-4xl font-light leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.4rem]"
          >
            A long way round, <em className="text-bronze-300">on purpose</em>.
          </T>
          <T id="exp.note" as="p" className="mt-6 max-w-xl text-sm leading-relaxed text-mist-400">
            From café counters and legal offices to event floors and the edit bay — every role
            bought a skill the next one needed.
          </T>
        </Reveal>

        <div className="mt-16 space-y-0">
          {roles.map((r, ri) => (
            <Reveal key={r.place} delay={ri * 80}>
              <article className="group relative grid grid-cols-1 gap-6 border-t border-paper-50/12 py-12 md:grid-cols-12 md:gap-8">
                {/* period column */}
                <div className="md:col-span-4">
                  <T id={`exp.role.${ri}.period`} as="p" className="font-mono text-[11px] uppercase tracking-[0.2em] text-bronze-300">
                    {r.period}
                  </T>
                  <T
                    id={`exp.role.${ri}.place`}
                    as="p"
                    className="mt-3 font-display text-2xl font-medium tracking-tight text-paper-50 transition-colors duration-300 group-hover:text-bronze-200"
                  >
                    {r.place}
                  </T>
                  <T
                    id={`exp.role.${ri}.location`}
                    as="p"
                    className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-mist-500"
                  >
                    {r.location}
                  </T>
                </div>

                {/* content column */}
                <div className="md:col-span-8 md:pl-4 lg:pl-10">
                  <T
                    id={`exp.role.${ri}.title`}
                    as="h3"
                    className="font-display text-xl font-light italic leading-snug text-paper-50/90 sm:text-2xl"
                  >
                    {r.title}
                  </T>
                  <ul className="mt-6 space-y-4">
                    {r.points.map((p, pi) => (
                      <li key={p} className="flex gap-4 text-[15px] leading-relaxed text-mist-300">
                        <span className="mt-[11px] h-px w-5 shrink-0 bg-bronze-400/70" aria-hidden />
                        <T id={`exp.role.${ri}.point.${pi}`}>{p}</T>
                      </li>
                    ))}
                  </ul>
                  {r.tags && (
                    <div className="mt-7 flex flex-wrap gap-2">
                      {r.tags.map((t, ti) => (
                        <T
                          key={t}
                          id={`exp.role.${ri}.tag.${ti}`}
                          className="border border-paper-50/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-mist-300 transition-colors duration-300 hover:border-bronze-400/60 hover:text-bronze-300"
                        >
                          {t}
                        </T>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* earlier chapters */}
        <Reveal className="mt-20">
          <T id="exp.earlier.title" as="p" className="font-mono text-[11px] uppercase tracking-[0.3em] text-mist-500">
            Earlier chapters
          </T>
          <div className="mt-6 grid grid-cols-1 gap-px border border-paper-50/12 bg-paper-50/12 sm:grid-cols-2 lg:grid-cols-5">
            {earlier.map(([name, desc], i) => (
              <div key={name} className="group bg-ink-950 p-6 transition-colors duration-400 hover:bg-ink-850">
                <span className="block h-px w-6 bg-bronze-400/60 transition-all duration-400 group-hover:w-12 group-hover:bg-bronze-400" />
                <T id={`exp.earlier.${i}.name`} as="p" className="mt-4 font-display text-base font-medium leading-snug text-paper-50">
                  {name}
                </T>
                <T id={`exp.earlier.${i}.desc`} as="p" className="mt-2 text-[12.5px] leading-relaxed text-mist-500">
                  {desc}
                </T>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
