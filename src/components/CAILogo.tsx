"use client";

import Link from "next/link";

interface CAILogoProps {
  collapsed?: boolean;
  href?: string;
  className?: string;
}

export function CAILogo({ collapsed = false, href = "/dashboard", className = "" }: CAILogoProps) {
  return (
    <Link
      href={href}
      className={`group flex items-center gap-3 transition-opacity hover:opacity-90 ${className}`}
      aria-label="CrackAnyInterview Home"
    >
      {/* Precision Monochrome SVG Logo Mark */}
      <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-700/80 shadow-md shadow-black group-hover:border-zinc-500 transition-colors">
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
        >
          {/* Hex / Code Brackets in Silver */}
          <path
            d="M9 11L4.5 16L9 21"
            stroke="#a1a1aa"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M23 11L27.5 16L23 21"
            stroke="#a1a1aa"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Center Monogram C in Pure White */}
          <path
            d="M18.5 12H14.5C13.1193 12 12 13.1193 12 14.5V17.5C12 18.8807 13.1193 20 14.5 20H18.5"
            stroke="#ffffff"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {!collapsed && (
        <div className="flex flex-col leading-none">
          <span className="text-base font-extrabold tracking-tight text-white">
            CrackAny<span className="text-zinc-300">Interview</span>
          </span>
          <span className="text-[10px] font-medium tracking-wide text-zinc-500 mt-1">
            SDE Interview Prep
          </span>
        </div>
      )}
    </Link>
  );
}
