import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "iar.site.content.v1";

export type Overrides = Record<string, string>;

interface ImageTarget {
  id: string;
  fallback: string;
}

interface Ctx {
  editing: boolean;
  setEditing: (v: boolean) => void;
  toggleEditing: () => void;
  overrides: Overrides;
  count: number;
  get: (id: string) => string | undefined;
  getPlain: (id: string, fallback: string) => string;
  set: (id: string, value: string) => void;
  remove: (id: string) => void;
  resetAll: () => void;
  replaceAll: (next: Overrides) => void;
  imageTarget: ImageTarget | null;
  openImage: (id: string, fallback: string) => void;
  closeImage: () => void;
  storageError: string | null;
  clearStorageError: () => void;
}

const ContentCtx = createContext<Ctx | null>(null);

function readStored(): Overrides {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? (parsed as Overrides) : {};
  } catch {
    return {};
  }
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const [overrides, setOverrides] = useState<Overrides>(() =>
    typeof window === "undefined" ? {} : readStored()
  );
  const [editing, setEditing] = useState(false);
  const [imageTarget, setImageTarget] = useState<ImageTarget | null>(null);
  const [storageError, setStorageError] = useState<string | null>(null);

  // persist
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
      setStorageError(null);
    } catch {
      setStorageError(
        "Browser storage is full — your newest image may not be remembered after a refresh. Download your HTML or JSON backup now."
      );
    }
  }, [overrides]);

  // flag the document so CSS can style edit affordances
  useEffect(() => {
    const root = document.documentElement;
    if (editing) root.setAttribute("data-edit-on", "true");
    else root.removeAttribute("data-edit-on");
    return () => root.removeAttribute("data-edit-on");
  }, [editing]);

  // keyboard shortcut: cmd/ctrl + E
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "e") {
        e.preventDefault();
        setEditing((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const get = useCallback((id: string) => overrides[id], [overrides]);

  const getPlain = useCallback(
    (id: string, fallback: string) => {
      const raw = overrides[id];
      if (raw == null) return fallback;
      const div = document.createElement("div");
      div.innerHTML = raw;
      return (div.textContent || "").trim() || fallback;
    },
    [overrides]
  );

  const set = useCallback((id: string, value: string) => {
    setOverrides((prev) => (prev[id] === value ? prev : { ...prev, [id]: value }));
  }, []);

  const remove = useCallback((id: string) => {
    setOverrides((prev) => {
      if (!(id in prev)) return prev;
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const resetAll = useCallback(() => setOverrides({}), []);
  const replaceAll = useCallback((next: Overrides) => setOverrides(next || {}), []);

  const openImage = useCallback((id: string, fallback: string) => setImageTarget({ id, fallback }), []);
  const closeImage = useCallback(() => setImageTarget(null), []);

  const value = useMemo<Ctx>(
    () => ({
      editing,
      setEditing,
      toggleEditing: () => setEditing((v) => !v),
      overrides,
      count: Object.keys(overrides).length,
      get,
      getPlain,
      set,
      remove,
      resetAll,
      replaceAll,
      imageTarget,
      openImage,
      closeImage,
      storageError,
      clearStorageError: () => setStorageError(null),
    }),
    [editing, overrides, get, getPlain, set, remove, resetAll, replaceAll, imageTarget, openImage, closeImage, storageError]
  );

  return <ContentCtx.Provider value={value}>{children}</ContentCtx.Provider>;
}

export function useContent() {
  const ctx = useContext(ContentCtx);
  if (!ctx) throw new Error("useContent must be used inside <ContentProvider>");
  return ctx;
}
