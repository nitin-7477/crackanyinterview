const ICONS = {
  dashboard: `<svg viewBox="0 0 24 24"><path d="M4 11 12 4l8 7v9H4z"/><path d="M10 20v-6h4v6"/></svg>`,
  javascript: `<svg viewBox="0 0 24 24"><path d="m8 8-4 4 4 4M16 8l4 4-4 4"/></svg>`,
  strings: `<svg viewBox="0 0 24 24"><path d="M5 7h14M5 12h14M5 17h8"/></svg>`,
  output: `<svg viewBox="0 0 24 24"><path d="M7 3h8l4 4v14H7z"/><path d="M15 3v4h4"/></svg>`,
  react: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="2"/><ellipse cx="12" cy="12" rx="9" ry="3.5"/><ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)"/></svg>`,
  "react-native": `<svg viewBox="0 0 24 24"><rect x="8" y="2" width="8" height="20" rx="2"/><path d="M11 18h2"/></svg>`,
  mock: `<svg viewBox="0 0 24 24"><path d="M8 20h8M12 16v4M7 3h10v9a5 5 0 0 1-10 0z"/></svg>`,
  progress: `<svg viewBox="0 0 24 24"><path d="M4 19V5M4 19h16"/><path d="m7 14 4-4 3 3 5-6"/></svg>`,
  bookmarks: `<svg viewBox="0 0 24 24"><path d="M7 4h10v16l-5-3-5 3z"/></svg>`,
  settings: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2"/></svg>`,
};

const TOPIC_ICONS = [
  `<svg viewBox="0 0 24 24"><path d="M13 2 4 14h7l-1 8 10-14h-7l0-6z"/></svg>`,
  `<svg viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.07 0l2.12-2.12a5 5 0 0 0-7.07-7.07L11 4.93"/><path d="M14 11a5 5 0 0 0-7.07 0L4.81 13.12a5 5 0 0 0 7.07 7.07L13 19.07"/></svg>`,
  `<svg viewBox="0 0 24 24"><path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5"/></svg>`,
  `<svg viewBox="0 0 24 24"><path d="M21 8 12 3 3 8l9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8"/></svg>`,
  `<svg viewBox="0 0 24 24"><path d="M12 3 4 12l8 9 8-9-8-9z"/></svg>`,
  `<svg viewBox="0 0 24 24"><path d="M21 12a9 9 0 1 1-2.64-6.36L21 8"/><path d="M21 3v5h-5"/></svg>`,
  `<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>`,
  `<svg viewBox="0 0 24 24"><path d="M5 9h14M5 15h14M9 5l-4 4 4 4M15 11l4 4-4 4"/></svg>`,
];

export const TOPIC_BADGES = {
  javascript: { short: "JS", tone: "js" },
  strings: { short: "St", tone: "strings" },
  output: { short: "Out", tone: "output" },
  react: { short: "Re", tone: "react" },
  "react-native": { short: "RN", tone: "native" },
};

export function TopicBadge({ id }) {
  const badge = TOPIC_BADGES[id];
  if (!badge) return null;
  return <span className={`topic-pill tone-${badge.tone}`}>{badge.short}</span>;
}

export function Icon({ name }) {
  return <span style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: ICONS[name] || ICONS.progress }} />;
}

export function TopicIcon({ index }) {
  return <span className="side-ico" aria-hidden="true" dangerouslySetInnerHTML={{ __html: TOPIC_ICONS[index % TOPIC_ICONS.length] }} />;
}
