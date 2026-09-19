"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, FileText, ArrowRight } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg text-slate-900 tracking-tight">
                Resume<span className="text-sky-600">AI</span>
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-sky-100 text-sky-800 uppercase tracking-wider">
                Gemini
              </span>
            </div>
            <p className="text-[10px] text-slate-500 -mt-1 hidden sm:block">
              ATS-Optimized Builder
            </p>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link href="/#templates" className="hover:text-sky-600 transition-colors">
            Templates
          </Link>
          <Link href="/#features" className="hover:text-sky-600 transition-colors">
            Features
          </Link>
          <Link href="/#how-it-works" className="hover:text-sky-600 transition-colors">
            How It Works
          </Link>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <Link
            href="/builder"
            className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs sm:text-sm font-semibold shadow-sm hover:shadow transition-all hover:gap-2 active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-200 shrink-0" />
            <span className="hidden xs:inline">Create My Resume</span>
            <span className="xs:hidden">Build</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
          </Link>
        </div>
      </div>
    </header>
  );
}
