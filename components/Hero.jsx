"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Zap, Download } from "lucide-react";

export default function Hero() {
  const templatePreviews = [
    {
      id: "modern",
      name: "Modern Template",
      styleName: "Tech & Startup",
      description: "Sleek header banner, bold section dividers, and pill-badge skill tags.",
      badgeColor: "bg-sky-100 text-sky-700",
      accentBorder: "border-sky-500",
      layoutStyle: "border-t-4 border-sky-500",
      headerSample: "bg-sky-50 border-b border-sky-200",
    },
    {
      id: "classic",
      name: "Classic Template",
      styleName: "Executive & Corporate",
      description: "Traditional Harvard/Ivy League serif format favored by top recruiters.",
      badgeColor: "bg-slate-100 text-slate-800",
      accentBorder: "border-slate-800",
      layoutStyle: "border-t-4 border-slate-900 font-serif",
      headerSample: "border-b-2 border-slate-900 text-center",
    },
    {
      id: "minimal",
      name: "Minimal Template",
      styleName: "Designer & Creative",
      description: "High-contrast monochrome typography with generous, elegant whitespace.",
      badgeColor: "bg-zinc-100 text-zinc-700",
      accentBorder: "border-zinc-400",
      layoutStyle: "border-t-4 border-zinc-400 font-sans",
      headerSample: "border-b border-zinc-200",
    },
  ];

  return (
    <div className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-sky-100/60 via-indigo-50/30 to-transparent -z-10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200/80 text-sky-800 text-xs font-semibold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-sky-600 animate-spin-slow" />
            <span>Powered by Google Gemini 1.5 Flash</span>
            <span className="w-1.5 h-1.5 rounded-full bg-sky-600" />
            <span className="text-slate-500 font-normal">Free & No Login</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Build a professional resume in minutes using{" "}
            <span className="bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">
              AI
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Transform your raw experience into recruiter-approved, ATS-optimized bullet points.
            Craft high-impact summaries, select professional templates, and export print-ready PDFs instantly.
          </p>

          {/* CTA & Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/builder"
              className="w-full sm:w-auto px-8 py-3.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-base rounded-xl shadow-lg shadow-sky-600/25 hover:shadow-xl transition-all flex items-center justify-center gap-2 group active:scale-[0.99]"
            >
              <span>Create My Resume</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#templates"
              className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-base rounded-xl border border-slate-200 shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              Browse Templates
            </a>
          </div>

          {/* Benefit Pills */}
          <div className="pt-4 flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Recruiter-tested action verbs
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-sky-600" />
              100% ATS Compliant Layouts
            </span>
            <span className="flex items-center gap-1.5">
              <Download className="w-4 h-4 text-indigo-600" />
              Clean 1-Click PDF Export
            </span>
          </div>
        </div>

        {/* Template Showcase Previews */}
        <div id="templates" className="mt-16 md:mt-20 scroll-mt-24">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Select from 3 Polished Resume Templates
            </h2>
            <p className="text-slate-500 text-sm mt-1.5">
              Tailored for software engineers, product managers, designers, and corporate professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {templatePreviews.map((tpl) => (
              <div
                key={tpl.id}
                className="group relative bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-subtle hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Visual Resume Card Mockup */}
                <div className={`p-5 bg-slate-50 border-b border-slate-100 ${tpl.layoutStyle}`}>
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200/80 space-y-3 pointer-events-none select-none">
                    {/* Mock Header */}
                    <div className={`p-2.5 rounded ${tpl.headerSample}`}>
                      <div className="w-2/3 h-3 bg-slate-800 rounded mb-1.5" />
                      <div className="w-1/2 h-2 bg-slate-400 rounded mb-2" />
                      <div className="flex gap-2">
                        <div className="w-12 h-1.5 bg-slate-300 rounded" />
                        <div className="w-16 h-1.5 bg-slate-300 rounded" />
                        <div className="w-14 h-1.5 bg-slate-300 rounded" />
                      </div>
                    </div>

                    {/* Mock Summary */}
                    <div className="space-y-1">
                      <div className="w-20 h-2 bg-slate-300 rounded mb-1" />
                      <div className="w-full h-1.5 bg-slate-200 rounded" />
                      <div className="w-5/6 h-1.5 bg-slate-200 rounded" />
                    </div>

                    {/* Mock Experience */}
                    <div className="space-y-1.5 pt-1">
                      <div className="w-24 h-2 bg-slate-300 rounded" />
                      <div className="flex justify-between items-center">
                        <div className="w-1/3 h-2 bg-slate-700 rounded" />
                        <div className="w-16 h-1.5 bg-slate-400 rounded" />
                      </div>
                      <div className="space-y-1 pl-2 border-l border-slate-200">
                        <div className="w-full h-1.5 bg-slate-200 rounded" />
                        <div className="w-4/5 h-1.5 bg-slate-200 rounded" />
                      </div>
                    </div>

                    {/* Mock Skills */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      <div className="w-10 h-3 bg-slate-100 border border-slate-200 rounded" />
                      <div className="w-12 h-3 bg-slate-100 border border-slate-200 rounded" />
                      <div className="w-8 h-3 bg-slate-100 border border-slate-200 rounded" />
                      <div className="w-14 h-3 bg-slate-100 border border-slate-200 rounded" />
                    </div>
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <h3 className="font-bold text-base text-slate-900">{tpl.name}</h3>
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${tpl.badgeColor}`}>
                        {tpl.styleName}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {tpl.description}
                    </p>
                  </div>

                  <Link
                    href={`/builder?template=${tpl.id}`}
                    className="w-full py-2.5 px-4 rounded-xl border border-slate-200 hover:border-sky-500 hover:bg-sky-50/50 text-slate-700 hover:text-sky-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>Use {tpl.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works Section */}
        <div id="how-it-works" className="mt-20 md:mt-28 scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-3 py-1 rounded-full">
              Seamless Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3">
              How AI Resume Builder Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-subtle relative">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 font-extrabold flex items-center justify-center text-lg mb-4">
                1
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-1.5">Enter Your Raw Info</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Fill in your background, or load our instant sample data with a single click. Specify your target role to guide the AI.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-subtle relative">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 font-extrabold flex items-center justify-center text-lg mb-4">
                2
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-1.5">AI Polishing with Gemini</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Gemini rewrites your bullet points with high-impact action verbs, quantifies achievements, and crafts a tailored executive summary.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-subtle relative">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 font-extrabold flex items-center justify-center text-lg mb-4">
                3
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-1.5">Customize & Download PDF</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Choose between Modern, Classic, or Minimal layouts, manually tweak any line in real time, and download your clean A4 PDF.
              </p>
            </div>
          </div>
        </div>

        {/* Feature Highlights Section */}
        <div id="features" className="mt-20 md:mt-24 scroll-mt-24 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white shadow-xl">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400 bg-sky-950/60 border border-sky-800/60 px-3 py-1 rounded-full">
              Why Recruiters Love This
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mt-3">
              Crafted specifically to beat ATS filters and land interviews.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
              Standard resume builders produce bloated tables and non-parseable layouts. Our templates use clean semantic typography, standard date conventions, and high-signal keyword placement that ATS parsers love.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/builder"
                className="px-6 py-3 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-2"
              >
                <span>Try the Builder Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
