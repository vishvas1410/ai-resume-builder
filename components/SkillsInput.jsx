"use client";

import React, { useState } from "react";
import { X, Plus, Sparkles } from "lucide-react";

export default function SkillsInput({ skills = [], onChange }) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSkill(inputValue);
    }
  };

  const addSkill = (val) => {
    const trimmed = val.trim().replace(/^,+|,+$/g, "");
    if (!trimmed) return;

    if (!skills.includes(trimmed)) {
      onChange([...skills, trimmed]);
    }
    setInputValue("");
  };

  const removeSkill = (skillToRemove) => {
    onChange(skills.filter((s) => s !== skillToRemove));
  };

  const quickSuggestions = [
    "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Python",
    "Tailwind CSS", "PostgreSQL", "Docker", "AWS", "Git", "REST APIs"
  ].filter(s => !skills.includes(s));

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a skill and press Enter or comma..."
          className="flex-1 px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
        />
        <button
          type="button"
          onClick={() => addSkill(inputValue)}
          disabled={!inputValue.trim()}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          Add
        </button>
      </div>

      {/* Selected Skill Chips */}
      {skills.length > 0 ? (
        <div className="flex flex-wrap gap-2 pt-1">
          {skills.map((skill, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-50 border border-sky-200 text-sky-800 text-xs font-medium rounded-full transition-all hover:bg-sky-100"
            >
              <span>{skill}</span>
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                className="text-sky-600 hover:text-sky-900 focus:outline-none"
                aria-label={`Remove ${skill}`}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      ) : (
        <p className="text-xs text-slate-400 italic">No skills added yet. Add skills or let AI suggest them.</p>
      )}

      {/* Quick Suggestions */}
      {quickSuggestions.length > 0 && (
        <div className="pt-2 border-t border-slate-100">
          <p className="text-[11px] font-medium text-slate-500 mb-1.5 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            Quick suggestions:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {quickSuggestions.slice(0, 6).map((sug, i) => (
              <button
                key={i}
                type="button"
                onClick={() => onChange([...skills, sug])}
                className="text-[11px] px-2 py-0.5 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 rounded transition-colors"
              >
                + {sug}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
