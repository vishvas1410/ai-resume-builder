import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Link from "next/link";
import { Sparkles, Check, FileCheck, Cpu, ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex-1 flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="font-extrabold text-base text-slate-900 tracking-tight">
                  Resume<span className="text-sky-600">AI</span>
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-sky-100 text-sky-800 uppercase tracking-wider">
                  Open Source
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1 max-w-sm">
                Built with Next.js 14 App Router, Tailwind CSS, and Google Gemini API.
                No databases, no tracking, 100% client-side privacy.
              </p>
            </div>

            <div className="flex items-center gap-6 text-xs text-slate-600 font-medium">
              <Link href="/builder" className="hover:text-sky-600 transition-colors">
                Open Resume Builder
              </Link>
              <Link href="/#templates" className="hover:text-sky-600 transition-colors">
                Templates
              </Link>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sky-600 transition-colors"
              >
                Get Gemini API Key
              </a>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
            <p>© {new Date().getFullYear()} ResumeAI Builder. All rights reserved.</p>
            <p>Runs entirely in your browser. All resume data is stored locally in React state.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
