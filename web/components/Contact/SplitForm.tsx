"use strict";

import React from "react";
import { ArrowRight } from "lucide-react";

export function SplitForm() {
    return (
        <div className="flex flex-col md:flex-row w-full min-h-[calc(100vh-100px)]">
            {/* Left Pane - Minimalist/Empty or Title */}
            <div className="md:w-1/2 p-12 flex items-center justify-center md:justify-start">
                <h2 className="text-4xl md:text-6xl font-sans font-bold text-secondary-900 dark:text-secondary-100 opacity-20">
                    Get in Touch
                </h2>
            </div>

            {/* Right Pane - Form */}
            <div className="md:w-1/2 p-12 flex items-center bg-light_bg dark:bg-dark_bg relative">
                <form className="w-full max-w-lg space-y-12">
                    <div className="space-y-2 group">
                        <label className="text-xs uppercase tracking-widest text-secondary-500">Name</label>
                        <input
                            type="text"
                            placeholder="YOUR NAME"
                            className="w-full bg-transparent border-b border-secondary-300 dark:border-secondary-700 py-4 text-xl md:text-2xl text-secondary-900 dark:text-secondary-100 focus:outline-none focus:border-primary-500 transition-colors uppercase placeholder:text-secondary-300 dark:placeholder:text-secondary-700"
                        />
                    </div>

                    <div className="space-y-2 group">
                        <label className="text-xs uppercase tracking-widest text-secondary-500">Email</label>
                        <input
                            type="email"
                            placeholder="EMAIL ADDRESS"
                            className="w-full bg-transparent border-b border-secondary-300 dark:border-secondary-700 py-4 text-xl md:text-2xl text-secondary-900 dark:text-secondary-100 focus:outline-none focus:border-primary-500 transition-colors uppercase placeholder:text-secondary-300 dark:placeholder:text-secondary-700"
                        />
                    </div>

                    <div className="space-y-2 group">
                        <label className="text-xs uppercase tracking-widest text-secondary-500">Message</label>
                        <textarea
                            placeholder="YOUR MESSAGE"
                            rows={1}
                            className="w-full bg-transparent border-b border-secondary-300 dark:border-secondary-700 py-4 text-xl md:text-2xl text-secondary-900 dark:text-secondary-100 focus:outline-none focus:border-primary-500 transition-colors uppercase placeholder:text-secondary-300 dark:placeholder:text-secondary-700 resize-none overflow-hidden"
                        />
                    </div>

                    <button
                        type="submit"
                        className="fixed bottom-8 right-8 md:bottom-12 md:right-12 bg-primary-500 hover:bg-primary-600 text-white rounded-full p-6 shadow-lg shadow-primary-500/30 transition-all hover:scale-105"
                        aria-label="Submit"
                    >
                        <span className="sr-only">Submit</span>
                        <ArrowRight className="w-8 h-8" />
                    </button>
                </form>
            </div>
        </div>
    );
}
