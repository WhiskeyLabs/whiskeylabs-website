"use strict";

import Link from "next/link";

export function Navigation() {
    const links = [
        { href: "#abilities", label: "Abilities" },
        { href: "#how-it-works", label: "How it Works" },
        { href: "#philosophy", label: "Philosophy" },
    ];

    return (
        <nav className="flex items-center justify-center gap-6 md:gap-12 w-full h-full">
            {links.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    className="font-mono text-xs md:text-sm uppercase tracking-widest text-secondary-800 dark:text-secondary-200 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                >
                    {link.label}
                </Link>
            ))}
        </nav>
    );
}
