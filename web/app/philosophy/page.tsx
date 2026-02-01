"use client";

import { motion } from "framer-motion";
import { SculptureRing } from "@/components/Philosophy/SculptureRing";
import { Figma, Code2, Cpu } from "lucide-react";

// Helper for pulsing connection lines
function TetherLine({ start, end, delay }: { start: { x: string; y: string }, end: { x: string; y: string }, delay: number }) {
    return (
        <motion.line
            x1={start.x}
            y1={start.y}
            x2={end.x}
            y2={end.y}
            stroke="url(#pulse-grad)"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
                pathLength: [0, 1, 1],
                opacity: [0, 1, 0]
            }}
            transition={{
                duration: 3,
                repeat: Infinity,
                delay,
                ease: "easeInOut"
            }}
        />
    );
}

// Helper for bouncing UI nodes
function TetheredNode({ initialX, initialY, delay, children, className }: { initialX: string, initialY: string, delay: number, children: React.ReactNode, className?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: `calc(${initialX} - 20px)`, y: `calc(${initialY} - 20px)` }}
            animate={{
                opacity: 1,
                x: [initialX, `calc(${initialX} + 10px)`, initialX],
                y: [initialY, `calc(${initialY} - 15px)`, initialY]
            }}
            transition={{
                opacity: { duration: 0.8, delay },
                x: { duration: 4, repeat: Infinity, ease: "easeInOut", delay },
                y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay }
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export default function PhilosophyPage() {
    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-12 overflow-hidden">
            {/* Background EXECUTION Text */}
            <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none opacity-[0.03]">
                <h1 className="text-[25vw] font-bold tracking-tighter theme-text-primary translate-y-[-10%]">
                    EXECUTION
                </h1>
            </div>

            {/* Header Content */}
            <div className="relative z-10 text-center mb-16 px-4">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-xs font-mono uppercase tracking-[0.4em] text-[#FF4500] mb-4 block"
                >
                    DESIGN AS CODE_
                </motion.span>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 max-w-4xl mx-auto leading-tight"
                >
                    Where aesthetics meet <span className="text-[#FF4500]">architecture.</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-lg md:text-xl theme-text-muted max-w-2xl mx-auto leading-relaxed"
                >
                    We don’t hand off designs; we compile them. Bridging the gap between
                    pixel-perfect aesthetics and robust engineering.
                </motion.p>
            </div>

            {/* 3D Sculpture Centerpiece - Constrained to bottom area */}
            <div className="relative w-full max-w-2xl aspect-square flex items-center justify-center -translate-y-8">
                <div className="absolute inset-0 z-0">
                    <SculptureRing />
                </div>

                {/* Dynamic Connection Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="pulse-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#FF4500" stopOpacity="0" />
                            <stop offset="50%" stopColor="#FF4500" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#FF4500" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {/* Design Source Line (to far left) */}
                    <TetherLine start={{ x: "15%", y: "45%" }} end={{ x: "50%", y: "50%" }} delay={0} />
                    {/* Production Logic Line (to far right) */}
                    <TetherLine start={{ x: "85%", y: "65%" }} end={{ x: "50%", y: "50%" }} delay={0.5} />
                    {/* CICD Line (to very bottom) */}
                    <TetherLine start={{ x: "50%", y: "98%" }} end={{ x: "50%", y: "50%" }} delay={1} />
                </svg>

                {/* Floating UI Nodes - Scaled down */}
                <TetheredNode
                    initialX="-32vw"
                    initialY="-20px"
                    delay={0}
                    className="absolute z-10"
                >
                    {/* Design Source window - far left near 'E' */}
                    <div className="w-52 glass-panel p-4 border border-[#FF4500]/20 rounded-xl relative -translate-y-12">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 bg-[#FF4500]/10 rounded-lg">
                                    <Figma className="w-4 h-4 text-[#FF4500]" />
                                </div>
                                <span className="font-bold text-xs theme-text-primary tracking-wide">Design Source</span>
                            </div>
                            <span className="text-[9px] bg-white/5 px-1.5 py-0.5 rounded border border-white/10 text-white/40 uppercase">Figma</span>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-[10px] font-mono">
                                <span className="theme-text-subtle">Token ID</span>
                                <span className="theme-text-primary">color.primary</span>
                            </div>
                            <div className="flex justify-between text-[10px] font-mono">
                                <span className="theme-text-subtle">Status</span>
                                <span className="text-green-500">• Live</span>
                            </div>
                        </div>
                    </div>
                </TetheredNode>

                <TetheredNode
                    initialX="32vw"
                    initialY="100px"
                    delay={0.5}
                    className="absolute z-10"
                >
                    {/* Production Logic window - far right below 'I' */}
                    <div className="w-52 glass-panel p-4 border border-[#FF4500]/20 rounded-xl relative">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 bg-[#FF4500]/10 rounded-lg">
                                    <Code2 className="w-4 h-4 text-[#FF4500]" />
                                </div>
                                <span className="font-bold text-xs theme-text-primary tracking-wide">Production Logic</span>
                            </div>
                            <span className="text-[9px] bg-white/5 px-1.5 py-0.5 rounded border border-white/10 text-white/40 uppercase">React</span>
                        </div>
                        <div className="bg-[#1a0a0a]/50 p-2.5 rounded font-mono text-[9px] text-white/70 overflow-hidden leading-snug">
                            <div className="text-pink-400">export const <span className="text-blue-400">Sculpture</span> = () =&gt; {"{"}</div>
                            <div className="pl-3 text-gray-500">// Renderer...</div>
                            <div className="pl-3"><span className="text-pink-400">return</span> &lt;<span className="text-blue-300">Canvas</span> /&gt;;</div>
                            <div>{"}"}</div>
                        </div>
                    </div>
                </TetheredNode>

                {/* Pipeline Monitor (Bottom Center) - Far below circle */}
                <TetheredNode
                    initialX="0px"
                    initialY="260px"
                    delay={1}
                    className="absolute z-10"
                >
                    <div className="min-w-[280px] bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-6 py-2.5 flex items-center justify-between relative shadow-xl shadow-[#FF4500]/5">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-[10px] font-mono tracking-widest text-white/60">CI/CD ACTIVE</span>
                        </div>
                        <div className="h-3 w-[1px] bg-white/10 mx-3"></div>
                        <div className="text-[10px] font-mono whitespace-nowrap">
                            <span className="text-white/40">Build: </span>
                            <span className="text-green-500">Success</span>
                        </div>
                    </div>
                </TetheredNode>
            </div>
        </div>
    );
}
