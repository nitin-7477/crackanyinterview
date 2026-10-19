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
      className={`group flex items-center gap-2.5 transition-all ${className}`}
      aria-label="CrackAnyInterview Home"
    >
      {/* Unique CAI Hex / Cube Monogram */}
      <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-950 border border-zinc-700/80 shadow-[0_0_15px_rgba(245,158,11,0.15)] group-hover:border-amber-500/60 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.25)] transition-all">
        {/* Monogram */}
        <span className="font-mono text-[13px] font-black tracking-tighter text-white flex items-center">
          <span className="text-amber-400">C</span>
          <span className="text-zinc-200">A</span>
          <span className="text-amber-500">I</span>
        </span>
        {/* Subtle accent dot */}
        <span className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_#fbbf24]" />
      </div>

      {!collapsed && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1.5">
            <span className="text-[15px] font-extrabold tracking-tight text-white group-hover:text-zinc-100 transition-colors">
              CrackAny<span className="text-amber-400">Interview</span>
            </span>
            <span className="rounded bg-amber-400/10 border border-amber-400/20 px-1 py-0.5 text-[9px] font-bold uppercase tracking-wider text-amber-400">
              FREE
            </span>
          </div>
          <span className="text-[10px] font-medium text-zinc-400 mt-0.5">
            Frontend & Mobile SDE Prep
          </span>
        </div>
      )}
    </Link>
  );
}
