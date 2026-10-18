import { useEffect, useRef } from "react";
import { escapeHtml, highlightJs, wrapCodeBlocks } from "../lib/html.js";

export function answerHtml(item) {
  const raw = item.source === "you" ? `<p>${escapeHtml(item.a).replaceAll("\n", "<br>")}</p>` : item.a;
  return wrapCodeBlocks(raw);
}

export function HtmlBlock({ html }) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const onClick = (event) => {
      const button = event.target.closest(".copy-btn");
      if (!button || !node.contains(button)) return;
      const code = button.closest(".code-panel, .output-panel")?.querySelector("code")?.textContent || "";
      navigator.clipboard.writeText(code).then(() => {
        button.classList.add("is-copied");
        button.setAttribute("aria-label", "Copied");
        window.setTimeout(() => {
          button.classList.remove("is-copied");
          button.setAttribute("aria-label", "Copy");
        }, 1200);
      });
    };
    node.addEventListener("click", onClick);
    return () => node.removeEventListener("click", onClick);
  }, [html]);

  return <div ref={ref} dangerouslySetInnerHTML={{ __html: html }} />;
}

export function QuizPrompt({ question }) {
  const [title, ...rest] = String(question).split("\n");
  const code = rest.join("\n").trim();
  return (
    <>
      <strong>{title}</strong>
      {code ? (
        <pre className="quiz-code">
          <code dangerouslySetInnerHTML={{ __html: highlightJs(escapeHtml(code)) }} />
        </pre>
      ) : null}
    </>
  );
}
