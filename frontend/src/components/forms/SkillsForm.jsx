"use client";

export default function SkillsForm({ data, setData, onSave }) {
  const s = data.skills || {};

  const update = (field, value) => {
    setData((prev) => ({
      ...prev,
      skills: { ...(prev.skills || {}), [field]: value },
    }));
  };

  // Custom skills management
  const customSkills = s.custom || [];

  const addCustomSkill = () => {
    const newItem = { id: Date.now(), label: "", value: "" };
    setData((prev) => ({
      ...prev,
      skills: {
        ...(prev.skills || {}),
        custom: [...((prev.skills && prev.skills.custom) || []), newItem],
      },
    }));
  };

  const updateCustomSkill = (index, field, value) => {
    setData((prev) => {
      const updated = [...((prev.skills && prev.skills.custom) || [])];
      updated[index] = { ...updated[index], [field]: value };
      return {
        ...prev,
        skills: { ...(prev.skills || {}), custom: updated },
      };
    });
  };

  const removeCustomSkill = (index) => {
    setData((prev) => {
      const updated = [...((prev.skills && prev.skills.custom) || [])].filter(
        (_, i) => i !== index
      );
      return {
        ...prev,
        skills: { ...(prev.skills || {}), custom: updated },
      };
    });
  };

  return (
    <div className="form-section">
      <div className="form-header">
        <div className="form-header-left">
          <h2>Technical Skills</h2>
          <p>Enter skills separated by commas.</p>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => onSave("skills")}
        >
          💾 Save
        </button>
      </div>

      <div className="form-card">
        <div className="form-grid">
          {/* Programming Languages */}
          <div className="form-group">
            <label className="form-label">
              Languages <span className="required">*</span>
            </label>
            <input
              className="form-input"
              placeholder="Python, SQL, C++, JavaScript, Java..."
              value={s.languages || ""}
              onChange={(e) => update("languages", e.target.value)}
            />
          </div>

          {/* Tech Stack / Frameworks */}
          <div className="form-group">
            <label className="form-label">Tech Stack</label>
            <input
              className="form-input"
              placeholder="ReactJS, Next.js, Node.js, Express.js, Tailwind CSS..."
              value={s.techStack !== undefined ? s.techStack : (s.frameworks || "")}
              onChange={(e) => {
                update("techStack", e.target.value);
                update("frameworks", e.target.value);
              }}
            />
          </div>

          {/* AI/ML & Data Science */}
          <div className="form-group">
            <label className="form-label">AI/ML & Data Science</label>
            <input
              className="form-input"
              placeholder="Machine Learning, Deep Learning, NLP, LLMs, RAG..."
              value={s.ai_ml || ""}
              onChange={(e) => update("ai_ml", e.target.value)}
            />
          </div>

          {/* Technical Proficiencies */}
          <div className="form-group">
            <label className="form-label">Technical Proficiencies</label>
            <input
              className="form-input"
              placeholder="Data Structures & Algorithms (DSA), System Design, DBMS, OOPs..."
              value={s.proficiencies !== undefined ? s.proficiencies : (s.softSkills || "")}
              onChange={(e) => {
                update("proficiencies", e.target.value);
                update("softSkills", e.target.value);
              }}
            />
          </div>

          {/* Developer Tools */}
          <div className="form-group">
            <label className="form-label">Developer Tools</label>
            <input
              className="form-input"
              placeholder="Git, GitHub, VS Code, Docker, Postman, Vercel..."
              value={s.tools || ""}
              onChange={(e) => update("tools", e.target.value)}
            />
          </div>

          {/* Databases */}
          <div className="form-group">
            <label className="form-label">Databases</label>
            <input
              className="form-input"
              placeholder="MySQL, PostgreSQL, MongoDB, Redis..."
              value={s.databases || ""}
              onChange={(e) => update("databases", e.target.value)}
            />
          </div>
        </div>

        {/* Custom Skill Categories */}
        {customSkills.length > 0 && (
          <div style={{ marginTop: "18px", display: "flex", flexDirection: "column", gap: "12px" }}>
            {customSkills.map((item, index) => (
              <div key={item.id || index} className="custom-skill-card">
                <div style={{ display: "flex", gap: 12, alignItems: "flex-end" }}>
                  <div style={{ flex: "0 0 200px" }}>
                    <label className="form-label">Category Name</label>
                    <input
                      className="form-input"
                      placeholder="e.g., Cloud & DevOps"
                      value={item.label || ""}
                      onChange={(e) => updateCustomSkill(index, "label", e.target.value)}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label className="form-label">Skills</label>
                    <input
                      className="form-input"
                      placeholder="AWS, GCP, Kubernetes, CI/CD, Docker..."
                      value={item.value || ""}
                      onChange={(e) => updateCustomSkill(index, "value", e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    className="btn-remove"
                    style={{ padding: "10px 14px", height: "42px" }}
                    onClick={() => removeCustomSkill(index)}
                    title="Remove category"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Custom Category Button */}
        <div style={{ marginTop: "18px" }}>
          <button
            type="button"
            className="btn btn-outline"
            style={{ width: "100%", borderStyle: "dashed", padding: "12px" }}
            onClick={addCustomSkill}
          >
            + Add Custom Skill Category
          </button>
        </div>
      </div>
    </div>
  );
}
