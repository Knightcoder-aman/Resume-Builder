"use client";

export default function AchievementsForm({ data, setData, onSave }) {
  const entries = data.achievements || [""];

  const updateEntry = (index, value) => {
    setData((prev) => {
      const updated = [...(prev.achievements || [""])];
      updated[index] = value;
      return { ...prev, achievements: updated };
    });
  };

  const addEntry = () => {
    setData((prev) => ({
      ...prev,
      achievements: [...(prev.achievements || []), ""],
    }));
  };

  const removeEntry = (index) => {
    setData((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="form-section">
      <div className="form-header">
        <div className="form-header-left">
          <h2>Achievements</h2>
          <p>List your notable achievements and awards.</p>
        </div>
        <button className="btn btn-primary" onClick={() => onSave("achievements")}>
          💾 Save
        </button>
      </div>

      {entries.map((entry, index) => (
        <div key={index} style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <input
            className="form-input"
            style={{ flex: 1 }}
            placeholder={`e.g., Won 1st place at XYZ Hackathon (2024)`}
            value={entry}
            onChange={(e) => updateEntry(index, e.target.value)}
          />
          {entries.length > 1 && (
            <button className="btn-remove" onClick={() => removeEntry(index)}>
              ✕
            </button>
          )}
        </div>
      ))}

      <button className="add-entry-btn" onClick={addEntry}>
        + Add Achievement
      </button>
    </div>
  );
}
