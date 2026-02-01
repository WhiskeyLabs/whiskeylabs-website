"use client";

import { ThemeSwitch } from "@/components/ThemeSwitch";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Image from "next/image";
import PollinationPulse from "@/components/Contact/PollinationPulse";

export default function ContactPage() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [status, setStatus] = useState<"idle" | "transmitting" | "success" | "error">("idle");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("transmitting");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setStatus("success");
                setFormData({ name: "", email: "", message: "" });
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error(error);
            setStatus("error");
        }
    };

    const isDark = mounted ? resolvedTheme === "dark" : true;
    const logoSrc = isDark ? "/brand/logo-dark-burgundy.png" : "/brand/logo-light-orange.png";

    return (
        <main className="min-h-screen theme-bg relative flex flex-col md:flex-row transition-colors duration-300">
            {/* Split Pane Layout */}
            <div className="flex flex-col md:flex-row w-full flex-grow">
                {/* Left Pane - Branding & Sculpture */}
                <div className="md:w-1/2 p-12 pt-24 md:pt-12 flex flex-col justify-between border-r border-dashed border-white/5 relative">
                    {/* 3D Sculpture: The Pollination Pulse */}
                    <div className="flex-grow flex items-center justify-center relative overflow-hidden h-[400px] md:h-auto">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <PollinationPulse />
                        </div>
                    </div>

                    {/* Bottom Left Branding (Matches Homepage Style) */}
                    <div className="mt-auto">
                        <h1 className="text-4xl md:text-5xl font-bold leading-none">
                            <span className="theme-text-primary">Whiskey</span>
                        </h1>
                        <div className="flex items-end gap-3">
                            <span className="text-4xl md:text-5xl font-bold theme-text-subtle leading-none">
                                Labs
                            </span>
                            <Image
                                src={logoSrc}
                                alt="Whiskey Labs Logo"
                                width={50}
                                height={50}
                                className="w-10 h-10 md:w-12 md:h-12 object-contain mb-1"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Pane - Form */}
                <div className="md:w-1/2 p-12 pt-16 flex items-center bg-black/5">
                    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-12">
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold theme-text-primary tracking-tight">Let's build engines.</h3>
                            <p className="text-sm theme-text-subtle font-mono uppercase tracking-widest">Initialization sequence started...</p>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#FF4500]">
                                Identity
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="YOUR NAME"
                                className="w-full bg-transparent border-b border-white/20 py-4 text-xl text-white focus:outline-none focus:border-[#FF4500] transition-colors uppercase placeholder:text-white/20 font-mono"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#FF4500]">
                                Transmission Channel
                            </label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="EMAIL ADDRESS"
                                className="w-full bg-transparent border-b border-white/20 py-4 text-xl text-white focus:outline-none focus:border-[#FF4500] transition-colors uppercase placeholder:text-white/20 font-mono"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#FF4500]">
                                Payload
                            </label>
                            <textarea
                                required
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                placeholder="YOUR MESSAGE"
                                rows={1}
                                className="w-full bg-transparent border-b border-white/20 py-4 text-xl text-white focus:outline-none focus:border-[#FF4500] transition-colors uppercase placeholder:text-white/20 font-mono resize-none overflow-hidden"
                            />
                        </div>

                        {/* Submit Button & Status */}
                        <div className="flex flex-col items-end gap-4 pt-8">
                            {status === "success" && (
                                <p className="text-sm font-mono text-green-500 uppercase tracking-widest">Transmission Successful</p>
                            )}
                            {status === "error" && (
                                <p className="text-sm font-mono text-red-500 uppercase tracking-widest">Transmission Failed</p>
                            )}

                            <button
                                type="submit"
                                disabled={status === "transmitting"}
                                className="group bg-[#FF4500] hover:bg-[#FF5722] text-white rounded-full px-8 py-4 shadow-lg shadow-[#FF4500]/30 transition-all hover:scale-105 flex items-center gap-3 font-mono text-sm tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status === "transmitting" ? "TRANSMITTING..." : "TRANSMIT"}
                                <ArrowRight className={`w-5 h-5 ${status === "transmitting" ? "" : "group-hover:translate-x-1"} transition-transform`} />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}
