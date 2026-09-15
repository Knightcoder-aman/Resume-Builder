"use client";

export default function Header({
  mode,
  setMode,
  onBuildResume,
  loading,
  theme = "light",
  onToggleTheme,
  breadcrumb = "General > Personal Details",
  userInitial = "A",
}) {
  return (
    <header className="header">
      <div className="header-left">
        <div className="header-brand-container">
          <div className="header-logo-badge">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          </div>
          <div className="header-text-block">
            <h1 className="header-title">Resume Builder</h1>
            <div className="header-breadcrumb">{breadcrumb}</div>
          </div>
        </div>
      </div>

      <div className="header-right">
        {/* Light / Dark Mode Toggle */}
        <button
          type="button"
          className="theme-toggle-btn"
          onClick={onToggleTheme}
          title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
          aria-label="Toggle light or dark theme"
        >
          {theme === "light" ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          )}
        </button>

        {/* Form Mode vs Prompt Mode */}
        <div className="mode-toggle">
          <button
            type="button"
            className={`mode-toggle-btn ${mode === "form" ? "active" : ""}`}
            onClick={() => setMode("form")}
          >
            <span className="mode-btn-icon">📄</span>
            Form Mode
          </button>
          <button
            type="button"
            className={`mode-toggle-btn ${mode === "prompt" ? "active" : ""}`}
            onClick={() => setMode("prompt")}
          >
            <span className="mode-btn-icon">✨</span>
            Prompt Mode
          </button>
        </div>

        {/* Build Resume Button */}
        <button
          type="button"
          className="btn btn-build-resume"
          onClick={onBuildResume}
          disabled={loading}
        >
          {loading ? "Building..." : "Build Resume"} ↗
        </button>

        {/* User Avatar Circle */}
        <div className="header-avatar" title="Account profile">
          {userInitial}
        </div>
      </div>
    </header>
  );
}
