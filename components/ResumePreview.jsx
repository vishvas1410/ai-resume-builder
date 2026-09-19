"use client";

import React, { forwardRef, useState } from "react";
import ModernTemplate from "./templates/ModernTemplate";
import ClassicTemplate from "./templates/ClassicTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

const ResumePreview = forwardRef(function ResumePreview(
  { data, activeTemplate = "modern" },
  ref
) {
  const [zoomLevel, setZoomLevel] = useState(100);

  const renderTemplate = () => {
    switch (activeTemplate) {
      case "classic":
        return <ClassicTemplate data={data} />;
      case "minimal":
        return <MinimalTemplate data={data} />;
      case "modern":
      default:
        return <ModernTemplate data={data} />;
    }
  };

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 10, 130));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 10, 70));
  const handleResetZoom = () => setZoomLevel(100);

  return (
    <div className="flex flex-col items-center w-full">
      {/* Zoom controls bar (hidden during print) */}
      <div className="no-print w-full flex items-center justify-between pb-3 text-xs text-slate-500 border-b border-slate-200 mb-4">
        <div className="flex items-center gap-1.5 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Live A4 Preview</span>
          <span className="text-slate-300">|</span>
          <span className="capitalize">{activeTemplate} Layout</span>
        </div>

        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
          <button
            type="button"
            onClick={handleZoomOut}
            disabled={zoomLevel <= 70}
            className="p-1 hover:bg-white rounded text-slate-600 disabled:opacity-40 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="px-2 font-mono text-[11px] select-none text-slate-700">
            {zoomLevel}%
          </span>
          <button
            type="button"
            onClick={handleZoomIn}
            disabled={zoomLevel >= 130}
            className="p-1 hover:bg-white rounded text-slate-600 disabled:opacity-40 transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleResetZoom}
            className="p-1 hover:bg-white rounded text-slate-400 hover:text-slate-700 transition-colors ml-0.5"
            title="Reset Zoom"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* A4 Paper Viewport Wrapper */}
      <div className="w-full overflow-x-auto flex justify-center pb-8">
        <div
          style={{
            transform: `scale(${zoomLevel / 100})`,
            transformOrigin: "top center",
            transition: "transform 0.15s ease-out",
          }}
          className="print-container"
        >
          {/* A4 Printable Canvas */}
          <div
            ref={ref}
            id="resume-printable-area"
            className="w-[210mm] min-h-[297mm] bg-white shadow-paper border border-slate-200/80 mx-auto text-left relative transition-all"
          >
            {renderTemplate()}
          </div>
        </div>
      </div>
    </div>
  );
});

export default ResumePreview;
