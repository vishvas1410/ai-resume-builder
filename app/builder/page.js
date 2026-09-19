"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Sparkles,
  ArrowLeft,
  FileText,
  RotateCcw,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Eye,
  Edit3,
  Check,
} from "lucide-react";

import ResumeForm from "@/components/ResumeForm";
import ResumePreview from "@/components/ResumePreview";
import TemplateSelector from "@/components/TemplateSelector";
import DownloadButton from "@/components/DownloadButton";
import LoadingSpinner from "@/components/LoadingSpinner";
import { sampleResumeData, emptyResumeData } from "@/lib/sampleData";

function BuilderContent() {
  const searchParams = useSearchParams();
  const initialTemplate = searchParams.get("template") || "modern";

  // Resume State
  const [resumeData, setResumeData] = useState(sampleResumeData);
  const [activeTemplate, setActiveTemplate] = useState(initialTemplate);
  
  // UI State
  const [isGenerating, setIsGenerating] = useState(false);
  const [toast, setToast] = useState(null); // { type: 'success' | 'error' | 'info', message: string }
  const [mobileTab, setMobileTab] = useState("editor"); // 'editor' or 'preview'
  
  // Ref for the printable resume element
  const resumePrintRef = useRef(null);

  // Sync template from URL param if present
  useEffect(() => {
    const tpl = searchParams.get("template");
    if (tpl && ["modern", "classic", "minimal"].includes(tpl)) {
      setActiveTemplate(tpl);
    }
  }, [searchParams]);

  // Toast auto dismiss
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (type, message) => {
    setToast({ type, message });
  };

  // Pre-fill / Reset actions
  const handleLoadSample = () => {
    setResumeData(sampleResumeData);
    showToast("info", "Loaded sample profile data! You can edit or generate with AI.");
  };

  const handleClearForm = () => {
    if (window.confirm("Are you sure you want to clear all form fields?")) {
      setResumeData(emptyResumeData);
      showToast("info", "Resume fields cleared.");
    }
  };

  // Gemini AI Generation Handler
  const handleGenerateAI = async () => {
    // Client-side validation: must have some basic data
    if (!resumeData.personalInfo?.fullName?.trim() && (!resumeData.experience || resumeData.experience.length === 0)) {
      showToast("error", "Please provide at least a Full Name or one Work Experience entry first.");
      return;
    }

    setIsGenerating(true);
    showToast("info", "Gemini is analyzing your background & crafting ATS bullet points...");

    try {
      const response = await fetch("/api/generate-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resumeData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to generate resume with AI");
      }

      if (result.data) {
        const { summary, experience: enhancedExp, skills: enhancedSkills } = result.data;

        // Map enhanced experiences back while preserving existing ids and attributes
        const updatedExperiences = (resumeData.experience || []).map((origExp, idx) => {
          const match = enhancedExp?.find((e) => e.id === origExp.id) || enhancedExp?.[idx];
          if (match) {
            return {
              ...origExp,
              jobTitle: match.jobTitle || origExp.jobTitle,
              company: match.company || origExp.company,
              location: match.location || origExp.location,
              description: match.description || origExp.description,
            };
          }
          return origExp;
        });

        // Merge skills without duplicates
        const mergedSkills = Array.from(
          new Set([...(enhancedSkills || []), ...(resumeData.skills || [])])
        );

        setResumeData((prev) => ({
          ...prev,
          summary: summary || prev.summary,
          experience: updatedExperiences.length > 0 ? updatedExperiences : prev.experience,
          skills: mergedSkills.length > 0 ? mergedSkills : prev.skills,
        }));

        showToast("success", "Resume successfully enhanced with Gemini AI! Review and fine-tune.");
      }
    } catch (error) {
      console.error("AI Generation Error:", error);
      showToast(
        "error",
        error.message || "Failed to communicate with Gemini API. Check your GEMINI_API_KEY in .env.local."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const getFileName = () => {
    const name = resumeData.personalInfo?.fullName?.trim()
      ? resumeData.personalInfo.fullName.trim().replace(/\s+/g, "_")
      : "My";
    return `${name}_Resume_${activeTemplate}.pdf`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100/70">
      {/* Loading Overlay */}
      {isGenerating && (
        <LoadingSpinner
          fullScreen
          size="lg"
          message="Gemini AI is crafting your resume..."
          subtext="Writing ATS-friendly bullet points, action verbs, and tailored summary"
        />
      )}

      {/* Top Navbar */}
      <header className="no-print sticky top-0 z-30 w-full bg-white border-b border-slate-200/80 shadow-xs">
        <div className="max-w-[1700px] mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <Link
              href="/"
              className="p-1.5 sm:p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              title="Back to Home"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-sky-600 text-white flex items-center justify-center font-bold text-xs sm:text-sm">
                <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <div>
                <h1 className="font-bold text-xs sm:text-base text-slate-900 leading-tight">
                  Resume Builder
                </h1>
                <p className="text-[10px] text-slate-500 hidden sm:block">
                  Live Preview & Instant AI Enhancement
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Action Controls */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              type="button"
              onClick={handleGenerateAI}
              disabled={isGenerating}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-sm font-semibold rounded-xl shadow-sm hover:shadow transition-all flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
              title="Enhance summary and rewrite experience into ATS bullet points using Google Gemini"
            >
              <Sparkles className="w-4 h-4 text-purple-200 animate-spin-slow" />
              <span>Generate with AI</span>
            </button>

            <DownloadButton targetRef={resumePrintRef} fileName={getFileName()} />
          </div>

          {/* Mobile Header Quick Actions */}
          <div className="flex lg:hidden items-center gap-1.5">
            <button
              type="button"
              onClick={handleGenerateAI}
              disabled={isGenerating}
              className="px-2.5 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 text-white text-xs font-bold rounded-lg shadow-xs flex items-center gap-1 disabled:opacity-50 active:scale-95"
              title="Generate with AI"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-200 animate-spin-slow" />
              <span>AI</span>
            </button>
            <DownloadButton targetRef={resumePrintRef} fileName={getFileName()} isCompact={true} />
          </div>
        </div>
      </header>

      {/* Subheader Toolbar */}
      <div className="no-print bg-white border-b border-slate-200 px-3 sm:px-6 py-2">
        <div className="max-w-[1700px] mx-auto flex items-center justify-between gap-2 text-xs">
          {/* Quick Data Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={handleLoadSample}
              className="px-2 sm:px-2.5 py-1 sm:py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors flex items-center gap-1 text-[11px] sm:text-xs"
              title="Fill fields with realistic sample profile"
            >
              <BookOpen className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-sky-600" />
              <span className="hidden xs:inline">Load Sample</span>
              <span className="xs:hidden">Sample</span>
            </button>
            <button
              type="button"
              onClick={handleClearForm}
              className="px-2 sm:px-2.5 py-1 sm:py-1.5 hover:bg-red-50 text-slate-500 hover:text-red-600 font-medium rounded-lg transition-colors flex items-center gap-1 text-[11px] sm:text-xs"
              title="Clear all fields"
            >
              <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Clear</span>
            </button>
          </div>

          {/* Mobile View Switcher Tab (Editor vs Preview) */}
          <div className="flex lg:hidden bg-slate-100 p-0.5 sm:p-1 rounded-xl shrink-0">
            <button
              type="button"
              onClick={() => setMobileTab("editor")}
              className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                mobileTab === "editor"
                  ? "bg-white text-sky-700 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Form</span>
            </button>
            <button
              type="button"
              onClick={() => setMobileTab("preview")}
              className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                mobileTab === "preview"
                  ? "bg-white text-sky-700 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview</span>
            </button>
          </div>
        </div>
      </div>

      {/* Notification Toast */}
      {toast && (
        <div
          id="toast-container"
          className={`no-print fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-50 max-w-sm sm:max-w-md p-3.5 sm:p-4 rounded-xl shadow-xl flex items-start gap-2.5 sm:gap-3 border transition-all animate-bounce-subtle ${
            toast.type === "error"
              ? "bg-red-50 border-red-200 text-red-900"
              : toast.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-900"
              : "bg-sky-50 border-sky-200 text-sky-900"
          }`}
        >
          {toast.type === "error" && <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 shrink-0 mt-0.5" />}
          {toast.type === "success" && <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0 mt-0.5" />}
          {toast.type === "info" && <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-sky-600 shrink-0 mt-0.5" />}
          <div className="flex-1 text-xs sm:text-sm">
            <p className="font-semibold capitalize">{toast.type}</p>
            <p className="text-[11px] sm:text-xs mt-0.5 opacity-90">{toast.message}</p>
          </div>
          <button
            type="button"
            onClick={() => setToast(null)}
            className="text-slate-400 hover:text-slate-700 text-xs p-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Builder Two-Column Workspace */}
      <main className="flex-1 max-w-[1700px] w-full mx-auto p-3 sm:p-6 pb-24 lg:pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-start">
          {/* Left Column: Form Controls */}
          <div
            className={`no-print lg:col-span-6 space-y-4 sm:space-y-6 ${
              mobileTab === "editor" ? "block" : "hidden lg:block"
            }`}
          >
            {/* Template Selector */}
            <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200 shadow-subtle">
              <TemplateSelector
                activeTemplate={activeTemplate}
                onSelectTemplate={setActiveTemplate}
              />
            </div>

            {/* Resume Input Form */}
            <ResumeForm
              data={resumeData}
              onChange={setResumeData}
              onGenerateAI={handleGenerateAI}
              isGenerating={isGenerating}
            />
          </div>

          {/* Right Column: Live Resume Preview (Sticky on desktop) */}
          <div
            className={`resume-column-wrapper lg:col-span-6 lg:sticky lg:top-24 max-h-[calc(100vh-7rem)] overflow-y-auto ${
              mobileTab === "preview" ? "block" : "hidden lg:block"
            }`}
          >
            <div className="resume-card-box bg-white p-2.5 sm:p-6 rounded-2xl border border-slate-200 shadow-subtle overflow-hidden">
              <ResumePreview
                ref={resumePrintRef}
                data={resumeData}
                activeTemplate={activeTemplate}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Sticky Bottom Floating Action Bar */}
      <div className="no-print lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-3 py-2 flex items-center justify-between gap-2 shadow-2xl">
        <button
          type="button"
          onClick={() => setMobileTab(mobileTab === "editor" ? "preview" : "editor")}
          className="flex-1 py-2 px-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors active:scale-95"
        >
          {mobileTab === "editor" ? (
            <>
              <Eye className="w-4 h-4 text-sky-600" />
              <span>View Preview</span>
            </>
          ) : (
            <>
              <Edit3 className="w-4 h-4 text-sky-600" />
              <span>Edit Form</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleGenerateAI}
          disabled={isGenerating}
          className="py-2 px-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-sm active:scale-95 disabled:opacity-50"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-200 animate-spin-slow" />
          <span>AI Boost</span>
        </button>

        <DownloadButton
          targetRef={resumePrintRef}
          fileName={getFileName()}
          isCompact={true}
        />
      </div>
    </div>
  );
}

export default function BuilderPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <LoadingSpinner size="lg" message="Loading Resume Builder..." subtext="" />
        </div>
      }
    >
      <BuilderContent />
    </Suspense>
  );
}
