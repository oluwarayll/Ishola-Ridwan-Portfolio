import { T } from "../editor/Editable";

const items = [
  "Content Strategy",
  "Short-Form Video",
  "Artist Operations",
  "Campaign Execution",
  "Events & Activations",
  "Brand Relations",
  "Growth Analytics",
  "AI-Enabled Workflows",
];

function Diamond() {
  return (
    <svg viewBox="0 0 12 12" className="mx-8 h-3 w-3 shrink-0 text-bronze-400" aria-hidden>
      <rect x="2.6" y="2.6" width="6.8" height="6.8" transform="rotate(45 6 6)" fill="currentColor" />
    </svg>
  );
}

export default function Marquee() {
  return (
    <div className="marquee overflow-hidden border-y border-paper-50/10 bg-ink-900 py-5">
      <div className="marquee-track" style={{ ["--marquee-speed" as string]: "38s" }}>
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center">
            {items.map((item, i) => (
              <span key={`${half}-${i}`} className="flex items-center whitespace-nowrap">
                <T
                  id={`marquee.item.${i}`}
                  className="font-display text-xl font-light italic tracking-wide text-paper-50/80 sm:text-2xl"
                >
                  {item}
                </T>
                <Diamond />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
