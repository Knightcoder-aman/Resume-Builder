"use client";

export default function PersonalDetailsForm({ data, setData, onSave }) {
  const update = (field, value) => {
    setData((prev) => ({
      ...prev,
      personal: { ...prev.personal, [field]: value },
    }));
  };

  const p = data.personal || {};

  return (
    <div className="form-section">
      <div className="form-header">
        <div className="form-header-left">
          <h2>Personal Details</h2>
          <p>This appears at the top of your resume. Fields marked * are required.</p>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => onSave("personal")}
        >
          💾 Save
        </button>
      </div>

      {/* Card 1: Basic Information */}
      <div className="form-card" style={{ marginBottom: "24px" }}>
        <h3 className="card-title">Basic information</h3>

        <div className="form-grid" style={{ marginTop: "16px" }}>
          <div className="form-group">
            <label className="form-label">
              Name<span className="required">*</span>
            </label>
            <div className="input-with-icon">
              <span className="input-field-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </span>
              <input
                className="form-input has-icon"
                type="text"
                placeholder="Aman Singh"
                value={p.name || ""}
                onChange={(e) => update("name", e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Email<span className="required">*</span>
            </label>
            <div className="input-with-icon">
              <span className="input-field-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </span>
              <input
                className="form-input has-icon"
                type="email"
                placeholder="amankumarsingh9457@gmail.com"
                value={p.email || ""}
                onChange={(e) => update("email", e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Contact Number<span className="required">*</span>
            </label>
            <div className="input-with-icon">
              <span className="input-field-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>
              <input
                className="form-input has-icon"
                type="tel"
                placeholder="12345678"
                value={p.phone || ""}
                onChange={(e) => update("phone", e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Address<span className="required">*</span>
            </label>
            <div className="input-with-icon">
              <span className="input-field-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              <input
                className="form-input has-icon"
                type="text"
                placeholder="19/10, Hanuman Puri Kali Dah Road, Aligarh"
                value={p.address || ""}
                onChange={(e) => update("address", e.target.value)}
              />
            </div>
          </div>

          <div className="form-group full-width">
            <label className="form-label">Pin Code</label>
            <div className="input-with-icon">
              <span className="input-field-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="9" y1="21" x2="9" y2="9" />
                </svg>
              </span>
              <input
                className="form-input has-icon"
                type="text"
                placeholder="202001"
                value={p.pincode || ""}
                onChange={(e) => update("pincode", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Card 2: Social Links */}
      <div className="form-card">
        <h3 className="card-title">Social links</h3>

        <div className="form-grid" style={{ marginTop: "16px" }}>
          <div className="form-group">
            <label className="form-label">
              LinkedIn<span className="required">*</span>
            </label>
            <div className="input-with-icon">
              <span className="input-field-icon">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </span>
              <input
                className="form-input has-icon"
                type="url"
                placeholder="https://www.linkedin.com/in/aman-singh-12475824a/"
                value={p.linkedin || ""}
                onChange={(e) => update("linkedin", e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">GitHub</label>
            <div className="input-with-icon">
              <span className="input-field-icon">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              </span>
              <input
                className="form-input has-icon"
                type="url"
                placeholder="https://github.com/Knightcoder-aman"
                value={p.github || ""}
                onChange={(e) => update("github", e.target.value)}
              />
            </div>
          </div>

          <div className="form-group full-width">
            <label className="form-label">Portfolio Website</label>
            <div className="input-with-icon">
              <span className="input-field-icon">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </span>
              <input
                className="form-input has-icon"
                type="url"
                placeholder="https://yourwebsite.com"
                value={p.portfolio || ""}
                onChange={(e) => update("portfolio", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
