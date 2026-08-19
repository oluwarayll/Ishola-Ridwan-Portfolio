import { useEffect, useState } from "react";
import { cn } from "../utils/cn";
import { T } from "../editor/Editable";

const links = [
  { label: "About", href: "#about" },
  { label: "Impact", href: "#impact" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Capabilities", href: "#capabilities" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        data-site-header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "border-b border-paper-50/10 bg-ink-950/85 backdrop-blur-md" : "border-b border-transparent"
        )}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 md:px-10">
          <a href="#top" className="group flex items-center gap-3" aria-label="Back to top">
            <T
              id="nav.monogram"
              className="flex h-10 w-10 items-center justify-center border border-bronze-400/60 font-display text-sm font-semibold tracking-wide text-bronze-300 transition-colors duration-300 group-hover:bg-bronze-400 group-hover:text-ink-950"
            >
              IR
            </T>
            <span className="hidden flex-col leading-tight sm:flex">
              <T id="nav.name" className="font-display text-[15px] font-medium tracking-wide text-paper-50">
                Ishola Ayodele Ridwan
              </T>
              <T id="nav.role" className="font-mono text-[10px] uppercase tracking-[0.22em] text-mist-400">
                Creative &amp; Digital Growth Strategist &amp; Media Operator
              </T>
            </span>
          </a>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                className="link-line font-mono text-[11px] uppercase tracking-[0.22em] text-paper-50/75 transition-colors hover:text-bronze-300"
              >
                <T id={`nav.link.${i}`}>{l.label}</T>
              </a>
            ))}
            <a
              href="#contact"
              className="group relative overflow-hidden border border-bronze-400/70 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-bronze-300 transition-colors duration-300 hover:text-ink-950"
            >
              <span className="absolute inset-0 -translate-x-full bg-bronze-400 transition-transform duration-400 ease-out group-hover:translate-x-0" />
              <T id="nav.cta" className="relative">
                Get in touch
              </T>
            </a>
          </nav>

          <button
            data-menu-toggle
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 border border-paper-50/20 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span
              className={cn(
                "h-px w-5 bg-paper-50 transition-transform duration-300",
                open && "translate-y-[3.5px] rotate-45"
              )}
            />
            <span
              className={cn(
                "h-px w-5 bg-paper-50 transition-transform duration-300",
                open && "-translate-y-[3.5px] -rotate-45"
              )}
            />
          </button>
        </div>
      </header>

      {/* mobile menu */}
      <div
        data-menu-panel
        className={cn(
          "fixed inset-0 z-40 flex flex-col justify-center bg-ink-950/[0.985] px-8 transition-opacity duration-500 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <nav className="flex flex-col gap-2" aria-label="Mobile">
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${120 + i * 70}ms` : "0ms" }}
              className={cn(
                "border-b border-paper-50/10 py-4 font-display text-4xl font-light text-paper-50 transition-all duration-500 hover:pl-3 hover:text-bronze-300",
                open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              )}
            >
              <span className="mr-4 font-mono text-xs text-bronze-400">0{i + 1}</span>
              <T id={`nav.link.${i}`}>{l.label}</T>
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            style={{ transitionDelay: open ? "480ms" : "0ms" }}
            className={cn(
              "mt-8 inline-flex w-fit items-center gap-3 bg-bronze-400 px-7 py-4 font-mono text-xs uppercase tracking-[0.22em] text-ink-950 transition-all duration-500",
              open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            )}
          >
            <T id="nav.cta">Get in touch</T>
            <span aria-hidden>→</span>
          </a>
        </nav>
        <p className={cn("mt-10 transition-opacity delay-500 duration-500", open ? "opacity-100" : "opacity-0")}>
          <T id="nav.footnote" className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist-500">
            Lagos, Nigeria — working globally
          </T>
        </p>
      </div>
    </>
  );
}
