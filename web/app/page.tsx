"use client";

import { Grid, GridCell } from "@/components/Layout/GridSystem";
import ThreeRing from "@/components/Hero/ThreeRing";
import { ThemeSwitch } from "@/components/ThemeSwitch";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="theme-bg min-h-screen transition-colors duration-300">
      <Grid>
        {/* ROW 1: Navigation */}
        {/* Col 1: PHILOSOPHY */}
        <GridCell className="flex items-center justify-start py-4">
          <Link
            href="#philosophy"
            className="text-xs font-mono uppercase tracking-[0.2em] theme-text-muted hover:text-[#FF4500] transition-colors"
          >
            PHILOSOPHY
          </Link>
        </GridCell>

        {/* Col 2: WORKS */}
        <GridCell className="flex items-center justify-center py-4">
          <Link
            href="#works"
            className="text-xs font-mono uppercase tracking-[0.2em] theme-text-muted hover:text-[#FF4500] transition-colors"
          >
            WORKS
          </Link>
        </GridCell>

        {/* Col 3: CONTACT + Theme Toggle */}
        <GridCell className="flex items-center justify-between py-4">
          <Link
            href="/contact"
            className="text-xs font-mono uppercase tracking-[0.2em] theme-text-muted hover:text-[#FF4500] transition-colors"
          >
            CONTACT
          </Link>
          <ThemeSwitch />
        </GridCell>

        {/* ROW 2 */}
        {/* Col 1: SYS CONFIG + Brand Title */}
        <GridCell className="flex flex-col justify-between relative" rowSpan={2}>
          {/* Vertical SYS CONFIG text */}
          <div className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 origin-center">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] theme-text-subtle whitespace-nowrap">
              SYS. CONFIG V2.0
            </span>
          </div>

          {/* Brand Name */}
          <div className="mt-auto pb-8">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-none">
              <span className="theme-text-primary">Whiskey</span>
              <br />
              <span className="theme-text-subtle">Labs</span>
            </h1>
            {/* Pagination indicator */}
            <div className="flex items-center gap-2 mt-6">
              <div className="w-8 h-0.5 bg-[#FF4500]"></div>
              <div className="w-2 h-2 rounded-full bg-white/20 dark:bg-white/20"></div>
              <div className="w-2 h-2 rounded-full bg-white/20 dark:bg-white/20"></div>
            </div>
          </div>
        </GridCell>

        {/* Col 2: Centerpiece (spans 2 rows) */}
        <GridCell className="p-0 overflow-hidden relative" rowSpan={2}>
          <ThreeRing />
        </GridCell>

        {/* Col 3: Decorative dot */}
        <GridCell className="flex items-start justify-end">
          <div className="w-2 h-2 rounded-full bg-[#FF4500]"></div>
        </GridCell>

        {/* ROW 3: Manifesto */}
        <GridCell className="flex flex-col justify-end items-end text-right">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#FF4500] mb-3">
            MANIFESTO
          </span>
          <p className="text-sm md:text-base theme-text-muted max-w-[280px] leading-relaxed mb-4">
            Redefining the boundaries of modern engineering through deliberate design.
            <span className="theme-text-primary"> We build the digital engines of tomorrow</span> with precision and aesthetic intent.
          </p>
          <Link
            href="#manifesto"
            className="inline-flex items-center gap-2 text-[#FF4500] text-xs uppercase tracking-widest hover:gap-3 transition-all"
          >
            READ MORE <ArrowRight className="w-3 h-3" />
          </Link>
        </GridCell>
      </Grid>
    </main>
  );
}
