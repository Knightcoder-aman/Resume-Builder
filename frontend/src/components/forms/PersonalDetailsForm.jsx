"use client";

export default function PersonalDetailsForm({ data, setData, onSave }) {
  const update = (field, value) => {
    setData((prev) => ({ ...prev, personal: { ...prev.personal, [field]: value } }));
  };

  const p = data.personal || {};

  return (
    <div className="form-section">
      <div className="form-header">
        <div className="form-header-left">
          <h2>Personal Details</h2>
          <p>Enter your personal details.</p>
        </div>
        <button className="btn btn-primary" onClick={() => onSave("personal")}>
          💾 Save
        </button>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">
            Name<span className="required">*</span>
          </label>
          <input
            className="form-input"
            type="text"
            placeholder="Your full name"
            value={p.name || ""}
            onChange={(e) => update("name", e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">
            Email<span className="required">*</span>
          </label>
          <input
            className="form-input"
            type="email"
            placeholder="your.email@example.com"
            value={p.email || ""}
            onChange={(e) => update("email", e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">
            Contact Number<span className="required">*</span>
          </label>
          <input
            className="form-input"
            type="tel"
            placeholder="Your phone number"
            value={p.phone || ""}
            onChange={(e) => update("phone", e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">
            Address<span className="required">*</span>
          </label>
          <input
            className="form-input"
            type="text"
            placeholder="City, State, Country"
            value={p.address || ""}
            onChange={(e) => update("address", e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Pin Code</label>
          <input
            className="form-input"
            type="text"
            placeholder="Your pin code"
            value={p.pincode || ""}
            onChange={(e) => update("pincode", e.target.value)}
          />
        </div>
      </div>

      <h3 className="section-title">Social Links</h3>
      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">
            LinkedIn<span className="required">*</span>
          </label>
          <input
            className="form-input"
            type="url"
            placeholder="https://www.linkedin.com/in/yourprofile"
            value={p.linkedin || ""}
            onChange={(e) => update("linkedin", e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">GitHub</label>
          <input
            className="form-input"
            type="url"
            placeholder="https://github.com/yourusername"
            value={p.github || ""}
            onChange={(e) => update("github", e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Portfolio Website</label>
          <input
            className="form-input"
            type="url"
            placeholder="https://yourwebsite.com"
            value={p.portfolio || ""}
            onChange={(e) => update("portfolio", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
