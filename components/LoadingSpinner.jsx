import React from "react";
import { Sparkles } from "lucide-react";

export default function LoadingSpinner({
  size = "md",
  message = "Generating your resume...",
  subtext = "Polishing summary & optimizing bullet points for ATS",
  fullScreen = false,
}) {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4",
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center text-center p-6 space-y-4">
      <div className="relative">
        {/* Glowing pulse ring */}
        <div className="absolute inset-0 rounded-full bg-sky-400/20 animate-ping" />
        
        {/* Main rotating spinner */}
        <div
          className={`${sizeClasses[size] || sizeClasses.md} rounded-full border-sky-200 border-t-sky-600 animate-spin`}
        />
        
        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center text-sky-600">
          <Sparkles className="w-4 h-4 animate-pulse" />
        </div>
      </div>

      {message && (
        <div className="space-y-1">
          <p className="text-sm font-semibold text-slate-800">{message}</p>
          {subtext && <p className="text-xs text-slate-500 max-w-xs">{subtext}</p>}
        </div>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 shadow-2xl border border-slate-100 max-w-sm w-full">
          {spinner}
        </div>
      </div>
    );
  }

  return spinner;
}
