import React from "react";

export default function MinimalTemplate({ data }) {
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
    <div className="minimal-template bg-white text-zinc-800 font-sans p-6 sm:p-7 leading-normal text-[12px] box-border w-full">
      {/* Resume Header */}
      <div className="resume-header mb-4">
        <h1 className="text-2xl sm:text-3xl font-light tracking-tight text-zinc-900 leading-none">
          <span className="font-semibold">{personalInfo.fullName?.split(" ")[0] || "Your"}</span>{" "}
          {personalInfo.fullName?.split(" ").slice(1).join(" ") || "Name"}
        </h1>
        {targetJob?.title && (
          <p className="text-zinc-500 text-[11px] font-normal tracking-wider uppercase mt-1">
            {targetJob.title}
          </p>
        )}

        <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] text-zinc-500 mt-2 pt-2 border-t border-zinc-100">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && (
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-700 hover:text-zinc-950 underline underline-offset-2"
            >
              LinkedIn
            </a>
          )}
          {personalInfo.portfolio && (
            <a
              href={personalInfo.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-700 hover:text-zinc-950 underline underline-offset-2"
            >
              Portfolio
            </a>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {/* Summary */}
        {summary && (
          <section className="grid grid-cols-1 md:grid-cols-4 gap-2 break-inside-avoid">
            <div className="text-[10.5px] font-semibold uppercase tracking-wider text-zinc-400">
              Profile
            </div>
            <div className="md:col-span-3 text-zinc-700 leading-relaxed text-[11.5px]">
              {summary}
            </div>
          </section>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <section className="grid grid-cols-1 md:grid-cols-4 gap-2 break-inside-avoid">
            <div className="text-[10.5px] font-semibold uppercase tracking-wider text-zinc-400">
              Experience
            </div>
            <div className="md:col-span-3 space-y-2.5">
              {experience.map((exp, idx) => (
                <div key={exp.id || idx} className="break-inside-avoid">
                  <div className="flex justify-between items-baseline">
                    <div className="font-semibold text-zinc-900 text-[12px]">
                      {exp.jobTitle}
                      {exp.company && <span className="font-normal text-zinc-500"> — {exp.company}</span>}
                    </div>
                    <div className="text-[10.5px] text-zinc-400">
                      {exp.startDate} {exp.startDate && (exp.endDate || exp.current) ? "–" : ""}{" "}
                      {exp.current ? "Present" : exp.endDate}
                    </div>
                  </div>
                  {exp.location && (
                    <div className="text-[10.5px] text-zinc-400 italic">{exp.location}</div>
                  )}
                  {exp.description && (
                    <div className="mt-0.5 text-zinc-600 text-[11.5px] space-y-0.5 leading-snug">
                      {exp.description.split("\n").map((line, lIdx) => {
                        const trimmed = line.trim();
                        if (!trimmed) return null;
                        return (
                          <div key={lIdx} className="flex items-start gap-1.5">
                            <span className="text-zinc-300 mt-0.5 leading-none">•</span>
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
          <section className="grid grid-cols-1 md:grid-cols-4 gap-2 break-inside-avoid">
            <div className="text-[10.5px] font-semibold uppercase tracking-wider text-zinc-400">
              Skills
            </div>
            <div className="md:col-span-3 text-[11.5px] text-zinc-700 leading-snug">
              {skills.join(" • ")}
            </div>
          </section>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <section className="grid grid-cols-1 md:grid-cols-4 gap-2 break-inside-avoid">
            <div className="text-[10.5px] font-semibold uppercase tracking-wider text-zinc-400">
              Education
            </div>
            <div className="md:col-span-3 space-y-1.5">
              {education.map((edu, idx) => (
                <div key={edu.id || idx} className="flex justify-between items-baseline text-[11.5px] break-inside-avoid">
                  <div>
                    <span className="font-semibold text-zinc-900">{edu.degree}</span>
                    <span className="text-zinc-500">, {edu.institution}</span>
                    {edu.gpa && <span className="text-zinc-400"> ({edu.gpa})</span>}
                  </div>
                  {edu.graduationDate && (
                    <span className="text-[10.5px] text-zinc-400">{edu.graduationDate}</span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section className="grid grid-cols-1 md:grid-cols-4 gap-2 break-inside-avoid">
            <div className="text-[10.5px] font-semibold uppercase tracking-wider text-zinc-400">
              Projects
            </div>
            <div className="md:col-span-3 space-y-1.5">
              {projects.map((proj, idx) => (
                <div key={proj.id || idx} className="text-[11.5px] break-inside-avoid">
                  <div className="font-semibold text-zinc-900">
                    {proj.name}
                    {proj.tech && <span className="font-normal text-zinc-400"> — {proj.tech}</span>}
                  </div>
                  {proj.description && (
                    <p className="text-zinc-600 mt-0.5 leading-snug">{proj.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <section className="grid grid-cols-1 md:grid-cols-4 gap-2 break-inside-avoid">
            <div className="text-[10.5px] font-semibold uppercase tracking-wider text-zinc-400">
              Credentials
            </div>
            <div className="md:col-span-3 space-y-0.5 text-[11.5px]">
              {certifications.map((cert, idx) => (
                <div key={cert.id || idx} className="text-zinc-700 break-inside-avoid">
                  <span className="font-medium text-zinc-900">{cert.name}</span>
                  {cert.issuer && <span className="text-zinc-500"> ({cert.issuer})</span>}
                  {cert.date && <span className="text-zinc-400">, {cert.date}</span>}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
