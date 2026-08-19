import { useRef, useState } from "react";
import { useContent } from "./ContentContext";
import { downloadBlob, exportHtml } from "./exportHtml";
import { cn } from "../utils/cn";

export default function EditorToolbar() {
  const { editing, toggleEditing, setEditing, count, overrides, resetAll, replaceAll, storageError } = useContent();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const flash = (msg: string) => {
    setStatus(msg);
    setTimeout(() => setStatus(null), 3200);
  };

  const handleDownloadHtml = async () => {
    const wasEditing = editing;
    setEditing(false);
    flash("Packaging your site…");
    // let React paint the non-editing DOM before serialising
    await new Promise((r) => setTimeout(r, 120));
    try {
      await exportHtml();
      flash("Downloaded! Open the file in any browser.");
    } catch {
      flash("Export failed — please try again.");
    }
    if (wasEditing) setEditing(true);
  };

  const handleSaveJson = () => {
    downloadBlob(
      new Blob([JSON.stringify(overrides, null, 2)], { type: "application/json" }),
      "site-content-backup.json"
    );
    flash("Backup saved.");
  };

  const handleLoadJson = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        replaceAll(JSON.parse(String(reader.result)));
        flash("Backup restored.");
      } catch {
        flash("That file could not be read.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div data-editor-ui className="fixed bottom-5 right-5 z-[110] flex flex-col items-end gap-3 print:hidden">
      {/* status toast */}
      {(status || storageError) && (
        <div className="max-w-xs border border-bronze-400/60 bg-ink-950/95 px-4 py-3 text-[12px] leading-relaxed text-paper-50 shadow-xl backdrop-blur">
          {status || storageError}
        </div>
      )}

      {/* panel */}
      <div
        className={cn(
          "w-[min(92vw,21rem)] origin-bottom-right border border-paper-50/15 bg-ink-950/97 shadow-2xl backdrop-blur transition-all duration-300",
          open ? "scale-100 opacity-100" : "pointer-events-none translate-y-2 scale-95 opacity-0"
        )}
      >
        <div className="flex items-center justify-between border-b border-paper-50/12 px-5 py-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-bronze-300">Live editor</p>
            <p className="mt-1 text-[11px] text-mist-400">
              {count === 0 ? "No changes yet" : `${count} change${count === 1 ? "" : "s"} saved in this browser`}
            </p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="flex h-8 w-8 items-center justify-center border border-paper-50/20 text-base leading-none text-paper-50 transition-colors hover:border-bronze-400 hover:text-bronze-300"
            aria-label="Close editor panel"
          >
            ×
          </button>
        </div>

        {/* edit toggle */}
        <button
          onClick={toggleEditing}
          className={cn(
            "flex w-full items-center justify-between px-5 py-4 text-left transition-colors",
            editing ? "bg-bronze-500/20" : "hover:bg-paper-50/5"
          )}
        >
          <span>
            <span className="block font-display text-base font-medium text-paper-50">
              {editing ? "Edit mode is ON" : "Turn on edit mode"}
            </span>
            <span className="mt-0.5 block text-[11px] text-mist-400">
              {editing ? "Click any text or photo to change it" : "Shortcut: Ctrl / ⌘ + E"}
            </span>
          </span>
          <span
            className={cn(
              "relative h-6 w-11 shrink-0 rounded-full border transition-colors",
              editing ? "border-bronze-400 bg-bronze-400" : "border-paper-50/30 bg-transparent"
            )}
          >
            <span
              className={cn(
                "absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full transition-all",
                editing ? "left-6 bg-ink-950" : "left-1 bg-paper-50/70"
              )}
            />
          </span>
        </button>

        {/* how to */}
        <ol className="space-y-2 border-t border-paper-50/12 px-5 py-4 text-[11.5px] leading-relaxed text-mist-400">
          <li>
            <span className="text-bronze-300">1.</span> Turn on edit mode — dashed outlines appear.
          </li>
          <li>
            <span className="text-bronze-300">2.</span> Click text to type. Click a photo to upload your own.
          </li>
          <li>
            <span className="text-bronze-300">3.</span> Click away to save. Everything is kept in this browser.
          </li>
          <li>
            <span className="text-bronze-300">4.</span> Download the HTML — one file, images included.
          </li>
        </ol>

        {/* actions */}
        <div className="grid grid-cols-1 gap-px border-t border-paper-50/12 bg-paper-50/12">
          <button
            onClick={handleDownloadHtml}
            className="group bg-bronze-400 px-5 py-4 text-left font-mono text-[11px] uppercase tracking-[0.2em] text-ink-950 transition-colors hover:bg-paper-50"
          >
            ↓ Download website (.html)
          </button>
          <div className="grid grid-cols-2 gap-px bg-paper-50/12">
            <button
              onClick={handleSaveJson}
              className="bg-ink-950 px-4 py-3.5 font-mono text-[10px] uppercase tracking-[0.16em] text-paper-50 transition-colors hover:bg-ink-850 hover:text-bronze-300"
            >
              Save backup
            </button>
            <button
              onClick={() => fileRef.current?.click()}
              className="bg-ink-950 px-4 py-3.5 font-mono text-[10px] uppercase tracking-[0.16em] text-paper-50 transition-colors hover:bg-ink-850 hover:text-bronze-300"
            >
              Load backup
            </button>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={(e) => handleLoadJson(e.target.files?.[0])}
          />
          <button
            onClick={() => {
              if (confirm("Reset every edit and restore the original site?")) {
                resetAll();
                flash("All edits cleared.");
              }
            }}
            className="bg-ink-950 px-5 py-3.5 text-left font-mono text-[10px] uppercase tracking-[0.16em] text-mist-500 transition-colors hover:text-clay-500"
          >
            Reset all changes
          </button>
        </div>
      </div>

      {/* floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "group flex items-center gap-3 border px-5 py-4 font-mono text-[11px] uppercase tracking-[0.2em] shadow-2xl backdrop-blur transition-all duration-300",
          editing
            ? "border-bronze-400 bg-bronze-400 text-ink-950"
            : "border-paper-50/25 bg-ink-950/95 text-paper-50 hover:border-bronze-400 hover:text-bronze-300"
        )}
        aria-label="Open the site editor"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4" aria-hidden>
          <path d="M4 20h4l10.5-10.5a2.1 2.1 0 0 0-3-3L5 17v3z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {editing ? "Editing" : "Edit site"}
        {count > 0 && (
          <span
            className={cn(
              "flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px]",
              editing ? "bg-ink-950 text-bronze-300" : "bg-bronze-400 text-ink-950"
            )}
          >
            {count}
          </span>
        )}
      </button>
    </div>
  );
}
