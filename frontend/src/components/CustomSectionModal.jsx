"use client";

import { useState } from "react";

const SUGGESTED_SECTIONS = [
  { title: "Certifications", icon: "📜" },
  { title: "Publications", icon: "📚" },
  { title: "Volunteer Work", icon: "🤝" },
  { title: "Leadership", icon: "👥" },
  { title: "Awards & Honors", icon: "🎖️" },
  { title: "Open Source", icon: "🌐" },
];

const AVAILABLE_ICONS = ["📜", "📚", "🤝", "👥", "🎖️", "🌐", "💡", "🎯", "🔬", "🚀", "⚡", "📌"];

export default function CustomSectionModal({ isOpen, onClose, onAddSection }) {
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState("📜");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanTitle = title.trim();
    if (!cleanTitle) {
      setError("Please enter a section title");
      return;
    }
    onAddSection(cleanTitle, icon);
    setTitle("");
    setIcon("📜");
    setError("");
    onClose();
  };

  const handleSelectSuggested = (item) => {
    setTitle(item.title);
    setIcon(item.icon);
    setError("");
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card custom-section-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3 className="modal-title">Add Custom Section</h3>
            <p className="modal-subtitle">
              Add a new tailored section to your resume.
            </p>
          </div>
          <button type="button" className="btn-close-modal" onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-group">
            <label className="form-label">Suggested Sections</label>
            <div className="suggested-pills">
              {SUGGESTED_SECTIONS.map((s, idx) => (
                <button
                  type="button"
                  key={idx}
                  className={`suggested-pill ${title === s.title ? "active" : ""}`}
                  onClick={() => handleSelectSuggested(s)}
                >
                  <span>{s.icon}</span>
                  <span>{s.title}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Section Title<span className="required">*</span>
            </label>
            <input
              className="form-input"
              type="text"
              placeholder="e.g. Certifications & Licenses"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError("");
              }}
              autoFocus
            />
            {error && <span className="input-error-msg">{error}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Choose an Icon</label>
            <div className="icon-selector-grid">
              {AVAILABLE_ICONS.map((ic, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`icon-choice-btn ${icon === ic ? "selected" : ""}`}
                  onClick={() => setIcon(ic)}
                >
                  {ic}
                </button>
              ))}
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              + Add Section
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
