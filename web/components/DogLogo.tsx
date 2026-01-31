"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface DogLogoProps {
    size?: number;
    className?: string;
}

export function DogLogo({ size = 40, className = "" }: DogLogoProps) {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Default to dark mode colors until mounted
    const strokeColor = mounted && resolvedTheme === "light" ? "#C5713D" : "#FFFFFF";

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 100 90"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Dog head outline - single continuous line art style */}
            <path
                d="M50 85
           C35 85 25 75 22 65
           C18 55 15 50 8 48
           C3 46 2 40 5 35
           C8 30 12 28 18 30
           C22 32 24 35 25 40
           C26 45 28 48 30 50
           L30 45
           C28 35 25 25 20 18
           C18 14 20 10 25 10
           C30 10 33 12 35 16
           C38 22 40 30 42 40
           L42 42
           C44 38 47 35 50 35
           C53 35 56 38 58 42
           L58 40
           C60 30 62 22 65 16
           C67 12 70 10 75 10
           C80 10 82 14 80 18
           C75 25 72 35 70 45
           L70 50
           C72 48 74 45 75 40
           C76 35 78 32 82 30
           C88 28 92 30 95 35
           C98 40 97 46 92 48
           C85 50 82 55 78 65
           C75 75 65 85 50 85Z"
                stroke={strokeColor}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />
            {/* Left ear inner */}
            <path
                d="M28 25
           C30 30 32 38 33 45
           C33 50 30 48 28 42
           C26 36 25 28 28 25Z"
                stroke={strokeColor}
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
            />
            {/* Right ear inner */}
            <path
                d="M72 25
           C70 30 68 38 67 45
           C67 50 70 48 72 42
           C74 36 75 28 72 25Z"
                stroke={strokeColor}
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
            />
            {/* Nose */}
            <ellipse
                cx="50"
                cy="62"
                rx="8"
                ry="6"
                stroke={strokeColor}
                strokeWidth="2.5"
                fill="none"
            />
            {/* Mouth/snout lines */}
            <path
                d="M50 68
           L50 72
           C48 74 45 76 42 76
           M50 72
           C52 74 55 76 58 76"
                stroke={strokeColor}
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
            />
            {/* Jowl curves */}
            <path
                d="M35 60
           C32 65 30 72 35 78"
                stroke={strokeColor}
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
            />
            <path
                d="M65 60
           C68 65 70 72 65 78"
                stroke={strokeColor}
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
            />
        </svg>
    );
}
