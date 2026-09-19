"use client";

import React, { forwardRef, useState, useEffect, useRef } from "react";
import ModernTemplate from "./templates/ModernTemplate";
import ClassicTemplate from "./templates/ClassicTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import { ZoomIn, ZoomOut, Maximize2, RotateCcw } from "lucide-react";

const ResumePreview = forwardRef(function ResumePreview(
  { data, activeTemplate = "modern" },
  ref
) {
  const [zoomLevel, setZoomLevel] = useState(100);
  const containerRef = useRef(null);

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

  // Auto-fit scale on mobile/small screens
  const calculateFitScale = () => {
    if (!containerRef.current) return 100;
    const availableWidth = containerRef.current.clientWidth;
    // Standard A4 width in px is ~794px
    if (availableWidth < 840) {
      // Leave 16px total padding on sides
      const fit = (availableWidth - 16) / 794;
      return Math.max(30, Math.min(100, Math.round(fit * 100)));
    }
    return 100;
  };

  useEffect(() => {
    const handleResize = () => {
      const fit = calculateFitScale();
      setZoomLevel(fit);
    };

    // Run on mount
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 10, 140));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 10, 30));
  const handleFitScreen = () => setZoomLevel(calculateFitScale());
  const handleResetZoom = () => setZoomLevel(100);

  const scaleRatio = zoomLevel / 100;

  return (
    <div ref={containerRef} className="flex flex-col items-center w-full max-w-full">
      {/* Zoom controls bar (hidden during print) */}
      <div className="no-print w-full flex flex-wrap items-center justify-between gap-2 pb-3 text-xs text-slate-500 border-b border-slate-200 mb-3 sm:mb-4">
        <div className="flex items-center gap-1.5 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs text-slate-700">Live Preview</span>
          <span className="text-slate-300">|</span>
          <span className="capitalize font-semibold text-slate-800">{activeTemplate}</span>
        </div>

        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
          <button
            type="button"
            onClick={handleZoomOut}
            disabled={zoomLevel <= 30}
            className="p-1.5 hover:bg-white rounded text-slate-600 disabled:opacity-40 transition-colors"
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          
          <button
            type="button"
            onClick={handleFitScreen}
            className="px-2 py-0.5 font-mono text-[11px] font-semibold text-sky-700 hover:bg-white rounded transition-colors"
            title="Click to Fit to Screen"
          >
            {zoomLevel}%
          </button>

          <button
            type="button"
            onClick={handleZoomIn}
            disabled={zoomLevel >= 140}
            className="p-1.5 hover:bg-white rounded text-slate-600 disabled:opacity-40 transition-colors"
            title="Zoom In"
            aria-label="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={handleFitScreen}
            className="p-1.5 hover:bg-white rounded text-slate-500 hover:text-slate-800 transition-colors ml-0.5"
            title="Fit to Screen Width"
            aria-label="Fit to Screen Width"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Responsive Scaled Viewport Container */}
      <div className="w-full flex justify-center overflow-x-auto overflow-y-visible pb-4">
        <div
          style={{
            // Constrain layout bounds to scaled dimensions so mobile page never scrolls horizontally
            width: `${794 * scaleRatio}px`,
            minHeight: `${1123 * scaleRatio}px`,
            position: "relative",
            transition: "width 0.15s ease-out, min-height 0.15s ease-out",
          }}
          className="flex justify-center"
        >
          <div
            style={{
              width: "794px",
              transform: `scale(${scaleRatio})`,
              transformOrigin: "top left",
              transition: "transform 0.15s ease-out",
              position: "absolute",
              top: 0,
              left: 0,
            }}
            className="print-container"
          >
            {/* A4 Printable Canvas (794px = 210mm at 96 DPI) */}
            <div
              ref={ref}
              id="resume-printable-area"
              className="w-[794px] min-h-[1123px] bg-white shadow-paper border border-slate-200/80 mx-auto text-left relative transition-all"
            >
              {renderTemplate()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ResumePreview;
