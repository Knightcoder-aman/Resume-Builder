"use client";

const emptyExperience = () => ({
  company: "",
  role: "",
  location: "",
  startDate: "",
  endDate: "",
  current: false,
  bullets: [""],
});

export default function ExperienceForm({ data, setData, onSave, onAIEnhance }) {
  const entries = data.experience || [emptyExperience()];

  const updateEntry = (index, field, value) => {
    setData((prev) => {
      const updated = [...(prev.experience || [emptyExperience()])];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, experience: updated };
    });
  };

  const updateBullet = (entryIndex, bulletIndex, value) => {
    setData((prev) => {
      const updated = [...(prev.experience || [emptyExperience()])];
      const bullets = [...updated[entryIndex].bullets];
      bullets[bulletIndex] = value;
      updated[entryIndex] = { ...updated[entryIndex], bullets };
      return { ...prev, experience: updated };
    });
  };

  const addBullet = (entryIndex) => {
    setData((prev) => {
      const updated = [...(prev.experience || [])];
      updated[entryIndex] = {
        ...updated[entryIndex],
        bullets: [...updated[entryIndex].bullets, ""],
      };
      return { ...prev, experience: updated };
    });
  };

  const removeBullet = (entryIndex, bulletIndex) => {
    setData((prev) => {
      const updated = [...(prev.experience || [])];
      updated[entryIndex] = {
        ...updated[entryIndex],
        bullets: updated[entryIndex].bullets.filter((_, i) => i !== bulletIndex),
      };
      return { ...prev, experience: updated };
    });
  };

  const addEntry = () => {
    setData((prev) => ({
      ...prev,
      experience: [...(prev.experience || []), emptyExperience()],
    }));
  };

  const removeEntry = (index) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  const handleEnhanceBullets = (index) => {
    if (onAIEnhance) {
      onAIEnhance("experience", index);
    }
  };

  return (
    <div className="form-section">
      <div className="form-header">
        <div className="form-header-left">
          <h2>Work Experience</h2>
          <p>Add your professional experience. Use AI to enhance bullet points.</p>
        </div>
        <button className="btn btn-primary" onClick={() => onSave("experience")}>
          💾 Save
        </button>
      </div>

      {entries.map((entry, index) => (
        <div key={index} className="entry-card">
          <div className="entry-card-header">
            <span className="entry-card-title">
              Experience #{index + 1}
            </span>
            <div className="entry-card-actions">
              <button
                className="ai-enhance-btn"
                onClick={() => handleEnhanceBullets(index)}
                title="AI will enhance your bullet points with action verbs and metrics"
              >
                ✨ AI Enhance
              </button>
              {entries.length > 1 && (
                <button className="btn-remove" onClick={() => removeEntry(index)}>
                  ✕ Remove
                </button>
              )}
            </div>
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">
                Company<span className="required">*</span>
              </label>
              <input
                className="form-input"
                placeholder="Google, Microsoft, etc."
                value={entry.company}
                onChange={(e) => updateEntry(index, "company", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                Role / Title<span className="required">*</span>
              </label>
              <input
                className="form-input"
                placeholder="Software Engineer"
                value={entry.role}
                onChange={(e) => updateEntry(index, "role", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Location</label>
              <input
                className="form-input"
                placeholder="City, State"
                value={entry.location}
                onChange={(e) => updateEntry(index, "location", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                <input
                  type="checkbox"
                  checked={entry.current}
                  onChange={(e) => updateEntry(index, "current", e.target.checked)}
                  style={{ marginRight: 6 }}
                />
                Currently working here
              </label>
            </div>
            <div className="form-group">
              <label className="form-label">Start Date</label>
              <input
                className="form-input"
                type="month"
                value={entry.startDate}
                onChange={(e) => updateEntry(index, "startDate", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">End Date</label>
              <input
                className="form-input"
                type="month"
                value={entry.endDate}
                disabled={entry.current}
                onChange={(e) => updateEntry(index, "endDate", e.target.value)}
              />
            </div>
          </div>

          <div className="form-group" style={{ marginTop: 16 }}>
            <label className="form-label">
              Bullet Points <span className="ai-badge">✨ AI Enhanced</span>
            </label>
            {entry.bullets.map((bullet, bIdx) => (
              <div key={bIdx} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                <input
                  className="form-input"
                  style={{ flex: 1 }}
                  placeholder={`Describe your achievement or responsibility...`}
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
        + Add Experience
      </button>
    </div>
  );
}
