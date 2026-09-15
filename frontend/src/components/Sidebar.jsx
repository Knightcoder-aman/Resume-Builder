"use client";

import { useState } from "react";

export const SECTION_METADATA = {
  personal: { id: "personal", label: "Personal Details", icon: "👤", fixed: true },
  summary: { id: "summary", label: "Summary", icon: "☰" },
  education: { id: "education", label: "Education", icon: "🎓" },
  experience: { id: "experience", label: "Experience", icon: "💼" },
  projects: { id: "projects", label: "Projects", icon: "</>" },
  skills: { id: "skills", label: "Skills", icon: "🔧" },
  achievements: { id: "achievements", label: "Achievements", icon: "🏆" },
  extracurricular: { id: "extracurricular", label: "Extra Curricular", icon: "➕" },
};

export const DEFAULT_SECTION_ORDER = [
  "summary",
  "education",
  "experience",
  "projects",
  "skills",
  "achievements",
  "extracurricular",
];

export default function Sidebar({
  activeTab,
  setActiveTab,
  savedTabs = {},
  sectionOrder = DEFAULT_SECTION_ORDER,
  sectionVisibility = {},
  customSections = {},
  completeness = { percentage: 75, completedCount: 6, totalCount: 8 },
  onReorderSections,
  onMoveSection,
  onToggleSection,
  onOpenAddCustomModal,
  onDeleteCustomSection,
}) {
  const [draggedId, setDraggedId] = useState(null);
  const [dragOverInfo, setDragOverInfo] = useState({ id: null, position: null });

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("text/plain", id);
    e.dataTransfer.effectAllowed = "move";
    setDraggedId(id);
  };

  const handleDragOver = (e, id) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (!draggedId || draggedId === id) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const midY = rect.top + rect.height / 2;
    const position = e.clientY < midY ? "before" : "after";

    if (dragOverInfo.id !== id || dragOverInfo.position !== position) {
      setDragOverInfo({ id, position });
    }
  };

  const handleDragLeave = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDragOverInfo({ id: null, position: null });
    }
  };

  const handleDrop = (e, targetId) => {
    e.preventDefault();
    if (draggedId && draggedId !== targetId && onReorderSections) {
      onReorderSections(draggedId, targetId, dragOverInfo.position || "after");
    }
    setDraggedId(null);
    setDragOverInfo({ id: null, position: null });
  };

  const handleDragEnd = () => {
    setDraggedId(null);
    setDragOverInfo({ id: null, position: null });
  };

  const personalTab = SECTION_METADATA.personal;
  const isPersonalActive = activeTab === "personal";
  const isPersonalComplete = Boolean(savedTabs["personal"]);

  // Calculate visible sections count
  const visibleCount = sectionOrder.filter((id) => sectionVisibility[id] !== false).length;

  return (
    <nav className="sidebar">
      {/* Top Card: Resume Completeness Widget */}
      <div className="completeness-card">
        <div className="completeness-header">
          <span className="completeness-title">Resume completeness</span>
          <span className="completeness-percentage">{completeness.percentage}%</span>
        </div>
        <div className="completeness-progress-track">
          <div
            className="completeness-progress-fill"
            style={{ width: `${completeness.percentage}%` }}
          />
        </div>
        <div className="completeness-subtitle">
          {completeness.completedCount} of {completeness.totalCount} sections ready to export
        </div>
      </div>

      {/* General Section */}
      <div className="sidebar-group-header">
        <span className="sidebar-group-caret">⌄</span>
        <span className="sidebar-group-label">GENERAL</span>
      </div>

      <button
        type="button"
        className={`sidebar-tab ${isPersonalActive ? "active" : ""}`}
        onClick={() => setActiveTab("personal")}
      >
        <span className="sidebar-tab-icon">{personalTab.icon}</span>
        <span className="sidebar-tab-content">
          <span className="sidebar-tab-label">{personalTab.label}</span>
          {isPersonalComplete && (
            <span className="badge-complete">
              <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              complete
            </span>
          )}
        </span>
      </button>

      {/* Resume Sections */}
      <div className="sidebar-group-header" style={{ marginTop: "18px" }}>
        <div className="sidebar-group-title-row">
          <span className="sidebar-group-caret">⌄</span>
          <span className="sidebar-group-label">RESUME SECTIONS</span>
        </div>
        <span className="sidebar-group-count">{visibleCount} shown</span>
      </div>

      <div className="sidebar-reorder-list">
        {sectionOrder.map((sectionId, index) => {
          const tabMeta = SECTION_METADATA[sectionId];
          const customMeta = customSections[sectionId];
          const tab = tabMeta || (customMeta ? { id: sectionId, label: customMeta.title, icon: customMeta.icon } : null);

          if (!tab) return null;

          const isEnabled = sectionVisibility[sectionId] !== false;
          const isDragging = draggedId === sectionId;
          const isDragOver = dragOverInfo.id === sectionId;
          const dragPos = isDragOver ? dragOverInfo.position : null;
          const isFirst = index === 0;
          const isLast = index === sectionOrder.length - 1;
          const isCustom = !tabMeta;

          return (
            <div
              key={tab.id}
              className={`sidebar-item-wrapper ${isDragging ? "is-dragging" : ""} ${
                dragPos ? `drag-over-${dragPos}` : ""
              }`}
              onDragOver={(e) => handleDragOver(e, tab.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, tab.id)}
            >
              <div
                className={`sidebar-tab ${activeTab === tab.id ? "active" : ""} ${
                  !isEnabled ? "is-disabled" : ""
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {/* Drag Grip Handle */}
                <div
                  className="sidebar-drag-handle"
                  draggable
                  onDragStart={(e) => handleDragStart(e, tab.id)}
                  onDragEnd={handleDragEnd}
                  title="Drag to reorder"
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="8" cy="5" r="2.2" />
                    <circle cx="8" cy="12" r="2.2" />
                    <circle cx="8" cy="19" r="2.2" />
                    <circle cx="16" cy="5" r="2.2" />
                    <circle cx="16" cy="12" r="2.2" />
                    <circle cx="16" cy="19" r="2.2" />
                  </svg>
                </div>

                <span className="sidebar-tab-icon">{tab.icon}</span>

                <span className="sidebar-tab-content">
                  <span className="sidebar-tab-info">
                    <span className="sidebar-tab-label">{tab.label}</span>
                  </span>

                  <div className="sidebar-tab-actions" onClick={(e) => e.stopPropagation()}>
                    {/* Status: either checkmark complete or HIDDEN badge */}
                    {!isEnabled ? (
                      <span className="badge-hidden">HIDDEN</span>
                    ) : savedTabs[tab.id] ? (
                      <span className="badge-check" title="Section completed">
                        <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    ) : null}

                    {/* Move Up/Down Controls */}
                    <div className="sidebar-move-controls">
                      <button
                        type="button"
                        className="sidebar-move-btn"
                        onClick={() => onMoveSection && onMoveSection(tab.id, "up")}
                        disabled={isFirst}
                        title="Move up"
                        aria-label={`Move ${tab.label} up`}
                      >
                        ▲
                      </button>
                      <button
                        type="button"
                        className="sidebar-move-btn"
                        onClick={() => onMoveSection && onMoveSection(tab.id, "down")}
                        disabled={isLast}
                        title="Move down"
                        aria-label={`Move ${tab.label} down`}
                      >
                        ▼
                      </button>
                    </div>

                    {/* Toggle Switch */}
                    <button
                      type="button"
                      role="switch"
                      aria-checked={isEnabled}
                      className={`section-toggle ${isEnabled ? "is-on" : "is-off"}`}
                      onClick={() => onToggleSection && onToggleSection(tab.id)}
                      title={isEnabled ? "Disable section (hide from resume)" : "Enable section (show in resume)"}
                    >
                      <span className="toggle-track">
                        <span className="toggle-thumb" />
                      </span>
                    </button>
                  </div>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Custom Section Button */}
      <button
        type="button"
        className="btn-add-custom-section"
        onClick={onOpenAddCustomModal}
      >
        <span className="plus-icon">+</span>
        <span>Add custom section</span>
      </button>
    </nav>
  );
}
