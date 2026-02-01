"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Image from "next/image";

export function VerticalNav() {
    const pathname = usePathname();
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted || pathname === "/") return null;

    const isDark = resolvedTheme === "dark";
    const logoSrc = isDark ? "/brand/logo-dark-burgundy.png" : "/brand/logo-light-orange.png";

    const navLinks = [
        { name: "PHILOSOPHY", href: "/philosophy" },
        { name: "WORKS", href: "/works" },
        { name: "CONTACT", href: "/contact" },
    ];

    return (
        <>
            {/* Left Sidebar: Branding */}
            <div className="fixed left-0 top-0 h-screen w-[5%] min-w-[60px] border-r border-white/10 flex flex-col items-center justify-between py-12 z-50 theme-bg">
                <div className="flex flex-col items-center gap-12">
                    {/* Logo as a seal at the top */}
                    <Link href="/" className="transition-transform hover:scale-110">
                        <Image
                            src={logoSrc}
                            alt="Whiskey Labs Logo"
                            width={40}
                            height={40}
                            className="object-contain"
                        />
                    </Link>

                    <div className="flex flex-col items-center gap-8 -rotate-180 [writing-mode:vertical-lr]">
                        <Link
                            href="/"
                            className="text-xs font-mono uppercase tracking-[0.4em] theme-text-primary hover:text-[#FF4500] transition-colors whitespace-nowrap"
                        >
                            WHISKEY LABS
                        </Link>
                    </div>
                </div>
                <div className="text-[10px] font-mono theme-text-subtle vertical-text py-4">
                    v0.2.0
                </div>
            </div>

            {/* Right Sidebar: Navigation */}
            <div className="fixed right-0 top-0 h-screen w-[5%] min-w-[60px] border-l border-white/10 flex flex-col items-center justify-center z-50 theme-bg">
                <div className="flex flex-col items-center gap-16">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="relative group py-4"
                            >
                                <span
                                    className={`text-xs font-mono uppercase tracking-[0.3em] [writing-mode:vertical-lr] transition-colors duration-300 ${isActive ? "text-[#FF4500]" : "theme-text-muted group-hover:theme-text-primary"
                                        }`}
                                >
                                    {link.name}
                                </span>
                                {isActive && (
                                    <motion.div
                                        layoutId="active-indicator"
                                        className="absolute -right-2 top-0 bottom-0 w-0.5 bg-[#FF4500]"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
