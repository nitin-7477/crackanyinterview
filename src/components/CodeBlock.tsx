"use client";

import { useState } from "react";
import { Play, Copy, Check, Terminal, X, CornerDownRight } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

interface ConsoleEntry {
  type: "log" | "warn" | "error" | "result";
  text: string;
}

function formatArg(arg: any): string {
  if (arg === null) return "null";
  if (arg === undefined) return "undefined";
  if (typeof arg === "function") return arg.toString();
  if (typeof arg === "object") {
    try {
      return JSON.stringify(arg, null, 2);
    } catch {
      return String(arg);
    }
  }
  return String(arg);
}

// Tokenize JavaScript code for syntax coloring
function highlightTokens(rawCode: string) {
  const JS_KEYWORDS = new Set(
    "let const var function return if else for while do switch case break continue new class extends super this typeof instanceof in of try catch finally throw async await yield import export from default true false null undefined".split(
      " "
    )
  );

  const tokens: Array<{ type: string; value: string }> = [];
  let index = 0;

  while (index < rawCode.length) {
    // Comments
    if (rawCode.startsWith("//", index)) {
      const end = rawCode.indexOf("\n", index);
      const stop = end === -1 ? rawCode.length : end;
      tokens.push({ type: "comment", value: rawCode.slice(index, stop) });
      index = stop;
      continue;
    }
    if (rawCode.startsWith("/*", index)) {
      const end = rawCode.indexOf("*/", index + 2);
      const stop = end === -1 ? rawCode.length : end + 2;
      tokens.push({ type: "comment", value: rawCode.slice(index, stop) });
      index = stop;
      continue;
    }

    // Strings
    const quote = rawCode[index];
    if (quote === '"' || quote === "'" || quote === "`") {
      let cursor = index + 1;
      while (cursor < rawCode.length) {
        if (rawCode[cursor] === "\\") {
          cursor += 2;
          continue;
        }
        if (rawCode[cursor] === quote) {
          cursor += 1;
          break;
        }
        cursor += 1;
      }
      tokens.push({ type: "string", value: rawCode.slice(index, cursor) });
      index = cursor;
      continue;
    }

    // Numbers
    const before = index === 0 ? "" : rawCode[index - 1];
    if (
      /\d/.test(rawCode[index]) &&
      (index === 0 || /[\s([{\],+\-*=<>!&|?:]/.test(before) || before === "/")
    ) {
      const match = rawCode.slice(index).match(/^\d[\d._]*/);
      if (match) {
        tokens.push({ type: "number", value: match[0] });
        index += match[0].length;
        continue;
      }
    }

    // Words / Keywords / Identifiers
    if (/[A-Za-z_$]/.test(rawCode[index])) {
      const match = rawCode.slice(index).match(/^[A-Za-z_$][\w$]*/);
      if (match) {
        const word = match[0];
        const isCall = /^\s*\(/.test(rawCode.slice(index + word.length));
        if (JS_KEYWORDS.has(word)) {
          tokens.push({ type: "key", value: word });
        } else if (isCall || word === "console") {
          tokens.push({ type: "fn", value: word });
        } else {
          tokens.push({ type: "id", value: word });
        }
        index += word.length;
        continue;
      }
    }

    tokens.push({ type: "plain", value: rawCode[index] });
    index += 1;
  }

  return tokens;
}

export function CodeBlock({
  code,
  language = "JavaScript",
  className = "",
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [consoleOpen, setConsoleOpen] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState<ConsoleEntry[]>([]);
  const [hasError, setHasError] = useState(false);

  const cleanCode = code.trim();

  // Copy code handler
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cleanCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Fallback
    }
  };

  // Run code handler (in-browser sandbox)
  const handleRun = () => {
    const logs: ConsoleEntry[] = [];
    setHasError(false);

    const originalLog = console.log;
    const originalWarn = console.warn;
    const originalError = console.error;

    try {
      console.log = (...args: any[]) => {
        logs.push({ type: "log", text: args.map(formatArg).join(" ") });
      };
      console.warn = (...args: any[]) => {
        logs.push({ type: "warn", text: "[warn] " + args.map(formatArg).join(" ") });
      };
      console.error = (...args: any[]) => {
        logs.push({ type: "error", text: "[error] " + args.map(formatArg).join(" ") });
      };

      // Sandboxed execution
      const runner = new Function(cleanCode);
      const result = runner();

      if (result !== undefined && logs.length === 0) {
        logs.push({ type: "result", text: "↳ " + formatArg(result) });
      }

      if (logs.length === 0) {
        logs.push({
          type: "result",
          text: "Code executed cleanly (no console.log output)",
        });
      }

      setConsoleLogs(logs);
      setConsoleOpen(true);
    } catch (err: any) {
      setHasError(true);
      setConsoleLogs([
        {
          type: "error",
          text: String(err?.message || err),
        },
      ]);
      setConsoleOpen(true);
    } finally {
      console.log = originalLog;
      console.warn = originalWarn;
      console.error = originalError;
    }
  };

  const tokens = highlightTokens(cleanCode);

  return (
    <div
      className={`my-3 overflow-hidden rounded-xl border border-[var(--line)] bg-[#0d0d10] font-mono shadow-sm ${className}`}
    >
      {/* Code Header Bar */}
      <div className="flex h-9 items-center justify-between border-b border-[var(--line)] bg-[#121215] px-3.5 select-none">
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-zinc-500">&lt;/&gt;</span>
          <span className="text-[11px] font-medium text-zinc-300">{language}</span>
        </div>

        <div className="flex items-center gap-1.5">
          {/* ▶ Run Code Button */}
          <button
            type="button"
            onClick={handleRun}
            className="flex items-center gap-1 rounded-lg border border-zinc-750 bg-zinc-800 px-2.5 py-1 text-[11px] font-semibold text-zinc-200 hover:border-zinc-500 hover:bg-zinc-700 hover:text-white transition active:scale-95"
            title="Run this code in browser console"
          >
            <Play className="h-3 w-3 fill-current" />
            <span>Run</span>
          </button>

          {/* Copy Button */}
          <button
            type="button"
            onClick={handleCopy}
            className="flex h-6 w-6 items-center justify-center rounded-lg border border-zinc-800 bg-[#0d0d10] text-zinc-400 hover:border-zinc-700 hover:text-zinc-200 transition"
            title={copied ? "Copied to clipboard" : "Copy code"}
            aria-label="Copy code"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-zinc-100" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Code Syntax Highlighted Display */}
      <pre className="p-4 text-xs leading-relaxed text-zinc-200 overflow-x-auto selection:bg-zinc-800 selection:text-white">
        <code>
          {tokens.map((tok, i) => {
            let colorClass = "text-zinc-200";
            if (tok.type === "comment") colorClass = "text-zinc-500 italic";
            else if (tok.type === "string") colorClass = "text-zinc-300 font-medium";
            else if (tok.type === "number") colorClass = "text-zinc-100 font-semibold";
            else if (tok.type === "key") colorClass = "text-white font-bold";
            else if (tok.type === "fn") colorClass = "text-zinc-100 font-medium";

            return (
              <span key={i} className={colorClass}>
                {tok.value}
              </span>
            );
          })}
        </code>
      </pre>

      {/* Interactive In-Card Terminal Drawer */}
      {consoleOpen && (
        <div className="border-t border-zinc-800 bg-[#08080a] text-xs">
          <div className="flex items-center justify-between border-b border-zinc-800/80 px-3.5 py-1.5 bg-[#0e0e12]">
            <div className="flex items-center gap-1.5">
              <Terminal className="h-3 w-3 text-zinc-400" />
              <span
                className={`text-[10px] font-semibold uppercase tracking-wider font-mono ${
                  hasError ? "text-zinc-400 font-bold" : "text-zinc-400"
                }`}
              >
                {hasError ? "Runtime Error" : "Terminal Console"}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setConsoleOpen(false)}
              className="flex items-center gap-1 text-[10px] text-zinc-400 hover:text-zinc-200 px-1.5 py-0.5 rounded hover:bg-zinc-800 transition"
              title="Close console"
            >
              <X className="h-3 w-3" />
              <span>Clear</span>
            </button>
          </div>

          <div className="p-3.5 space-y-1 max-h-48 overflow-y-auto font-mono text-[11px] leading-relaxed">
            {consoleLogs.map((entry, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-2 ${
                  entry.type === "error"
                    ? "text-zinc-300 border-l-2 border-zinc-500 pl-2"
                    : entry.type === "result"
                    ? "text-zinc-300"
                    : "text-zinc-200"
                }`}
              >
                <CornerDownRight className="h-3 w-3 mt-0.5 text-zinc-600 shrink-0" />
                <span className="whitespace-pre-wrap break-all">{entry.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
