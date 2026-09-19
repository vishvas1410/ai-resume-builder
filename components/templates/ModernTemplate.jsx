import React from "react";
import { Mail, Phone, MapPin, Globe, Linkedin, ExternalLink } from "lucide-react";

export default function ModernTemplate({ data }) {
  const {
    personalInfo = {},
    targetJob = {},
    summary = "",
    experience = [],
    education = [],
    skills = [],
    certifications = [],
    projects = [],
  } = data || {};

  return (
    <div className="modern-template bg-white text-slate-800 font-sans p-6 sm:p-7 leading-normal text-[12.5px] box-border w-full">
      {/* Resume Header */}
      <div className="resume-header border-b-2 border-sky-600 pb-3 mb-3.5">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-none">
              {personalInfo.fullName || "Your Full Name"}
            </h1>
            {targetJob?.title && (
              <p className="text-sky-700 font-semibold text-sm mt-1 tracking-wide">
                {targetJob.title}
              </p>
            )}
          </div>
        </div>

        {/* Contact Links */}
        <div className="flex flex-wrap gap-y-1 gap-x-3.5 mt-2.5 text-[11.5px] text-slate-600">
          {personalInfo.email && (
            <span className="inline-flex items-center gap-1.5 hover:text-sky-700">
              <Mail className="w-3.5 h-3.5 text-sky-600 shrink-0" />
              <span>{personalInfo.email}</span>
            </span>
          )}
          {personalInfo.phone && (
            <span className="inline-flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-sky-600 shrink-0" />
              <span>{personalInfo.phone}</span>
            </span>
          )}
          {personalInfo.location && (
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-sky-600 shrink-0" />
              <span>{personalInfo.location}</span>
            </span>
          )}
          {personalInfo.linkedin && (
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sky-700 hover:underline"
            >
              <Linkedin className="w-3.5 h-3.5 shrink-0" />
              <span>{personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, "")}</span>
            </a>
          )}
          {personalInfo.portfolio && (
            <a
              href={personalInfo.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sky-700 hover:underline"
            >
              <Globe className="w-3.5 h-3.5 shrink-0" />
              <span>{personalInfo.portfolio.replace(/^https?:\/\/(www\.)?/, "")}</span>
            </a>
          )}
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="space-y-3.5">
        {/* Summary */}
        {summary && (
          <section className="break-inside-avoid">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-sky-800 bg-sky-50 px-2 py-0.5 rounded inline-block mb-1">
              Professional Summary
            </h2>
            <p className="text-slate-700 leading-relaxed text-[12px]">{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <section className="break-inside-avoid">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-sky-800 bg-sky-50 px-2 py-0.5 rounded inline-block mb-2">
              Work Experience
            </h2>
            <div className="space-y-2.5">
              {experience.map((exp, idx) => (
                <div key={exp.id || idx} className="relative pl-2.5 border-l-2 border-sky-200 break-inside-avoid">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="font-bold text-slate-900 text-[12.5px]">
                      {exp.jobTitle || "Job Title"}
                      {exp.company && (
                        <span className="font-semibold text-slate-600"> • {exp.company}</span>
                      )}
                    </h3>
                    <div className="text-[11px] text-slate-500 font-medium whitespace-nowrap">
                      {exp.startDate} {exp.startDate && (exp.endDate || exp.current) ? "–" : ""}{" "}
                      {exp.current ? "Present" : exp.endDate}
                      {exp.location ? ` | ${exp.location}` : ""}
                    </div>
                  </div>
                  {exp.description && (
                    <div className="mt-1 text-slate-700 text-[11.5px] leading-snug whitespace-pre-line space-y-0.5">
                      {exp.description.split("\n").map((line, lIdx) => {
                        const trimmed = line.trim();
                        if (!trimmed) return null;
                        return (
                          <div key={lIdx} className="flex items-start gap-1.5">
                            <span className="text-sky-600 text-xs shrink-0 leading-none mt-0.5">•</span>
                            <span className="flex-1">{trimmed.replace(/^[•\-\*]\s*/, "")}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <section className="break-inside-avoid">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-sky-800 bg-sky-50 px-2 py-0.5 rounded inline-block mb-1.5">
              Technical & Core Skills
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 bg-slate-100 text-slate-800 text-[11px] rounded font-medium border border-slate-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <section className="break-inside-avoid">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-sky-800 bg-sky-50 px-2 py-0.5 rounded inline-block mb-1.5">
              Education
            </h2>
            <div className="space-y-1.5">
              {education.map((edu, idx) => (
                <div key={edu.id || idx} className="flex flex-col sm:flex-row sm:items-baseline justify-between break-inside-avoid">
                  <div>
                    <h3 className="font-bold text-slate-900 text-[12.5px]">
                      {edu.degree || "Degree"}
                    </h3>
                    <p className="text-slate-600 text-[11.5px]">
                      {edu.institution}
                      {edu.location ? `, ${edu.location}` : ""}
                      {edu.gpa ? ` • GPA: ${edu.gpa}` : ""}
                    </p>
                  </div>
                  {edu.graduationDate && (
                    <div className="text-[11px] text-slate-500 font-medium">
                      {edu.graduationDate}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section className="break-inside-avoid">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-sky-800 bg-sky-50 px-2 py-0.5 rounded inline-block mb-1.5">
              Key Projects
            </h2>
            <div className="space-y-1.5">
              {projects.map((proj, idx) => (
                <div key={proj.id || idx} className="break-inside-avoid">
                  <div className="flex items-baseline gap-2">
                    <h3 className="font-bold text-slate-900 text-[12px]">{proj.name}</h3>
                    {proj.link && (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sky-600 hover:text-sky-800 inline-flex items-center text-xs"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    {proj.tech && (
                      <span className="text-[11px] text-slate-500 font-medium">
                        [{proj.tech}]
                      </span>
                    )}
                  </div>
                  {proj.description && (
                    <p className="text-slate-700 text-[11.5px] leading-snug mt-0.5">{proj.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <section className="break-inside-avoid">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-sky-800 bg-sky-50 px-2 py-0.5 rounded inline-block mb-1">
              Certifications
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {certifications.map((cert, idx) => (
                <div key={cert.id || idx} className="text-[11.5px] break-inside-avoid">
                  <span className="font-semibold text-slate-900">{cert.name}</span>
                  {cert.issuer && <span className="text-slate-600"> — {cert.issuer}</span>}
                  {cert.date && <span className="text-slate-500"> ({cert.date})</span>}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
