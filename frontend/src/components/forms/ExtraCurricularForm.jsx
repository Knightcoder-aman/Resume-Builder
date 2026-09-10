"use client";

export default function ExtraCurricularForm({ data, setData, onSave }) {
  const entries = data.extracurricular || [""];

  const updateEntry = (index, value) => {
    setData((prev) => {
      const updated = [...(prev.extracurricular || [""])];
      updated[index] = value;
      return { ...prev, extracurricular: updated };
    });
  };

  const addEntry = () => {
    setData((prev) => ({
      ...prev,
      extracurricular: [...(prev.extracurricular || []), ""],
    }));
  };

  const removeEntry = (index) => {
    setData((prev) => ({
      ...prev,
      extracurricular: prev.extracurricular.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="form-section">
      <div className="form-header">
        <div className="form-header-left">
          <h2>Extra Curricular</h2>
          <p>Add your extracurricular activities, volunteer work, etc.</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => onSave("extracurricular")}
        >
          💾 Save
        </button>
      </div>

      {entries.map((entry, index) => (
        <div key={index} style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <input
            className="form-input"
            style={{ flex: 1 }}
            placeholder={`e.g., Technical Lead at Coding Club (2023-2024)`}
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
        + Add Activity
      </button>
    </div>
  );
}
