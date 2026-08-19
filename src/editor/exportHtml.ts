/** Minimal runtime re-added to the exported static file so the header + mobile menu still work. */
const RUNTIME = `
(function(){
  var h=document.querySelector('[data-site-header]');
  if(h){var s=function(){var on=window.scrollY>40;
    h.classList.toggle('bg-ink-950/85',on);h.classList.toggle('backdrop-blur-md',on);
    h.classList.toggle('border-paper-50/10',on);h.classList.toggle('border-transparent',!on);};
    s();window.addEventListener('scroll',s,{passive:true});}
  var b=document.querySelector('[data-menu-toggle]'),p=document.querySelector('[data-menu-panel]'),open=false;
  function setMenu(v){open=v;
    p.classList.toggle('opacity-100',v);p.classList.toggle('opacity-0',!v);
    p.classList.toggle('pointer-events-none',!v);
    Array.prototype.forEach.call(p.querySelectorAll('a'),function(a){
      a.classList.toggle('opacity-100',v);a.classList.toggle('opacity-0',!v);
      a.classList.toggle('translate-y-0',v);a.classList.toggle('translate-y-6',!v);});
    Array.prototype.forEach.call(b.children,function(l,i){
      l.classList.toggle(i===0?'translate-y-[3.5px]':'-translate-y-[3.5px]',v);
      l.classList.toggle(i===0?'rotate-45':'-rotate-45',v);});
    document.body.style.overflow=v?'hidden':'';}
  if(b&&p){b.addEventListener('click',function(){setMenu(!open);});
    Array.prototype.forEach.call(p.querySelectorAll('a'),function(a){a.addEventListener('click',function(){setMenu(false);});});}
})();`;

async function toDataUrl(src: string): Promise<string> {
  const res = await fetch(src);
  const blob = await res.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

/**
 * Serialises the live DOM (with all edits applied) into a single, self-contained
 * HTML file: editor UI stripped, images inlined as data URLs, scroll animations
 * pre-revealed so nothing is invisible.
 */
export async function exportHtml(fileName = "ishola-ayodele-ridwan.html") {
  const clone = document.documentElement.cloneNode(true) as HTMLElement;

  // 1. strip the editor entirely
  clone.querySelectorAll("[data-editor-ui], script").forEach((n) => n.remove());
  clone.removeAttribute("data-edit-on");
  clone.querySelectorAll("[contenteditable]").forEach((el) => {
    el.removeAttribute("contenteditable");
    el.removeAttribute("spellcheck");
    el.removeAttribute("tabindex");
    el.removeAttribute("role");
    el.removeAttribute("title");
  });
  clone.querySelectorAll("[data-editable]").forEach((el) => el.removeAttribute("data-editable"));
  clone.querySelectorAll("[data-editimg]").forEach((el) => el.removeAttribute("data-editimg"));

  // 2. make sure scroll-reveal content is visible in the static file
  clone.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-in"));

  // 3. inline every image as a data URL so the file works on its own
  const imgs = Array.from(clone.querySelectorAll("img"));
  const cache = new Map<string, string>();
  await Promise.all(
    imgs.map(async (img) => {
      const src = img.getAttribute("src") || "";
      if (!src || src.startsWith("data:")) return;
      try {
        if (!cache.has(src)) cache.set(src, await toDataUrl(src));
        img.setAttribute("src", cache.get(src)!);
      } catch {
        /* leave the original src if it can't be fetched */
      }
    })
  );

  // 4. re-add the tiny nav runtime
  const script = document.createElement("script");
  script.textContent = RUNTIME;
  clone.querySelector("body")?.appendChild(script);

  const html = "<!doctype html>\n" + clone.outerHTML;
  downloadBlob(new Blob([html], { type: "text/html;charset=utf-8" }), fileName);
}
