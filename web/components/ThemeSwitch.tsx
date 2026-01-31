"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeSwitch() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="w-8 h-8 rounded-full bg-white/10" />
        );
    }

    const isDark = resolvedTheme === "dark";

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="p-2 rounded-full hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-black/10 transition-colors"
            aria-label="Toggle Theme"
        >
            {isDark ? (
                <Sun className="w-4 h-4 text-white/70" />
            ) : (
                <Moon className="w-4 h-4 text-[#1a0a0a]/70" />
            )}
        </button>
    );
}
