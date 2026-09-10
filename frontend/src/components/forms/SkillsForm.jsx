"use client";

export default function SkillsForm({ data, setData, onSave, onAISuggest }) {
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
          <p>
            List your technical skill categories. Each category will be displayed as a distinct bullet point in the resume. Separate items with commas.
          </p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {onAISuggest && (
            <button
              type="button"
              className="ai-enhance-btn"
              onClick={() => onAISuggest("skills")}
            >
              ✨ AI Suggest Skills
            </button>
          )}
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => onSave("skills")}
          >
            💾 Save
          </button>
        </div>
      </div>

      <div className="form-grid">
        {/* Programming Languages */}
        <div className="form-group form-grid-full">
          <label className="form-label">
            Languages <span className="required">*</span>
          </label>
          <input
            className="form-input"
            placeholder="Python, SQL, C++, JavaScript, Java, TypeScript..."
            value={s.languages || ""}
            onChange={(e) => update("languages", e.target.value)}
          />
          <span className="form-hint">Appears as: &bull; Languages: &lt;skills&gt;</span>
        </div>

        {/* Tech Stack / Frameworks */}
        <div className="form-group form-grid-full">
          <label className="form-label">Tech Stack</label>
          <input
            className="form-input"
            placeholder="ReactJS, Next.js, Tailwind CSS, Node.js, Express.js, JWT, REST API, MongoDB..."
            value={s.techStack !== undefined ? s.techStack : (s.frameworks || "")}
            onChange={(e) => {
              update("techStack", e.target.value);
              update("frameworks", e.target.value);
            }}
          />
          <span className="form-hint">Appears as: &bull; Tech Stack: &lt;skills&gt;</span>
        </div>

        {/* AI/ML & Data Science */}
        <div className="form-group form-grid-full">
          <label className="form-label">AI/ML & Data Science</label>
          <input
            className="form-input"
            placeholder="Machine Learning, Deep Learning, NLP, LLMs, RAG, Prompt Engineering, Scikit-learn, Pandas, PyTorch..."
            value={s.ai_ml || ""}
            onChange={(e) => update("ai_ml", e.target.value)}
          />
          <span className="form-hint">Appears as: &bull; AI/ML & Data Science: &lt;skills&gt;</span>
        </div>

        {/* Technical Proficiencies */}
        <div className="form-group form-grid-full">
          <label className="form-label">Technical Proficiencies</label>
          <input
            className="form-input"
            placeholder="OOPs, DSA, Operating Systems, Computer Networks, DBMS, System Design..."
            value={s.proficiencies !== undefined ? s.proficiencies : (s.softSkills || "")}
            onChange={(e) => {
              update("proficiencies", e.target.value);
              // Also update softSkills for backward compatibility
              update("softSkills", e.target.value);
            }}
          />
          <span className="form-hint">Appears as: &bull; Technical Proficiencies: &lt;skills&gt;</span>
        </div>

        {/* Developer Tools */}
        <div className="form-group form-grid-full">
          <label className="form-label">Developer Tools</label>
          <input
            className="form-input"
            placeholder="Git, GitHub, VS Code, Docker, Postman, Vercel, Netlify, Linux..."
            value={s.tools || ""}
            onChange={(e) => update("tools", e.target.value)}
          />
          <span className="form-hint">Appears as: &bull; Developer Tools: &lt;skills&gt;</span>
        </div>

        {/* Databases */}
        <div className="form-group form-grid-full">
          <label className="form-label">Databases</label>
          <input
            className="form-input"
            placeholder="MySQL, PostgreSQL, MongoDB, Redis, SQLite..."
            value={s.databases || ""}
            onChange={(e) => update("databases", e.target.value)}
          />
          <span className="form-hint">Appears as: &bull; Databases: &lt;skills&gt;</span>
        </div>

        {/* Custom Skill Categories */}
        {customSkills.map((item, index) => (
          <div key={item.id || index} className="form-group form-grid-full custom-skill-card">
            <div style={{ display: "flex", gap: 12, alignItems: "flex-end" }}>
              <div style={{ flex: "0 0 240px" }}>
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
                  placeholder="AWS, GCP, Kubernetes, CI/CD, Terraform..."
                  value={item.value || ""}
                  onChange={(e) => updateCustomSkill(index, "value", e.target.value)}
                />
              </div>
              <button
                type="button"
                className="btn-remove"
                style={{ padding: "10px 14px", height: "42px", marginBottom: "1px" }}
                onClick={() => removeCustomSkill(index)}
                title="Remove category"
              >
                ✕
              </button>
            </div>
            <span className="form-hint">
              Appears as: &bull; {item.label ? `${item.label}:` : "Category:"} &lt;skills&gt;
            </span>
          </div>
        ))}

        {/* Add Custom Category Button */}
        <div className="form-grid-full" style={{ marginTop: 4 }}>
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
