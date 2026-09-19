"use client";

import React from "react";
import { Layout, Check, Sparkles } from "lucide-react";

export default function TemplateSelector({ activeTemplate, onSelectTemplate }) {
  const templates = [
    {
      id: "modern",
      name: "Modern",
      description: "Contemporary layout with accent header & skill tags",
      tag: "Popular",
      previewStyle: "border-t-4 border-sky-600 bg-gradient-to-b from-sky-50/50 to-white",
    },
    {
      id: "classic",
      name: "Classic",
      description: "Executive serif format optimized for traditional ATS",
      tag: "ATS Best",
      previewStyle: "border-t-4 border-slate-900 bg-slate-50/50",
    },
    {
      id: "minimal",
      name: "Minimal",
      description: "Clean Scandinavian aesthetic with high-contrast typography",
      tag: "Clean",
      previewStyle: "border-t-4 border-zinc-400 bg-white",
    },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <Layout className="w-3.5 h-3.5" />
          Resume Template
        </label>
        <span className="text-xs text-slate-400">3 layouts available</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {templates.map((tpl) => {
          const isSelected = activeTemplate === tpl.id;
          return (
            <button
              key={tpl.id}
              type="button"
              onClick={() => onSelectTemplate(tpl.id)}
              className={`text-left p-3.5 rounded-xl border-2 transition-all relative flex flex-col justify-between ${
                isSelected
                  ? "border-sky-600 bg-sky-50/40 shadow-sm ring-1 ring-sky-600/30"
                  : "border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/50"
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm text-slate-900">{tpl.name}</span>
                  <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                    {tpl.tag}
                  </span>
                </div>
                {isSelected ? (
                  <span className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center">
                    <Check className="w-3 h-3" />
                  </span>
                ) : (
                  <span className="w-5 h-5 rounded-full border border-slate-300" />
                )}
              </div>

              {/* Miniature visual thumbnail */}
              <div className={`w-full h-14 rounded-lg p-1.5 border border-slate-200/80 mb-2 flex flex-col justify-between ${tpl.previewStyle}`}>
                <div className="space-y-1">
                  <div className="w-1/3 h-1.5 bg-slate-400 rounded-full" />
                  <div className="w-1/2 h-1 bg-slate-200 rounded-full" />
                </div>
                <div className="space-y-0.5">
                  <div className="w-full h-1 bg-slate-200 rounded-full" />
                  <div className="w-4/5 h-1 bg-slate-200 rounded-full" />
                </div>
              </div>

              <p className="text-[11px] text-slate-500 leading-tight">
                {tpl.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
