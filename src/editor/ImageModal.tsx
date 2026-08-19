import { useEffect, useRef, useState } from "react";
import { useContent } from "./ContentContext";

/** Downscale + compress an uploaded image so it comfortably fits in browser storage. */
function fileToDataUrl(file: File, maxSide = 1600, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read that file."));
    reader.onload = () => {
      const raw = String(reader.result);
      const img = new Image();
      img.onerror = () => reject(new Error("That file isn't a readable image."));
      img.onload = () => {
        const scale = Math.min(1, maxSide / Math.max(img.width, img.height));
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) return resolve(raw);
        ctx.drawImage(img, 0, 0, w, h);
        const hasAlpha = file.type === "image/png";
        resolve(canvas.toDataURL(hasAlpha ? "image/png" : "image/jpeg", quality));
      };
      img.src = raw;
    };
    reader.readAsDataURL(file);
  });
}

export default function ImageModal() {
  const { imageTarget, closeImage, set, remove, get } = useContent();
  const [url, setUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setUrl("");
    setError(null);
    setBusy(false);
  }, [imageTarget]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeImage();
    if (imageTarget) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [imageTarget, closeImage]);

  if (!imageTarget) return null;
  const { id, fallback } = imageTarget;
  const current = get(id) ?? fallback;

  const handleFile = async (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file (JPG, PNG or WebP).");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      set(id, await fileToDataUrl(file));
      closeImage();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setBusy(false);
    }
  };

  return (
    <div
      data-editor-ui
      className="fixed inset-0 z-[120] flex items-center justify-center bg-ink-950/85 p-4 backdrop-blur-sm"
      onClick={closeImage}
      role="dialog"
      aria-modal="true"
      aria-label="Replace image"
    >
      <div
        className="w-full max-w-lg border border-ink-900/20 bg-paper-50 text-ink-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-ink-900/15 px-6 py-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-bronze-600">Replace image</p>
            <p className="mt-1 font-display text-lg font-medium">{id}</p>
          </div>
          <button
            onClick={closeImage}
            className="flex h-9 w-9 items-center justify-center border border-ink-900/20 text-lg leading-none transition-colors hover:bg-ink-950 hover:text-paper-50"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="flex gap-5 px-6 py-5">
          <img src={current} alt="" className="h-32 w-24 shrink-0 border border-ink-900/15 object-cover" />
          <div className="min-w-0 flex-1">
            <button
              disabled={busy}
              onClick={() => inputRef.current?.click()}
              className="w-full bg-ink-950 px-5 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-paper-50 transition-colors hover:bg-bronze-500 disabled:opacity-60"
            >
              {busy ? "Processing…" : "Upload from device"}
            </button>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
            <p className="mt-2 text-[11px] leading-relaxed text-mist-500">
              Large photos are resized automatically. Portraits look best at a 4:5 ratio.
            </p>

            <div className="mt-4 flex items-center gap-2">
              <span className="h-px flex-1 bg-ink-900/15" />
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-mist-500">or</span>
              <span className="h-px flex-1 bg-ink-900/15" />
            </div>

            <form
              className="mt-4 flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                if (!url.trim()) return;
                set(id, url.trim());
                closeImage();
              }}
            >
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste an image URL"
                className="min-w-0 flex-1 border border-ink-900/25 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-bronze-500"
              />
              <button className="border border-ink-900/25 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors hover:bg-ink-950 hover:text-paper-50">
                Apply
              </button>
            </form>

            {error && <p className="mt-3 text-xs font-semibold text-clay-500">{error}</p>}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-ink-900/15 px-6 py-4">
          <button
            onClick={() => {
              remove(id);
              closeImage();
            }}
            className="font-mono text-[10px] uppercase tracking-[0.18em] text-mist-500 underline-offset-4 hover:text-clay-500 hover:underline"
          >
            Reset to original
          </button>
          <button
            onClick={closeImage}
            className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-800 underline-offset-4 hover:underline"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
