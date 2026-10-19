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
      className={`group flex items-center gap-2.5 transition-opacity hover:opacity-90 ${className}`}
      aria-label="CrackAnyInterview Home"
    >
      {/* TUF-style Monogram Badge: [ CAI ] */}
      <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-700/80 shadow-inner group-hover:border-zinc-500 transition-colors">
        <span className="text-[12px] font-black tracking-tight text-white flex items-center">
          <span className="text-amber-400">C</span>
          <span className="text-white">A</span>
          <span className="text-zinc-300">I</span>
        </span>
        {/* Subtle top glow line */}
        <div className="absolute top-0 inset-x-1 h-[1px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
      </div>

      {!collapsed && (
        <div className="flex flex-col leading-none">
          <span className="text-[15px] font-bold tracking-tight text-white flex items-center gap-0.5">
            crack<span className="text-zinc-400">any</span><span className="text-amber-400">interview</span>
          </span>
          <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500 mt-0.5">
            SDE Prep Platform
          </span>
        </div>
      )}
    </Link>
  );
}
