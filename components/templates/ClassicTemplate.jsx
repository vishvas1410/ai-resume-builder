import React from "react";

export default function ClassicTemplate({ data }) {
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

  // Build contact line
  const contactParts = [
    personalInfo.phone,
    personalInfo.email,
    personalInfo.location,
    personalInfo.linkedin ? personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, "") : null,
    personalInfo.portfolio ? personalInfo.portfolio.replace(/^https?:\/\/(www\.)?/, "") : null,
  ].filter(Boolean);

  return (
    <div className="classic-template bg-white text-gray-900 font-serif p-6 sm:p-7 leading-normal text-[12.5px] box-border w-full">
      {/* Resume Header */}
      <div className="resume-header text-center pb-2.5 border-b-2 border-gray-900 mb-3.5">
        <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-wider text-gray-950 leading-none">
          {personalInfo.fullName || "Your Full Name"}
        </h1>
        {targetJob?.title && (
          <p className="text-gray-700 italic text-xs mt-1 tracking-normal">
            {targetJob.title}
          </p>
        )}
        <div className="text-[11.5px] text-gray-700 mt-1.5 flex flex-wrap justify-center gap-x-2 gap-y-0.5">
          {contactParts.map((item, idx) => (
            <React.Fragment key={idx}>
              <span>{item}</span>
              {idx < contactParts.length - 1 && <span className="text-gray-400">•</span>}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {/* Professional Summary */}
        {summary && (
          <section className="break-inside-avoid">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-900 border-b border-gray-400 pb-0.5 mb-1.5">
              Professional Summary
            </h2>
            <p className="text-gray-800 text-[12px] leading-relaxed text-justify">
              {summary}
            </p>
          </section>
        )}

        {/* Work Experience */}
        {experience && experience.length > 0 && (
          <section className="break-inside-avoid">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-900 border-b border-gray-400 pb-0.5 mb-2">
              Professional Experience
            </h2>
            <div className="space-y-2.5">
              {experience.map((exp, idx) => (
                <div key={exp.id || idx} className="break-inside-avoid">
                  <div className="flex justify-between items-baseline text-[12.5px]">
                    <span className="font-bold text-gray-950">
                      {exp.company}
                      {exp.location ? <span className="font-normal text-gray-700">, {exp.location}</span> : ""}
                    </span>
                    <span className="text-[11px] italic text-gray-700">
                      {exp.startDate} {exp.startDate && (exp.endDate || exp.current) ? "–" : ""}{" "}
                      {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <div className="text-[11.5px] italic font-semibold text-gray-800">
                    {exp.jobTitle}
                  </div>
                  {exp.description && (
                    <ul className="list-disc ml-4 mt-0.5 text-[11.5px] text-gray-800 space-y-0.5 leading-snug">
                      {exp.description.split("\n").map((line, lIdx) => {
                        const trimmed = line.trim();
                        if (!trimmed) return null;
                        return (
                          <li key={lIdx}>
                            {trimmed.replace(/^[•\-\*]\s*/, "")}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <section className="break-inside-avoid">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-900 border-b border-gray-400 pb-0.5 mb-1.5">
              Education
            </h2>
            <div className="space-y-1.5">
              {education.map((edu, idx) => (
                <div key={edu.id || idx} className="flex justify-between items-baseline text-[11.5px] break-inside-avoid">
                  <div>
                    <span className="font-bold text-gray-900">{edu.institution}</span>
                    {edu.location && <span className="text-gray-700"> — {edu.location}</span>}
                    <div className="italic text-gray-800">
                      {edu.degree}
                      {edu.gpa && <span className="not-italic text-gray-600"> (GPA: {edu.gpa})</span>}
                    </div>
                  </div>
                  {edu.graduationDate && (
                    <span className="italic text-gray-700">{edu.graduationDate}</span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Technical & Core Skills */}
        {skills && skills.length > 0 && (
          <section className="break-inside-avoid">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-900 border-b border-gray-400 pb-0.5 mb-1.5">
              Skills & Expertise
            </h2>
            <p className="text-[11.5px] text-gray-800 leading-snug">
              <span className="font-bold">Core Competencies: </span>
              {skills.join(" • ")}
            </p>
          </section>
        )}

        {/* Key Projects */}
        {projects && projects.length > 0 && (
          <section className="break-inside-avoid">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-900 border-b border-gray-400 pb-0.5 mb-1.5">
              Selected Projects
            </h2>
            <div className="space-y-1.5 text-[11.5px]">
              {projects.map((proj, idx) => (
                <div key={proj.id || idx} className="break-inside-avoid">
                  <div className="font-bold text-gray-950">
                    {proj.name}
                    {proj.tech && (
                      <span className="font-normal italic text-gray-600"> | {proj.tech}</span>
                    )}
                  </div>
                  {proj.description && (
                    <p className="text-gray-800 mt-0.5 leading-snug">{proj.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <section className="break-inside-avoid">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-900 border-b border-gray-400 pb-0.5 mb-1.5">
              Honors & Certifications
            </h2>
            <ul className="list-disc ml-4 text-[11.5px] text-gray-800 space-y-0.5">
              {certifications.map((cert, idx) => (
                <li key={cert.id || idx} className="break-inside-avoid">
                  <span className="font-semibold">{cert.name}</span>
                  {cert.issuer && <span> — {cert.issuer}</span>}
                  {cert.date && <span className="text-gray-600"> ({cert.date})</span>}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
