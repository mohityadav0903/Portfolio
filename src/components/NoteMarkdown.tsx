import { isValidElement, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import { createHighlighter, type Highlighter } from "shiki";
import { NoteDiagram } from "@/components/NoteDiagrams";

const highlighter = createHighlighter({
  themes: ["github-light", "github-dark-dimmed"],
  langs: ["typescript", "bash"],
});

function fence(children: ReactNode): { lang: string; code: string } | null {
  if (!isValidElement(children)) return null;
  const props = children.props as { className?: string; children?: ReactNode };
  const lang = /language-([\w-]+)/.exec(props.className ?? "")?.[1];
  if (!lang) return null;
  return { lang, code: String(props.children ?? "").replace(/\n$/, "") };
}

function highlighted(engine: Highlighter, lang: string, code: string) {
  const html = engine.codeToHtml(code, {
    lang,
    themes: { light: "github-light", dark: "github-dark-dimmed" },
    defaultColor: false,
  });
  return (
    <div className="note-code">
      <div className="note-code-lang">{lang}</div>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

export async function NoteMarkdown({ markdown }: { markdown: string }) {
  const engine = await highlighter;

  return (
    <div className="note">
      <ReactMarkdown
        components={{
          a({ href, children }) {
            const external = href?.startsWith("http");
            return (
              <a href={href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
                {children}
              </a>
            );
          },
          pre({ children }) {
            const block = fence(children);
            if (!block) return <pre>{children}</pre>;
            if (block.lang === "diagram") return <NoteDiagram id={block.code.trim()} />;
            if (block.lang === "text") {
              return (
                <div className="note-code">
                  <pre className="note-tree">{block.code}</pre>
                </div>
              );
            }
            return highlighted(engine, block.lang, block.code);
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
