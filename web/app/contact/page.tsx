"use client";

import { ThemeSwitch } from "@/components/ThemeSwitch";
import Link from "next/link";
import { X, ArrowRight } from "lucide-react";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-[#1a0a0a] relative">
            {/* Header/Nav Overlay */}
            <div className="absolute top-0 left-0 w-full p-6 md:p-12 flex justify-between items-start z-10">
                <Link href="/">
                    <h1 className="text-xl font-bold tracking-tighter text-white">
                        <span>Whiskey</span>
                        <span className="text-white/40">Labs</span>
                    </h1>
                </Link>

                <div className="flex items-center gap-6">
                    <ThemeSwitch />
                    <Link
                        href="/"
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 text-white/70" />
                    </Link>
                </div>
            </div>

            {/* Split Pane Layout */}
            <div className="flex flex-col md:flex-row w-full min-h-screen">
                {/* Left Pane - Minimalist */}
                <div className="md:w-1/2 p-12 pt-24 md:pt-12 flex items-center justify-center border-r border-dashed border-white/5">
                    <h2 className="text-5xl md:text-7xl font-bold text-white/10">
                        Get in
                        <br />
                        Touch
                    </h2>
                </div>

                {/* Right Pane - Form */}
                <div className="md:w-1/2 p-12 flex items-center">
                    <form className="w-full max-w-md space-y-12">
                        <div className="space-y-2">
                            <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#FF4500]">
                                Name
                            </label>
                            <input
                                type="text"
                                placeholder="YOUR NAME"
                                className="w-full bg-transparent border-b border-white/20 py-4 text-xl text-white focus:outline-none focus:border-[#FF4500] transition-colors uppercase placeholder:text-white/20 font-mono"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#FF4500]">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="EMAIL ADDRESS"
                                className="w-full bg-transparent border-b border-white/20 py-4 text-xl text-white focus:outline-none focus:border-[#FF4500] transition-colors uppercase placeholder:text-white/20 font-mono"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#FF4500]">
                                Message
                            </label>
                            <textarea
                                placeholder="YOUR MESSAGE"
                                rows={1}
                                className="w-full bg-transparent border-b border-white/20 py-4 text-xl text-white focus:outline-none focus:border-[#FF4500] transition-colors uppercase placeholder:text-white/20 font-mono resize-none"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="fixed bottom-8 right-8 md:bottom-12 md:right-12 bg-[#FF4500] hover:bg-[#FF5722] text-white rounded-full p-5 shadow-lg shadow-[#FF4500]/30 transition-all hover:scale-105 flex items-center justify-center"
                            aria-label="Submit"
                        >
                            <ArrowRight className="w-6 h-6" />
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}
