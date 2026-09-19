"use client";

import React, { useState } from "react";
import { Download, Printer, Check, AlertCircle } from "lucide-react";

export default function DownloadButton({ targetRef, fileName = "Resume.pdf" }) {
  const [isExporting, setIsExporting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  /**
   * Generates and downloads a pristine, single-page A4 PDF using html2canvas + jsPDF
   */
  const handleDownloadPDF = async () => {
    if (!targetRef.current) return;
    setIsExporting(true);
    setErrorMsg("");
    setDownloadSuccess(false);

    let container = null;

    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      const source = targetRef.current;

      // 1. Create a clean offscreen clone
      const clone = source.cloneNode(true);

      // 2. Set strict single-page dimensions on the clone:
      // Standard A4 width at 96 DPI is 794px, height is 1123px
      clone.style.boxShadow = "none";
      clone.style.border = "none";
      clone.style.transform = "none";
      clone.style.margin = "0";
      clone.style.width = "794px";
      clone.style.boxSizing = "border-box";
      clone.style.backgroundColor = "#ffffff";

      // 3. Mount in a hidden sandbox
      container = document.createElement("div");
      container.style.position = "fixed";
      container.style.left = "-99999px";
      container.style.top = "0";
      container.style.width = "794px";
      container.style.zIndex = "-9999";
      container.style.backgroundColor = "#ffffff";
      container.appendChild(clone);
      document.body.appendChild(container);

      // 4. Render to high-resolution canvas (scale: 2.5 for crisp text)
      const canvas = await html2canvas(clone, {
        scale: 2.5,
        useCORS: true,
        letterRendering: true,
        logging: false,
        backgroundColor: "#ffffff",
        windowWidth: 794,
        scrollX: 0,
        scrollY: 0,
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.98);

      // 5. Build exactly 1-page A4 PDF (210mm x 297mm)
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      });

      const a4Width = 210;
      const a4Height = 297;

      // Calculate natural proportional height in mm
      const imgHeightMm = (canvas.height * a4Width) / canvas.width;

      if (imgHeightMm <= a4Height) {
        // Fits comfortably on a single page
        pdf.addImage(imgData, "JPEG", 0, 0, a4Width, imgHeightMm, undefined, "FAST");
      } else {
        // Automatically scale slightly to fit on 1 single page!
        const scaleFactor = a4Height / imgHeightMm;
        const scaledWidth = a4Width * scaleFactor;
        const xOffset = (a4Width - scaledWidth) / 2;
        pdf.addImage(imgData, "JPEG", xOffset, 0, scaledWidth, a4Height, undefined, "FAST");
      }

      pdf.save(fileName.endsWith(".pdf") ? fileName : `${fileName}.pdf`);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error("PDF generation failed:", err);
      setErrorMsg("PDF export encountered an issue. Try the Print button.");
    } finally {
      if (container && document.body.contains(container)) {
        document.body.removeChild(container);
      }
      setIsExporting(false);
    }
  };

  /**
   * Opens browser Print dialog with an isolated iframe so the resume preview
   * is shown cleanly with zero blank pages and no website UI.
   */
  const handlePrint = () => {
    if (!targetRef.current) {
      window.print();
      return;
    }

    try {
      const source = targetRef.current;

      // 1. Create an isolated hidden iframe
      const iframe = document.createElement("iframe");
      iframe.style.position = "fixed";
      iframe.style.right = "0";
      iframe.style.bottom = "0";
      iframe.style.width = "0";
      iframe.style.height = "0";
      iframe.style.border = "0";
      document.body.appendChild(iframe);

      const iframeDoc = iframe.contentWindow.document;

      // 2. Extract active stylesheets and styles from document
      const styles = Array.from(
        document.querySelectorAll('link[rel="stylesheet"], style')
      )
        .map((el) => el.outerHTML)
        .join("\n");

      // 3. Write isolated printable document
      iframeDoc.open();
      iframeDoc.write(`
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="utf-8" />
            <title>${fileName.replace(".pdf", "")}</title>
            ${styles}
            <style>
              @page {
                size: A4 portrait;
                margin: 0;
              }
              html, body {
                margin: 0 !important;
                padding: 0 !important;
                background-color: #ffffff !important;
                color: #000000 !important;
                width: 100% !important;
                height: auto !important;
                overflow: visible !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              #isolated-resume-root {
                width: 210mm !important;
                min-height: 297mm !important;
                box-sizing: border-box !important;
                margin: 0 auto !important;
                padding: 0 !important;
                background: #ffffff !important;
              }
              #isolated-resume-root > div {
                box-shadow: none !important;
                border: none !important;
              }
            </style>
          </head>
          <body>
            <div id="isolated-resume-root">
              ${source.innerHTML}
            </div>
          </body>
        </html>
      `);
      iframeDoc.close();

      // 4. Focus and trigger print
      setTimeout(() => {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
        setTimeout(() => {
          if (document.body.contains(iframe)) {
            document.body.removeChild(iframe);
          }
        }, 3000);
      }, 400);
    } catch (err) {
      console.error("Iframe print error:", err);
      // Fallback
      window.print();
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-2">
      <button
        type="button"
        onClick={handleDownloadPDF}
        disabled={isExporting}
        className="w-full sm:w-auto px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold rounded-xl shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.99]"
        title="Download high-resolution single-page A4 PDF"
      >
        {isExporting ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Generating 1-Page PDF...</span>
          </>
        ) : downloadSuccess ? (
          <>
            <Check className="w-4 h-4 text-emerald-300" />
            <span>Downloaded!</span>
          </>
        ) : (
          <>
            <Download className="w-4 h-4" />
            <span>Download PDF (1-Page)</span>
          </>
        )}
      </button>

      <button
        type="button"
        onClick={handlePrint}
        className="w-full sm:w-auto px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-xl transition-colors flex items-center justify-center gap-1.5"
        title="Print or Save as PDF via browser print preview"
      >
        <Printer className="w-4 h-4 text-slate-500" />
        <span className="hidden md:inline">Print / System PDF</span>
        <span className="md:hidden">Print</span>
      </button>

      {errorMsg && (
        <span className="text-xs text-amber-700 flex items-center gap-1 bg-amber-50 px-2 py-1 rounded">
          <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
          {errorMsg}
        </span>
      )}
    </div>
  );
}
