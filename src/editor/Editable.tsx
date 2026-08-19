import { createElement, type CSSProperties, type ReactNode } from "react";
import { useContent } from "./ContentContext";

type Tag = "span" | "p" | "h1" | "h2" | "h3" | "li" | "div" | "dd" | "dt" | "figcaption" | "strong" | "em";

interface TProps {
  id: string;
  as?: Tag;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  /** allow multi-line editing (Enter inserts a line break) */
  multiline?: boolean;
}

/**
 * Editable text node.
 * - Renders `children` by default.
 * - If the user has saved an override for `id`, that HTML is rendered instead.
 * - In edit mode the element becomes contentEditable and saves on blur.
 */
export function T({ id, as = "span", className, style, children, multiline = true }: TProps) {
  const { editing, get, set } = useContent();
  const override = get(id);

  const base: Record<string, unknown> = {
    className,
    style,
    "data-editable": id,
  };

  if (!editing) {
    return override != null
      ? createElement(as, { ...base, dangerouslySetInnerHTML: { __html: override } })
      : createElement(as, base, children);
  }

  const editProps: Record<string, unknown> = {
    ...base,
    contentEditable: true,
    suppressContentEditableWarning: true,
    spellCheck: false,
    role: "textbox",
    tabIndex: 0,
    title: "Click to edit this text",
    onBlur: (e: React.FocusEvent<HTMLElement>) => set(id, e.currentTarget.innerHTML.trim()),
    onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => {
      if (e.key === "Escape") {
        e.currentTarget.blur();
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault();
        if (multiline && !e.shiftKey) document.execCommand("insertLineBreak");
        else e.currentTarget.blur();
      }
    },
    // paste as plain text so pasted styling never breaks the layout
    onPaste: (e: React.ClipboardEvent<HTMLElement>) => {
      e.preventDefault();
      const text = e.clipboardData.getData("text/plain");
      document.execCommand("insertText", false, text);
    },
  };

  return override != null
    ? createElement(as, { ...editProps, dangerouslySetInnerHTML: { __html: override } })
    : createElement(as, editProps, children);
}

interface ImgProps {
  id: string;
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
}

/** Editable image — click while in edit mode to upload or link a replacement. */
export function Img({ id, src, alt, className, loading }: ImgProps) {
  const { editing, get, openImage } = useContent();
  const finalSrc = get(id) ?? src;

  return (
    <img
      src={finalSrc}
      alt={alt}
      className={className}
      loading={loading}
      data-editimg={id}
      title={editing ? "Click to replace this image" : undefined}
      onClick={
        editing
          ? (e) => {
              e.preventDefault();
              e.stopPropagation();
              openImage(id, src);
            }
          : undefined
      }
    />
  );
}
