"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeSwitch() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Toggle Theme"
        >
            {theme === "dark" ? (
                <Sun className="w-4 h-4 text-white/70" />
            ) : (
                <Moon className="w-4 h-4 text-white/70" />
            )}
        </button>
    );
}
