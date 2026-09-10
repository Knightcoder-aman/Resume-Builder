"use client";

import { useState } from "react";

export const SECTION_METADATA = {
  personal: { id: "personal", label: "Personal Details", icon: "👤", fixed: true },
  education: { id: "education", label: "Education", icon: "🎓" },
  experience: { id: "experience", label: "Experience", icon: "💼" },
  projects: { id: "projects", label: "Projects", icon: "💻" },
  skills: { id: "skills", label: "Skills", icon: "🔧" },
  achievements: { id: "achievements", label: "Achievements", icon: "🏆" },
  extracurricular: { id: "extracurricular", label: "Extra Curricular", icon: "➕" },
};

export const DEFAULT_SECTION_ORDER = [
  "education",
  "experience",
  "projects",
  "skills",
  "achievements",
  "extracurricular",
];

export const TABS = [
  SECTION_METADATA.personal,
  SECTION_METADATA.education,
  SECTION_METADATA.experience,
  SECTION_METADATA.projects,
  SECTION_METADATA.skills,
  SECTION_METADATA.achievements,
  SECTION_METADATA.extracurricular,
];

export default function Sidebar({
  activeTab,
  setActiveTab,
  savedTabs = {},
  sectionOrder = DEFAULT_SECTION_ORDER,
  sectionVisibility = {},
  onReorderSections,
  onMoveSection,
  onToggleSection,
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
    // Only clear if leaving the current target entirely
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

  return (
    <nav className="sidebar">
      {/* Header section: Personal Details */}
      <div className="sidebar-section-label">General</div>
      <button
        type="button"
        className={`sidebar-tab sidebar-tab-pinned ${activeTab === "personal" ? "active" : ""}`}
        onClick={() => setActiveTab("personal")}
      >
        <span className="sidebar-tab-icon">{personalTab.icon}</span>
        <span className="sidebar-tab-content">
          <span className="sidebar-tab-label">{personalTab.label}</span>
          {savedTabs["personal"] && (
            <span className="sidebar-saved" title="Saved">
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              saved
            </span>
          )}
        </span>
      </button>

      <div className="sidebar-divider" />

      {/* Moveable & Toggleable Sections */}
      <div className="sidebar-section-header">
        <span className="sidebar-section-label">Resume Sections</span>
        <span className="sidebar-sub-hint" title="Drag or use arrows to reorder. Toggle to show/hide.">
          Drag & Toggle
        </span>
      </div>

      <div className="sidebar-reorder-list">
        {sectionOrder.map((sectionId, index) => {
          const tab = SECTION_METADATA[sectionId];
          if (!tab) return null;

          const isEnabled = sectionVisibility[sectionId] !== false;
          const isDragging = draggedId === sectionId;
          const isDragOver = dragOverInfo.id === sectionId;
          const dragPos = isDragOver ? dragOverInfo.position : null;
          const isFirst = index === 0;
          const isLast = index === sectionOrder.length - 1;

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
                  title="Drag to reorder section"
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
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
                    {!isEnabled && <span className="sidebar-disabled-badge">Hidden</span>}
                  </span>

                  <div className="sidebar-tab-actions" onClick={(e) => e.stopPropagation()}>
                    {/* Saved indicator */}
                    {savedTabs[tab.id] && isEnabled && (
                      <span className="sidebar-saved sidebar-saved-dot" title="Saved">
                        <svg viewBox="0 0 20 20" fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    )}

                    {/* Quick Move Up/Down Controls */}
                    <div className="sidebar-move-controls">
                      <button
                        type="button"
                        className="sidebar-move-btn"
                        onClick={() => onMoveSection && onMoveSection(tab.id, "up")}
                        disabled={isFirst}
                        title="Move up"
                        aria-label={`Move ${tab.label} up`}
                      >
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="18 15 12 9 6 15" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="sidebar-move-btn"
                        onClick={() => onMoveSection && onMoveSection(tab.id, "down")}
                        disabled={isLast}
                        title="Move down"
                        aria-label={`Move ${tab.label} down`}
                      >
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>
                    </div>

                    {/* Toggle Switch */}
                    <button
                      type="button"
                      role="switch"
                      aria-checked={isEnabled}
                      className={`section-toggle ${isEnabled ? "is-on" : "is-off"}`}
                      onClick={() => onToggleSection && onToggleSection(tab.id)}
                      title={isEnabled ? "Disable section (exclude from resume)" : "Enable section (include in resume)"}
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
    </nav>
  );
}
