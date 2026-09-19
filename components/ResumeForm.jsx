"use client";

import React, { useState } from "react";
import ExperienceField from "./ExperienceField";
import EducationField from "./EducationField";
import SkillsInput from "./SkillsInput";
import {
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderGit2,
  Award,
  Target,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
} from "lucide-react";

export default function ResumeForm({ data, onChange, onGenerateAI, isGenerating }) {
  // Collapsible section states
  const [openSections, setOpenSections] = useState({
    personal: true,
    target: true,
    summary: true,
    experience: true,
    skills: true,
    education: true,
    projects: false,
    certifications: false,
  });

  const toggleSection = (sec) => {
    setOpenSections((prev) => ({ ...prev, [sec]: !prev[sec] }));
  };

  const updatePersonalInfo = (field, value) => {
    onChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [field]: value,
      },
    });
  };

  const updateTargetJob = (field, value) => {
    onChange({
      ...data,
      targetJob: {
        ...data.targetJob,
        [field]: value,
      },
    });
  };

  // Projects handlers
  const addProject = () => {
    const newProj = {
      id: "proj-" + Date.now(),
      name: "",
      description: "",
      tech: "",
      link: "",
    };
    onChange({
      ...data,
      projects: [...(data.projects || []), newProj],
    });
  };

  const updateProject = (id, field, value) => {
    onChange({
      ...data,
      projects: (data.projects || []).map((p) =>
        p.id === id ? { ...p, [field]: value } : p
      ),
    });
  };

  const removeProject = (id) => {
    onChange({
      ...data,
      projects: (data.projects || []).filter((p) => p.id !== id),
    });
  };

  // Certifications handlers
  const addCertification = () => {
    const newCert = {
      id: "cert-" + Date.now(),
      name: "",
      issuer: "",
      date: "",
    };
    onChange({
      ...data,
      certifications: [...(data.certifications || []), newCert],
    });
  };

  const updateCertification = (id, field, value) => {
    onChange({
      ...data,
      certifications: (data.certifications || []).map((c) =>
        c.id === id ? { ...c, [field]: value } : c
      ),
    });
  };

  const removeCertification = (id) => {
    onChange({
      ...data,
      certifications: (data.certifications || []).filter((c) => c.id !== id),
    });
  };

  return (
    <div className="space-y-4">
      {/* 1. Personal Information */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-subtle transition-all">
        <button
          type="button"
          onClick={() => toggleSection("personal")}
          className="w-full px-3.5 sm:px-5 py-3 sm:py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors text-left"
        >
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span className="p-1.5 sm:p-2 bg-sky-100 text-sky-700 rounded-lg">
              <User className="w-4 h-4" />
            </span>
            <div>
              <h3 className="font-bold text-slate-800 text-xs sm:text-sm">Personal Information</h3>
              <p className="text-[11px] sm:text-xs text-slate-500">Contact details and portfolio links</p>
            </div>
          </div>
          {openSections.personal ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {openSections.personal && (
          <div className="p-3.5 sm:p-5 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={data.personalInfo?.fullName || ""}
                onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
                placeholder="e.g. Alex Rivera"
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={data.personalInfo?.email || ""}
                onChange={(e) => updatePersonalInfo("email", e.target.value)}
                placeholder="e.g. alex.rivera@example.com"
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={data.personalInfo?.phone || ""}
                onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                placeholder="e.g. +1 (555) 234-5678"
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Location
              </label>
              <input
                type="text"
                value={data.personalInfo?.location || ""}
                onChange={(e) => updatePersonalInfo("location", e.target.value)}
                placeholder="e.g. San Francisco, CA or Remote"
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                LinkedIn Profile URL
              </label>
              <input
                type="url"
                value={data.personalInfo?.linkedin || ""}
                onChange={(e) => updatePersonalInfo("linkedin", e.target.value)}
                placeholder="e.g. https://linkedin.com/in/alexrivera"
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Portfolio / GitHub / Website URL
              </label>
              <input
                type="url"
                value={data.personalInfo?.portfolio || ""}
                onChange={(e) => updatePersonalInfo("portfolio", e.target.value)}
                placeholder="e.g. https://alexrivera.io or https://github.com/username"
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>
        )}
      </div>

      {/* 2. Target Job / Tailoring */}
      <div className="bg-white rounded-2xl border border-sky-200 overflow-hidden shadow-subtle transition-all">
        <button
          type="button"
          onClick={() => toggleSection("target")}
          className="w-full px-3.5 sm:px-5 py-3 sm:py-4 flex items-center justify-between bg-sky-50/40 hover:bg-sky-50/70 transition-colors text-left"
        >
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span className="p-1.5 sm:p-2 bg-sky-500 text-white rounded-lg">
              <Target className="w-4 h-4" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-800 text-xs sm:text-sm">Target Role & Job Description</h3>
                <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-sky-100 text-sky-800 rounded-full">
                  AI Context
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500">Gemini tailors your bullets and summary for this role</p>
            </div>
          </div>
          {openSections.target ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {openSections.target && (
          <div className="p-3.5 sm:p-5 border-t border-sky-100 space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Target Job Title
              </label>
              <input
                type="text"
                value={data.targetJob?.title || ""}
                onChange={(e) => updateTargetJob("title", e.target.value)}
                placeholder="e.g. Senior Full Stack Engineer, Product Manager"
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Job Description / Keywords (Optional)
              </label>
              <textarea
                rows={3}
                value={data.targetJob?.description || ""}
                onChange={(e) => updateTargetJob("description", e.target.value)}
                placeholder="Paste key qualifications or responsibilities from the job posting to align keywords and ATS match..."
                className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>
        )}
      </div>

      {/* 3. Professional Summary */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-subtle transition-all">
        <button
          type="button"
          onClick={() => toggleSection("summary")}
          className="w-full px-3.5 sm:px-5 py-3 sm:py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors text-left"
        >
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span className="p-1.5 sm:p-2 bg-purple-100 text-purple-700 rounded-lg">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <h3 className="font-bold text-slate-800 text-xs sm:text-sm">Professional Summary</h3>
              <p className="text-[11px] sm:text-xs text-slate-500">Brief executive summary (leave blank for AI generation)</p>
            </div>
          </div>
          {openSections.summary ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {openSections.summary && (
          <div className="p-3.5 sm:p-5 border-t border-slate-100">
            <textarea
              rows={4}
              value={data.summary || ""}
              onChange={(e) => onChange({ ...data, summary: e.target.value })}
              placeholder="Write a draft summary or leave blank and click 'Generate with AI' to let Gemini craft one for you..."
              className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 leading-relaxed"
            />
          </div>
        )}
      </div>

      {/* 4. Work Experience */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-subtle transition-all">
        <button
          type="button"
          onClick={() => toggleSection("experience")}
          className="w-full px-3.5 sm:px-5 py-3 sm:py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors text-left"
        >
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span className="p-1.5 sm:p-2 bg-emerald-100 text-emerald-700 rounded-lg">
              <Briefcase className="w-4 h-4" />
            </span>
            <div>
              <h3 className="font-bold text-slate-800 text-xs sm:text-sm">Work Experience</h3>
              <p className="text-[11px] sm:text-xs text-slate-500">Add positions, roles, and achievements</p>
            </div>
          </div>
          {openSections.experience ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {openSections.experience && (
          <div className="p-3.5 sm:p-5 border-t border-slate-100">
            <ExperienceField
              experience={data.experience || []}
              onChange={(newExp) => onChange({ ...data, experience: newExp })}
            />
          </div>
        )}
      </div>

      {/* 5. Skills */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-subtle transition-all">
        <button
          type="button"
          onClick={() => toggleSection("skills")}
          className="w-full px-3.5 sm:px-5 py-3 sm:py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors text-left"
        >
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span className="p-1.5 sm:p-2 bg-amber-100 text-amber-700 rounded-lg">
              <Wrench className="w-4 h-4" />
            </span>
            <div>
              <h3 className="font-bold text-slate-800 text-xs sm:text-sm">Skills & Competencies</h3>
              <p className="text-[11px] sm:text-xs text-slate-500">Languages, frameworks, and tools</p>
            </div>
          </div>
          {openSections.skills ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {openSections.skills && (
          <div className="p-3.5 sm:p-5 border-t border-slate-100">
            <SkillsInput
              skills={data.skills || []}
              onChange={(newSkills) => onChange({ ...data, skills: newSkills })}
            />
          </div>
        )}
      </div>

      {/* 6. Education */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-subtle transition-all">
        <button
          type="button"
          onClick={() => toggleSection("education")}
          className="w-full px-3.5 sm:px-5 py-3 sm:py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors text-left"
        >
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span className="p-1.5 sm:p-2 bg-blue-100 text-blue-700 rounded-lg">
              <GraduationCap className="w-4 h-4" />
            </span>
            <div>
              <h3 className="font-bold text-slate-800 text-xs sm:text-sm">Education</h3>
              <p className="text-[11px] sm:text-xs text-slate-500">Degrees, schools, and academic background</p>
            </div>
          </div>
          {openSections.education ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {openSections.education && (
          <div className="p-3.5 sm:p-5 border-t border-slate-100">
            <EducationField
              education={data.education || []}
              onChange={(newEdu) => onChange({ ...data, education: newEdu })}
            />
          </div>
        )}
      </div>

      {/* 7. Projects (Optional) */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-subtle transition-all">
        <button
          type="button"
          onClick={() => toggleSection("projects")}
          className="w-full px-3.5 sm:px-5 py-3 sm:py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors text-left"
        >
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span className="p-1.5 sm:p-2 bg-indigo-100 text-indigo-700 rounded-lg">
              <FolderGit2 className="w-4 h-4" />
            </span>
            <div>
              <h3 className="font-bold text-slate-800 text-xs sm:text-sm">Projects (Optional)</h3>
              <p className="text-[11px] sm:text-xs text-slate-500">Open-source or notable portfolio projects</p>
            </div>
          </div>
          {openSections.projects ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {openSections.projects && (
          <div className="p-3.5 sm:p-5 border-t border-slate-100 space-y-3 sm:space-y-4">
            {(data.projects || []).map((proj, idx) => (
              <div
                key={proj.id || idx}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3"
              >
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <span className="text-xs font-semibold text-slate-700 uppercase">
                    Project #{idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeProject(proj.id)}
                    className="text-slate-400 hover:text-red-600 p-1 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Project Name
                    </label>
                    <input
                      type="text"
                      value={proj.name}
                      onChange={(e) => updateProject(proj.id, "name", e.target.value)}
                      placeholder="e.g. Real-Time Analytics Platform"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Project URL / GitHub Link
                    </label>
                    <input
                      type="url"
                      value={proj.link}
                      onChange={(e) => updateProject(proj.id, "link", e.target.value)}
                      placeholder="e.g. https://github.com/..."
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Tech Stack Used
                    </label>
                    <input
                      type="text"
                      value={proj.tech}
                      onChange={(e) => updateProject(proj.id, "tech", e.target.value)}
                      placeholder="e.g. Next.js, PostgreSQL, Docker, AWS"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Description
                    </label>
                    <textarea
                      rows={2}
                      value={proj.description}
                      onChange={(e) => updateProject(proj.id, "description", e.target.value)}
                      placeholder="Brief summary of the architecture, features, and impact..."
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addProject}
              className="w-full py-2.5 px-4 border border-dashed border-sky-400 hover:border-sky-600 bg-sky-50/50 hover:bg-sky-50 text-sky-700 text-sm font-medium rounded-xl flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Project
            </button>
          </div>
        )}
      </div>

      {/* 8. Certifications (Optional) */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-subtle transition-all">
        <button
          type="button"
          onClick={() => toggleSection("certifications")}
          className="w-full px-3.5 sm:px-5 py-3 sm:py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors text-left"
        >
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span className="p-1.5 sm:p-2 bg-rose-100 text-rose-700 rounded-lg">
              <Award className="w-4 h-4" />
            </span>
            <div>
              <h3 className="font-bold text-slate-800 text-xs sm:text-sm">Certifications (Optional)</h3>
              <p className="text-[11px] sm:text-xs text-slate-500">Licenses and recognized credentials</p>
            </div>
          </div>
          {openSections.certifications ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {openSections.certifications && (
          <div className="p-3.5 sm:p-5 border-t border-slate-100 space-y-3 sm:space-y-4">
            {(data.certifications || []).map((cert, idx) => (
              <div
                key={cert.id || idx}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3"
              >
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <span className="text-xs font-semibold text-slate-700 uppercase">
                    Certification #{idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeCertification(cert.id)}
                    className="text-slate-400 hover:text-red-600 p-1 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-1">
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Certificate Name
                    </label>
                    <input
                      type="text"
                      value={cert.name}
                      onChange={(e) => updateCertification(cert.id, "name", e.target.value)}
                      placeholder="e.g. AWS Solutions Architect"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Issuer
                    </label>
                    <input
                      type="text"
                      value={cert.issuer}
                      onChange={(e) => updateCertification(cert.id, "issuer", e.target.value)}
                      placeholder="e.g. Amazon Web Services"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Year / Date
                    </label>
                    <input
                      type="text"
                      value={cert.date}
                      onChange={(e) => updateCertification(cert.id, "date", e.target.value)}
                      placeholder="e.g. 2023"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addCertification}
              className="w-full py-2.5 px-4 border border-dashed border-sky-400 hover:border-sky-600 bg-sky-50/50 hover:bg-sky-50 text-sky-700 text-sm font-medium rounded-xl flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Certification
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
