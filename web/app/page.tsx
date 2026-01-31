"use client";

import { Grid, GridCell } from "@/components/Layout/GridSystem";
import ThreeRing from "@/components/Hero/ThreeRing";
import { ThemeSwitch } from "@/components/ThemeSwitch";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Home() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : true;
  const logoSrc = isDark ? "/brand/logo-dark-burgundy.png" : "/brand/logo-light-orange.png";

  return (
    <main className="theme-bg min-h-screen transition-colors duration-300">
      {/* Navigation Bar - Full Width */}
      <nav className="w-full flex items-center justify-between px-6 py-4 border-b grid-line-dashed">
        {/* Left: Menu Items */}
        <div className="flex items-center gap-12">
          <Link
            href="#philosophy"
            className="text-xs font-mono uppercase tracking-[0.2em] theme-text-muted hover:text-[#FF4500] transition-colors"
          >
            PHILOSOPHY
          </Link>
          <Link
            href="#works"
            className="text-xs font-mono uppercase tracking-[0.2em] theme-text-muted hover:text-[#FF4500] transition-colors"
          >
            WORKS
          </Link>
          <Link
            href="/contact"
            className="text-xs font-mono uppercase tracking-[0.2em] theme-text-muted hover:text-[#FF4500] transition-colors"
          >
            CONTACT
          </Link>
        </div>

        {/* Right: Theme Toggle */}
        <ThemeSwitch />
      </nav>

      <Grid>

        {/* ROW 2 */}
        {/* Col 1: SYS CONFIG + Brand Title */}
        <GridCell className="flex flex-col justify-between relative" rowSpan={2}>
          {/* Vertical SYS CONFIG text */}
          <div className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 origin-center">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] theme-text-subtle whitespace-nowrap">
              SYS. CONFIG V2.0
            </span>
          </div>

          {/* Brand Name with Dog Logo */}
          <div className="mt-auto pb-8">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-none">
              <span className="theme-text-primary">Whiskey</span>
            </h1>
            {/* Labs + Dog Logo Row */}
            <div className="flex items-end gap-4">
              <span className="text-6xl md:text-7xl lg:text-8xl font-bold theme-text-subtle leading-none">
                Labs
              </span>
              {/* Dog Logo - using manual PNG versions with match backgrounds */}
              <Image
                src={logoSrc}
                alt="Whiskey Labs Dog Logo"
                width={80}
                height={80}
                className="w-[60px] h-[60px] md:w-[70px] md:h-[70px] lg:w-[80px] lg:h-[80px] object-contain mb-1"
              />
            </div>
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
