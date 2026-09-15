"use client";

import { useState } from "react";

export default function SummaryForm({ data, setData, onSave, onAIEnhance }) {
  const summary = data.summary || "";
  const [isGenerating, setIsGenerating] = useState(false);

  const handleChange = (e) => {
    setData((prev) => ({
      ...prev,
      summary: e.target.value,
    }));
  };

  const wordCount = summary.trim() ? summary.trim().split(/\s+/).length : 0;
  const charCount = summary.length;

  const handleSmartSummary = async () => {
    if (onAIEnhance) {
      onAIEnhance();
      return;
    }

    // Quick intelligent template generation based on existing role / skills
    setIsGenerating(true);
    try {
      const personalName = data.personal?.name || "Professional";
      const experienceFirst = data.experience?.[0];
      const role = experienceFirst?.role || "Software Developer";
      const topSkills = data.skills?.languages || data.skills?.techStack || "modern technologies and frameworks";
      
      const suggested = `Results-driven ${role} with a solid foundation in ${topSkills}. Proven track record of designing, developing, and deploying robust, scalable applications. Adept at problem-solving, clean code craftsmanship, and collaborating in fast-paced engineering environments to deliver high-impact products.`;
      
      setData((prev) => ({
        ...prev,
        summary: suggested,
      }));
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="form-section">
      <div className="form-header">
        <div className="form-header-left">
          <h2>Professional Summary</h2>
          <p>
            Write a concise 2–4 sentence summary highlighting your expertise, achievements, and career focus.
          </p>
        </div>
        <div className="form-header-actions">
          <button
            type="button"
            className="btn btn-purple"
            onClick={handleSmartSummary}
            disabled={isGenerating}
            title="Generate or enhance professional summary with AI"
          >
            ✨ {isGenerating ? "Generating..." : "AI Generate Summary"}
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => onSave("summary")}
          >
            💾 Save
          </button>
        </div>
      </div>

      <div className="form-card">
        <div className="card-header-clean">
          <div>
            <h3 className="card-title">Summary Statement</h3>
            <p className="card-subtitle">
              This will appear right after your personal details at the top of your resume.
            </p>
          </div>
          <div className="text-counts">
            <span className="count-badge">{wordCount} words</span>
            <span className="count-badge">{charCount} characters</span>
          </div>
        </div>

        <div className="form-group full-width" style={{ marginTop: "12px" }}>
          <textarea
            className="form-textarea summary-textarea"
            rows={6}
            placeholder="e.g. Versatile Software Engineer with 2+ years of experience specializing in React, Next.js, and Python. Passionate about architecting scalable web applications, optimizing performance, and building intuitive user experiences."
            value={summary}
            onChange={handleChange}
          />
        </div>

        <div className="summary-tips-box">
          <span className="tips-icon">💡</span>
          <div className="tips-content">
            <strong>Pro Tip:</strong> Keep your summary between 40–80 words. Focus on your strongest tech stack, years of experience, and quantifiable achievements.
          </div>
        </div>
      </div>
    </div>
  );
}
