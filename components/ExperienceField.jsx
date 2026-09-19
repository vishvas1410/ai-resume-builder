"use client";

import React from "react";
import { Trash2, Plus, Sparkles, Building2, Calendar, MapPin, Briefcase } from "lucide-react";

export default function ExperienceField({ experience = [], onChange }) {
  const addExperience = () => {
    const newEntry = {
      id: "exp-" + Date.now(),
      jobTitle: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    };
    onChange([...experience, newEntry]);
  };

  const updateExperience = (id, field, value) => {
    onChange(
      experience.map((exp) => {
        if (exp.id === id) {
          if (field === "current" && value === true) {
            return { ...exp, current: true, endDate: "Present" };
          }
          return { ...exp, [field]: value };
        }
        return exp;
      })
    );
  };

  const removeExperience = (id) => {
    onChange(experience.filter((exp) => exp.id !== id));
  };

  return (
    <div className="space-y-4">
      {experience.map((exp, index) => (
        <div
          key={exp.id || index}
          className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:border-slate-300 transition-colors space-y-3 relative group"
        >
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-sky-600" />
              Role #{index + 1}
            </span>
            {experience.length > 1 && (
              <button
                type="button"
                onClick={() => removeExperience(exp.id)}
                className="text-slate-400 hover:text-red-600 p-1 rounded transition-colors"
                title="Remove Experience"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Job Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Senior Software Engineer"
                value={exp.jobTitle || ""}
                onChange={(e) => updateExperience(exp.id, "jobTitle", e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Company <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Google or Tech Startup"
                value={exp.company || ""}
                onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Location
              </label>
              <input
                type="text"
                placeholder="e.g. San Francisco, CA or Remote"
                value={exp.location || ""}
                onChange={(e) => updateExperience(exp.id, "location", e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Start Date
                </label>
                <input
                  type="text"
                  placeholder="e.g. 2022-03"
                  value={exp.startDate || ""}
                  onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  End Date
                </label>
                <input
                  type="text"
                  placeholder="e.g. Present"
                  disabled={exp.current}
                  value={exp.current ? "Present" : exp.endDate || ""}
                  onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white disabled:bg-slate-100 disabled:text-slate-400"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id={`current-${exp.id}`}
              checked={Boolean(exp.current)}
              onChange={(e) => updateExperience(exp.id, "current", e.target.checked)}
              className="rounded text-sky-600 focus:ring-sky-500 h-4 w-4 border-slate-300"
            />
            <label htmlFor={`current-${exp.id}`} className="text-xs text-slate-600 font-medium cursor-pointer">
              I currently work here
            </label>
          </div>

          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
              <label className="block text-xs font-medium text-slate-700">
                Bullet Points & Achievements
              </label>
              <span className="text-[11px] text-sky-600 font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                AI will optimize into strong ATS action statements
              </span>
            </div>
            <textarea
              rows={4}
              placeholder="• Built a full stack dashboard&#10;• Reduced latency by 40%&#10;• Mentored 3 junior developers"
              value={exp.description || ""}
              onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white leading-relaxed font-mono text-xs"
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addExperience}
        className="w-full py-2.5 px-4 border border-dashed border-sky-400 hover:border-sky-600 bg-sky-50/50 hover:bg-sky-50 text-sky-700 text-sm font-medium rounded-xl flex items-center justify-center gap-2 transition-colors"
      >
        <Plus className="w-4 h-4" />
        Add Another Position
      </button>
    </div>
  );
}
