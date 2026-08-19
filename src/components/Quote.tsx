import Reveal from "./Reveal";
import { T, Img } from "../editor/Editable";

export default function Quote() {
  return (
    <section className="relative overflow-hidden bg-ink-950 py-28 md:py-40">
      {/* oversized quotation mark */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-16 left-4 select-none font-display text-[22rem] font-semibold leading-none text-bronze-400/15 md:left-16"
      >
        &ldquo;
      </span>
      <div className="pointer-events-none absolute -right-32 top-1/3 h-96 w-96 rounded-full bg-bronze-500/10 blur-[130px]" />

      <div className="relative mx-auto max-w-[1440px] px-5 md:px-10">
        <Reveal>
          <T id="quote.eyebrow" as="p" className="font-mono text-[11px] uppercase tracking-[0.3em] text-bronze-300">
            The operating idea
          </T>
        </Reveal>
        <Reveal delay={120}>
          <blockquote className="mt-10 max-w-4xl">
            <T
              id="quote.text"
              as="p"
              className="font-display text-[2.1rem] font-light leading-[1.18] tracking-tight text-paper-50 sm:text-5xl md:text-[3.6rem]"
            >
              Attention is a <em className="text-bronze-300">craft</em>, not a lottery. I build
              stories strangers stop for — then turn every pause into reach, audience and revenue
              you can <em className="text-bronze-300">measure</em>.
            </T>
          </blockquote>
        </Reveal>
        <Reveal delay={220}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <span className="h-px w-14 bg-bronze-400" aria-hidden />
            <T id="quote.attribution" as="p" className="font-mono text-[11px] uppercase tracking-[0.24em] text-mist-400">
              — Ishola Ayodele Ridwan · working note from the edit room
            </T>
          </div>
        </Reveal>

        {/* tilted portrait postcard */}
        <Reveal delay={320} variant="scale" className="absolute -bottom-4 right-8 hidden xl:block">
          <figure className="w-52 rotate-2 border border-paper-50/20 bg-ink-900 p-2.5 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] transition-transform duration-500 hover:rotate-0">
            <Img
              id="quote.portrait"
              src="./images/portrait-suit.jpg"
              alt="Ishola seated in the studio, third portrait"
              className="aspect-[4/5] w-full object-cover"
            />
            <figcaption className="flex items-center justify-between pt-2.5 font-mono text-[9px] uppercase tracking-[0.18em] text-mist-500">
              <T id="quote.caption.1">The edit room</T>
              <T id="quote.caption.2" className="text-bronze-300">
                Lagos
              </T>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
