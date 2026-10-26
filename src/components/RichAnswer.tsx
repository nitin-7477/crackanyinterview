"use client";

import React, { useMemo } from "react";
import { CodeBlock } from "./CodeBlock";

interface RichAnswerProps {
  content?: string;
  className?: string;
}

// Decode standard HTML entities
function decodeHtmlEntities(str: string): string {
  return str
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&nbsp;", " ");
}

interface ContentChunk {
  type: "html" | "code" | "output";
  raw: string;
}

// Parse answer HTML string into structured chunks (Text HTML, Code Blocks, and Output Blocks)
function parseAnswerChunks(htmlString: string): ContentChunk[] {
  if (!htmlString) return [];

  const chunks: ContentChunk[] = [];
  const codeRegex = /<pre><code>([\s\S]*?)<\/code><\/pre>/gi;
  const outputRegex = /<p><strong>Output<\/strong><\/p>\s*<p><code>([\s\S]*?)<\/code><\/p>/gi;

  // First replace output markers with a custom delimiter if present
  let normalized = htmlString.replace(outputRegex, (_, output) => {
    return `___OUTPUT_BLOCK_START___${output}___OUTPUT_BLOCK_END___`;
  });

  // Split by code blocks
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = codeRegex.exec(normalized)) !== null) {
    const textBefore = normalized.slice(lastIndex, match.index);
    if (textBefore.trim()) {
      processTextAndOutput(textBefore, chunks);
    }

    const rawCode = decodeHtmlEntities(match[1]);
    chunks.push({
      type: "code",
      raw: rawCode,
    });

    lastIndex = match.index + match[0].length;
  }

  const remaining = normalized.slice(lastIndex);
  if (remaining.trim()) {
    processTextAndOutput(remaining, chunks);
  }

  return chunks;
}

function processTextAndOutput(text: string, chunks: ContentChunk[]) {
  const parts = text.split(/___OUTPUT_BLOCK_START___([\s\S]*?)___OUTPUT_BLOCK_END___/g);
  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 1) {
      // It's an output block
      chunks.push({
        type: "output",
        raw: decodeHtmlEntities(parts[i].replace(/<br\s*\/?>/gi, "\n")),
      });
    } else if (parts[i].trim()) {
      chunks.push({
        type: "html",
        raw: parts[i],
      });
    }
  }
}

export function RichAnswer({ content = "", className = "" }: RichAnswerProps) {
  const chunks = useMemo(() => parseAnswerChunks(content), [content]);

  if (!content) return null;

  return (
    <div className={`answer-prose text-xs leading-relaxed space-y-3 ${className}`}>
      {chunks.map((chunk, index) => {
        if (chunk.type === "code") {
          return <CodeBlock key={index} code={chunk.raw} />;
        }

        if (chunk.type === "output") {
          return (
            <div
              key={index}
              className="my-3 rounded-xl border border-zinc-800 bg-[#0c0c0e] p-3 font-mono text-[11px] text-zinc-300"
            >
              <div className="text-[10px] uppercase font-semibold text-zinc-500 mb-1.5 tracking-wider">
                Output:
              </div>
              <pre className="whitespace-pre-wrap">{chunk.raw}</pre>
            </div>
          );
        }

        // Standard rich HTML fragment
        return (
          <div
            key={index}
            className="prose-text text-[var(--ink)] leading-relaxed text-xs [&>p]:mb-2.5 [&>p:last-child]:mb-0 [&_code]:font-mono [&_code]:text-[11px] [&_code]:bg-[var(--surface)] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:border [&_code]:border-[var(--line)] [&_strong]:font-semibold [&_strong]:text-[var(--ink)] [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1"
            dangerouslySetInnerHTML={{ __html: chunk.raw }}
          />
        );
      })}
    </div>
  );
}

// Pure React QuizPrompt component
export function QuizPrompt({ question = "" }: { question?: string }) {
  const [title, ...rest] = String(question).split("\n");
  const code = rest.join("\n").trim();

  return (
    <div className="space-y-3">
      <strong className="text-sm font-semibold text-[var(--ink)] block leading-snug">
        {title}
      </strong>
      {code ? <CodeBlock code={code} /> : null}
    </div>
  );
}

// Backward compatibility helper
export function answerHtml(item: any): string {
  if (!item) return "";
  if (item.source === "you") {
    return `<p>${String(item.a || "").replaceAll("\n", "<br>")}</p>`;
  }
  return String(item.a || "");
}

// Backward compatibility component alias
export const HtmlBlock = ({ html }: { html: string }) => {
  return <RichAnswer content={html} />;
};
