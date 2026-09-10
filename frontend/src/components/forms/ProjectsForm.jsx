"use client";

const emptyProject = () => ({
  name: "",
  description: "",
  technologies: "",
  link: "",
  bullets: [""],
});

export default function ProjectsForm({ data, setData, onSave }) {
  const entries = data.projects || [emptyProject()];

  const updateEntry = (index, field, value) => {
    setData((prev) => {
      const updated = [...(prev.projects || [emptyProject()])];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, projects: updated };
    });
  };

  const updateBullet = (entryIndex, bulletIndex, value) => {
    setData((prev) => {
      const updated = [...(prev.projects || [emptyProject()])];
      const bullets = [...updated[entryIndex].bullets];
      bullets[bulletIndex] = value;
      updated[entryIndex] = { ...updated[entryIndex], bullets };
      return { ...prev, projects: updated };
    });
  };

  const addBullet = (entryIndex) => {
    setData((prev) => {
      const updated = [...(prev.projects || [])];
      updated[entryIndex] = {
        ...updated[entryIndex],
        bullets: [...updated[entryIndex].bullets, ""],
      };
      return { ...prev, projects: updated };
    });
  };

  const removeBullet = (entryIndex, bulletIndex) => {
    setData((prev) => {
      const updated = [...(prev.projects || [])];
      updated[entryIndex] = {
        ...updated[entryIndex],
        bullets: updated[entryIndex].bullets.filter((_, i) => i !== bulletIndex),
      };
      return { ...prev, projects: updated };
    });
  };

  const addEntry = () => {
    setData((prev) => ({
      ...prev,
      projects: [...(prev.projects || []), emptyProject()],
    }));
  };

  const removeEntry = (index) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="form-section">
      <div className="form-header">
        <div className="form-header-left">
          <h2>Projects</h2>
          <p>Showcase your best projects.</p>
        </div>
        <button className="btn btn-primary" onClick={() => onSave("projects")}>
          💾 Save
        </button>
      </div>

      {entries.map((entry, index) => (
        <div key={index} className="entry-card">
          <div className="entry-card-header">
            <span className="entry-card-title">Project #{index + 1}</span>
            {entries.length > 1 && (
              <button className="btn-remove" onClick={() => removeEntry(index)}>
                ✕ Remove
              </button>
            )}
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">
                Project Name<span className="required">*</span>
              </label>
              <input
                className="form-input"
                placeholder="Movie Recommendation System"
                value={entry.name}
                onChange={(e) => updateEntry(index, "name", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Technologies Used</label>
              <input
                className="form-input"
                placeholder="Python, React, TensorFlow..."
                value={entry.technologies}
                onChange={(e) => updateEntry(index, "technologies", e.target.value)}
              />
            </div>
            <div className="form-group form-grid-full">
              <label className="form-label">Project Link</label>
              <input
                className="form-input"
                type="url"
                placeholder="https://github.com/yourproject"
                value={entry.link}
                onChange={(e) => updateEntry(index, "link", e.target.value)}
              />
            </div>
          </div>

          <div className="form-group" style={{ marginTop: 16 }}>
            <label className="form-label">Description / Bullet Points</label>
            {entry.bullets.map((bullet, bIdx) => (
              <div key={bIdx} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                <input
                  className="form-input"
                  style={{ flex: 1 }}
                  placeholder="Describe what you built, impact, etc."
                  value={bullet}
                  onChange={(e) => updateBullet(index, bIdx, e.target.value)}
                />
                {entry.bullets.length > 1 && (
                  <button
                    className="btn-remove"
                    onClick={() => removeBullet(index, bIdx)}
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button
              className="add-entry-btn"
              style={{ marginBottom: 0 }}
              onClick={() => addBullet(index)}
            >
              + Add Bullet Point
            </button>
          </div>
        </div>
      ))}

      <button className="add-entry-btn" onClick={addEntry}>
        + Add Project
      </button>
    </div>
  );
}
