"use client";

import { useState } from "react";

export default function CustomSectionForm({
  sectionId,
  sectionConfig,
  data,
  setData,
  onSave,
  onDeleteSection,
}) {
  const customSections = data.custom_sections || {};
  const currentSection = customSections[sectionId] || {
    title: sectionConfig?.title || "Custom Section",
    icon: sectionConfig?.icon || "📌",
    items: [
      {
        title: "",
        subtitle: "",
        date: "",
        location: "",
        bullets: [""],
      },
    ],
  };

  const [title, setTitle] = useState(currentSection.title || sectionConfig?.title || "Custom Section");

  const updateSectionData = (updatedSection) => {
    setData((prev) => ({
      ...prev,
      custom_sections: {
        ...(prev.custom_sections || {}),
        [sectionId]: updatedSection,
      },
    }));
  };

  const handleTitleChange = (val) => {
    setTitle(val);
    updateSectionData({
      ...currentSection,
      title: val,
    });
  };

  const handleItemChange = (index, field, value) => {
    const items = [...(currentSection.items || [])];
    items[index] = { ...items[index], [field]: value };
    updateSectionData({ ...currentSection, items });
  };

  const handleBulletChange = (itemIndex, bulletIndex, value) => {
    const items = [...(currentSection.items || [])];
    const bullets = [...(items[itemIndex].bullets || [""])];
    bullets[bulletIndex] = value;
    items[itemIndex] = { ...items[itemIndex], bullets };
    updateSectionData({ ...currentSection, items });
  };

  const handleAddBullet = (itemIndex) => {
    const items = [...(currentSection.items || [])];
    const bullets = [...(items[itemIndex].bullets || []), ""];
    items[itemIndex] = { ...items[itemIndex], bullets };
    updateSectionData({ ...currentSection, items });
  };

  const handleRemoveBullet = (itemIndex, bulletIndex) => {
    const items = [...(currentSection.items || [])];
    const bullets = (items[itemIndex].bullets || []).filter((_, idx) => idx !== bulletIndex);
    items[itemIndex] = {
      ...items[itemIndex],
      bullets: bullets.length > 0 ? bullets : [""],
    };
    updateSectionData({ ...currentSection, items });
  };

  const handleAddItem = () => {
    const items = [
      ...(currentSection.items || []),
      {
        title: "",
        subtitle: "",
        date: "",
        location: "",
        bullets: [""],
      },
    ];
    updateSectionData({ ...currentSection, items });
  };

  const handleRemoveItem = (index) => {
    const items = (currentSection.items || []).filter((_, idx) => idx !== index);
    updateSectionData({
      ...currentSection,
      items: items.length > 0 ? items : [{ title: "", subtitle: "", date: "", location: "", bullets: [""] }],
    });
  };

  return (
    <div className="form-section">
      <div className="form-header">
        <div className="form-header-left">
          <div className="custom-section-title-row">
            <span className="custom-section-icon-large">{currentSection.icon || "📌"}</span>
            <h2>{title || "Custom Section"}</h2>
          </div>
          <p>Manage entries and details for this custom section.</p>
        </div>
        <div className="form-header-actions">
          <button
            type="button"
            className="btn btn-danger-outline"
            onClick={() => onDeleteSection(sectionId)}
            title="Delete this section"
          >
            🗑️ Delete Section
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => onSave(sectionId)}
          >
            💾 Save
          </button>
        </div>
      </div>

      <div className="form-card" style={{ marginBottom: "20px" }}>
        <h3 className="card-title">Section Settings</h3>
        <p className="card-subtitle">
          Customize the title that will appear in your resume header for this section.
        </p>
        <div className="form-grid" style={{ marginTop: "14px" }}>
          <div className="form-group">
            <label className="form-label">
              Section Title<span className="required">*</span>
            </label>
            <input
              className="form-input"
              type="text"
              placeholder="e.g. Certifications, Publications, Volunteering"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
            />
          </div>
        </div>
      </div>

      {(currentSection.items || []).map((item, idx) => (
        <div key={idx} className="form-card entry-card" style={{ marginBottom: "20px" }}>
          <div className="entry-card-header">
            <h4 className="entry-index-title">
              Item #{idx + 1} {item.title ? `— ${item.title}` : ""}
            </h4>
            {(currentSection.items || []).length > 1 && (
              <button
                type="button"
                className="btn-remove-entry"
                onClick={() => handleRemoveItem(idx)}
                title="Remove item"
              >
                ✕ Remove
              </button>
            )}
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Title / Heading</label>
              <input
                className="form-input"
                type="text"
                placeholder="e.g. AWS Certified Solutions Architect or Publication Title"
                value={item.title || ""}
                onChange={(e) => handleItemChange(idx, "title", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Subtitle / Organization</label>
              <input
                className="form-input"
                type="text"
                placeholder="e.g. Amazon Web Services or IEEE Conference"
                value={item.subtitle || ""}
                onChange={(e) => handleItemChange(idx, "subtitle", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Date / Timeline</label>
              <input
                className="form-input"
                type="text"
                placeholder="e.g. May 2024 or 2023 – 2024"
                value={item.date || ""}
                onChange={(e) => handleItemChange(idx, "date", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Location</label>
              <input
                className="form-input"
                type="text"
                placeholder="e.g. Online or San Francisco, CA"
                value={item.location || ""}
                onChange={(e) => handleItemChange(idx, "location", e.target.value)}
              />
            </div>
          </div>

          <div className="bullets-section" style={{ marginTop: "16px" }}>
            <label className="form-label" style={{ marginBottom: "8px" }}>
              Bullet Points / Description
            </label>
            {(item.bullets || [""]).map((bullet, bIdx) => (
              <div key={bIdx} className="bullet-row">
                <span className="bullet-dot">•</span>
                <input
                  className="form-input"
                  type="text"
                  placeholder="Key highlight, achievement, or summary detail..."
                  value={bullet}
                  onChange={(e) => handleBulletChange(idx, bIdx, e.target.value)}
                />
                {(item.bullets || []).length > 1 && (
                  <button
                    type="button"
                    className="btn-icon btn-remove"
                    onClick={() => handleRemoveBullet(idx, bIdx)}
                    title="Remove bullet"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="btn btn-sm btn-outline"
              style={{ marginTop: "8px" }}
              onClick={() => handleAddBullet(idx)}
            >
              + Add Bullet Point
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        className="btn btn-outline full-width-btn"
        onClick={handleAddItem}
        style={{ width: "100%", padding: "14px", borderStyle: "dashed" }}
      >
        + Add Another Item
      </button>
    </div>
  );
}
