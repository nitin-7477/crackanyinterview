export function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

const COPY_ICON = `<svg class="copy-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2"></rect><path d="M5 15V5a2 2 0 0 1 2-2h10"></path></svg><svg class="copied-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5 9.2 17 19 7"></path></svg>`;

const JS_KEYWORDS = new Set(
  "let const var function return if else for while do switch case break continue new class extends super this typeof instanceof in of try catch finally throw async await yield import export from default true false null undefined".split(
    " "
  )
);

export function highlightJs(escaped) {
  const text = escaped
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'");
  let html = "";
  let index = 0;
  const push = (kind, value) => {
    html += `<span class="tok-${kind}">${escapeHtml(value)}</span>`;
  };
  while (index < text.length) {
    if (text.startsWith("//", index)) {
      const end = text.indexOf("\n", index);
      const stop = end === -1 ? text.length : end;
      push("comment", text.slice(index, stop));
      index = stop;
      continue;
    }
    if (text.startsWith("/*", index)) {
      const end = text.indexOf("*/", index + 2);
      const stop = end === -1 ? text.length : end + 2;
      push("comment", text.slice(index, stop));
      index = stop;
      continue;
    }
    const quote = text[index];
    if (quote === '"' || quote === "'" || quote === "`") {
      let cursor = index + 1;
      while (cursor < text.length) {
        if (text[cursor] === "\\") {
          cursor += 2;
          continue;
        }
        if (text[cursor] === quote) {
          cursor += 1;
          break;
        }
        cursor += 1;
      }
      push("string", text.slice(index, cursor));
      index = cursor;
      continue;
    }
    if (text[index] === "/") {
      const previous = text.slice(0, index).trimEnd().slice(-1);
      if (!previous || "=([{,;:!&|?}".includes(previous)) {
        let cursor = index + 1;
        while (cursor < text.length && text[cursor] !== "\n") {
          if (text[cursor] === "\\") {
            cursor += 2;
            continue;
          }
          if (text[cursor] === "/") {
            cursor += 1;
            break;
          }
          cursor += 1;
        }
        while (cursor < text.length && /[a-z]/i.test(text[cursor])) cursor += 1;
        push("string", text.slice(index, cursor));
        index = cursor;
        continue;
      }
    }
    const before = index === 0 ? "" : text[index - 1];
    if (/\d/.test(text[index]) && (index === 0 || /[\s([{\],+\-*=<>!&|?:]/.test(before) || before === "/")) {
      const match = text.slice(index).match(/^\d[\d._]*/);
      push("number", match[0]);
      index += match[0].length;
      continue;
    }
    if (/[A-Za-z_$]/.test(text[index])) {
      const match = text.slice(index).match(/^[A-Za-z_$][\w$]*/);
      const word = match[0];
      const call = /^\s*\(/.test(text.slice(index + word.length));
      if (JS_KEYWORDS.has(word)) push("key", word);
      else if (call || word === "console") push("fn", word);
      else push("id", word);
      index += word.length;
      continue;
    }
    push("plain", text[index]);
    index += 1;
  }
  return html;
}

export function wrapCodeBlocks(html) {
  const withCode = html.replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/g, (_, code) => {
    return `<div class="code-panel">
      <div class="code-head">
        <span class="code-lang"><span aria-hidden="true">&lt;/&gt;</span> JavaScript</span>
        <button type="button" class="copy-btn" aria-label="Copy">${COPY_ICON}</button>
      </div>
      <pre><code>${highlightJs(code)}</code></pre>
    </div>`;
  });
  return withCode.replace(
    /<p><strong>Output<\/strong><\/p>\s*<p><code>([\s\S]*?)<\/code><\/p>/g,
    (_, output) => `<p class="output-label">Output:</p>
      <div class="output-panel">
        <button type="button" class="copy-btn" aria-label="Copy output">${COPY_ICON}</button>
        <pre><code>${output.replace(/<br\s*\/?>/gi, "\n")}</code></pre>
      </div>`
  );
}
