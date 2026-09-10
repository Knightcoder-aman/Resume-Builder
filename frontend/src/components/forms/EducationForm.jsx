"use client";

const emptyEducation = () => ({
  degree: "",
  university: "",
  location: "",
  startDate: "",
  endDate: "",
  gpa: "",
  coursework: "",
});

export default function EducationForm({ data, setData, onSave }) {
  const entries = data.education || [emptyEducation()];

  const updateEntry = (index, field, value) => {
    setData((prev) => {
      const updated = [...(prev.education || [emptyEducation()])];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, education: updated };
    });
  };

  const addEntry = () => {
    setData((prev) => ({
      ...prev,
      education: [...(prev.education || []), emptyEducation()],
    }));
  };

  const removeEntry = (index) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="form-section">
      <div className="form-header">
        <div className="form-header-left">
          <h2>Education</h2>
          <p>Add your educational qualifications.</p>
        </div>
        <button className="btn btn-primary" onClick={() => onSave("education")}>
          💾 Save
        </button>
      </div>

      {entries.map((entry, index) => (
        <div key={index} className="entry-card">
          <div className="entry-card-header">
            <span className="entry-card-title">Education #{index + 1}</span>
            {entries.length > 1 && (
              <button className="btn-remove" onClick={() => removeEntry(index)}>
                ✕ Remove
              </button>
            )}
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">
                Degree<span className="required">*</span>
              </label>
              <input
                className="form-input"
                placeholder="B.Tech in Computer Science"
                value={entry.degree}
                onChange={(e) => updateEntry(index, "degree", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                University / Institution<span className="required">*</span>
              </label>
              <input
                className="form-input"
                placeholder="Indian Institute of Technology"
                value={entry.university}
                onChange={(e) => updateEntry(index, "university", e.target.value)}
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
              <label className="form-label">GPA / Percentage</label>
              <input
                className="form-input"
                placeholder="8.5 / 10"
                value={entry.gpa}
                onChange={(e) => updateEntry(index, "gpa", e.target.value)}
              />
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
                onChange={(e) => updateEntry(index, "endDate", e.target.value)}
              />
            </div>
            <div className="form-group form-grid-full">
              <label className="form-label">Relevant Coursework</label>
              <input
                className="form-input"
                placeholder="Data Structures, Algorithms, Machine Learning..."
                value={entry.coursework}
                onChange={(e) => updateEntry(index, "coursework", e.target.value)}
              />
            </div>
          </div>
        </div>
      ))}

      <button className="add-entry-btn" onClick={addEntry}>
        + Add Education
      </button>
    </div>
  );
}
