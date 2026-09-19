"use client";

import React from "react";
import { Trash2, Plus, GraduationCap } from "lucide-react";

export default function EducationField({ education = [], onChange }) {
  const addEducation = () => {
    const newEntry = {
      id: "edu-" + Date.now(),
      degree: "",
      institution: "",
      location: "",
      graduationDate: "",
      gpa: "",
    };
    onChange([...education, newEntry]);
  };

  const updateEducation = (id, field, value) => {
    onChange(
      education.map((edu) => {
        if (edu.id === id) {
          return { ...edu, [field]: value };
        }
        return edu;
      })
    );
  };

  const removeEducation = (id) => {
    onChange(education.filter((edu) => edu.id !== id));
  };

  return (
    <div className="space-y-4">
      {education.map((edu, index) => (
        <div
          key={edu.id || index}
          className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:border-slate-300 transition-colors space-y-3 relative group"
        >
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-sky-600" />
              Education #{index + 1}
            </span>
            {education.length > 1 && (
              <button
                type="button"
                onClick={() => removeEducation(edu.id)}
                className="text-slate-400 hover:text-red-600 p-1 rounded transition-colors"
                title="Remove Education"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Degree / Field of Study <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. B.S. in Computer Science"
                value={edu.degree || ""}
                onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Institution / University <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. University of California, Berkeley"
                value={edu.institution || ""}
                onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
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
                placeholder="e.g. Berkeley, CA"
                value={edu.location || ""}
                onChange={(e) => updateEducation(edu.id, "location", e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Graduation Date
                </label>
                <input
                  type="text"
                  placeholder="e.g. 2022-05"
                  value={edu.graduationDate || ""}
                  onChange={(e) => updateEducation(edu.id, "graduationDate", e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  GPA (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 3.8 / 4.0"
                  value={edu.gpa || ""}
                  onChange={(e) => updateEducation(edu.id, "gpa", e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white"
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addEducation}
        className="w-full py-2.5 px-4 border border-dashed border-sky-400 hover:border-sky-600 bg-sky-50/50 hover:bg-sky-50 text-sky-700 text-sm font-medium rounded-xl flex items-center justify-center gap-2 transition-colors"
      >
        <Plus className="w-4 h-4" />
        Add Another Degree / School
      </button>
    </div>
  );
}
