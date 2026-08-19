import Reveal from "./Reveal";
import { useInView } from "../hooks/useInView";
import { useCountUp } from "../hooks/useCountUp";
import { T } from "../editor/Editable";
import { useContent } from "../editor/ContentContext";

function BigStat({
  id,
  value,
  decimals = 0,
  suffix,
  label,
  sub,
  start,
  delay,
}: {
  id: string;
  value: number;
  decimals?: number;
  suffix: string;
  label: string;
  sub: string;
  start: boolean;
  delay: number;
}) {
  const { editing, get } = useContent();
  const animated = useCountUp(value, start, 2200, decimals);
  const hasOverride = get(`${id}.value`) != null;
  // freeze on the final number while editing so the field is stable to type into
  const shown = editing || hasOverride ? value.toFixed(decimals) : animated;

  return (
    <Reveal
      delay={delay}
      className="group border border-paper-50/12 p-7 transition-colors duration-500 hover:border-bronze-400/50 md:p-9"
    >
      <p className="font-display text-6xl font-light tracking-tight text-paper-50 transition-colors duration-500 group-hover:text-bronze-300 md:text-7xl">
        <T id={`${id}.value`}>{shown}</T>
        <T id={`${id}.suffix`} className="ml-1 text-3xl font-normal text-bronze-400 md:text-4xl">
          {suffix}
        </T>
      </p>
      <T id={`${id}.label`} as="p" className="mt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-paper-50/85">
        {label}
      </T>
      <T id={`${id}.sub`} as="p" className="mt-2 text-sm leading-relaxed text-mist-400">
        {sub}
      </T>
    </Reveal>
  );
}

const small: [string, string][] = [
  ["200+", "influencers coordinated on a single artist campaign"],
  ["₦6M", "in campaign spend executed end-to-end"],
  ["1.6M", "views on a single short-form video"],
  ["45.5% UK", "of current audience — plus 20.5% from the US"],
  ["85%+", "of viewers aged 25 and over"],
];

export default function Impact() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.25 });

  return (
    <section id="impact" className="relative bg-ink-900 py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <T id="impact.eyebrow" as="p" className="font-mono text-[11px] uppercase tracking-[0.3em] text-bronze-300">
              02 — Selected impact
            </T>
            <T id="impact.heading" as="h2" className="mt-6 font-display text-4xl font-light leading-tight tracking-tight sm:text-5xl">
              Numbers I <em className="text-bronze-300">stand behind</em>.
            </T>
          </Reveal>
          <Reveal delay={150}>
            <T id="impact.note" as="p" className="max-w-xs text-sm leading-relaxed text-mist-400">
              Pulled from twelve-month TikTok analytics windows and campaign delivery records. No
              rounding up, no borrowed reach.
            </T>
          </Reveal>
        </div>

        <div ref={ref} className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <BigStat
            id="impact.big.0"
            start={inView}
            delay={0}
            value={7}
            suffix="M"
            label="Post views — 12 months"
            sub="On the current flagship entertainment-media property."
          />
          <BigStat
            id="impact.big.1"
            start={inView}
            delay={90}
            value={6.4}
            decimals={1}
            suffix="M"
            label="Unique viewers reached"
            sub="A predominantly international, English-speaking audience."
          />
          <BigStat
            id="impact.big.2"
            start={inView}
            delay={180}
            value={12.6}
            decimals={1}
            suffix="K"
            label="Followers — current property"
            sub="With 117.9K likes, 10.2K shares and 4.5K comments in the window."
          />
          <BigStat
            id="impact.big.3"
            start={inView}
            delay={270}
            value={40}
            suffix="K+"
            label="Combined portfolio reach"
            sub="Three operated faceless properties, five-figure follower counts each."
          />
        </div>

        <div className="mt-4 grid grid-cols-1 gap-px border border-paper-50/12 bg-paper-50/12 sm:grid-cols-2 lg:grid-cols-5">
          {small.map(([big, sub], i) => (
            <Reveal key={big} delay={i * 70} className="group bg-ink-900 p-6 transition-colors duration-400 hover:bg-ink-850">
              <T
                id={`impact.small.${i}.value`}
                as="p"
                className="font-display text-2xl font-medium text-bronze-300 transition-transform duration-400 group-hover:-translate-y-0.5 sm:text-3xl"
              >
                {big}
              </T>
              <T id={`impact.small.${i}.label`} as="p" className="mt-2 text-[13px] leading-relaxed text-mist-400">
                {sub}
              </T>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
