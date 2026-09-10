"use client";

export default function Header({ mode, setMode, onBuildResume, loading }) {
  return (
    <header className="header">
      <div className="header-left">
        <h1 className="header-title">
          <span className="header-title-icon">📄</span>
          Resume Builder
        </h1>
        <p className="header-subtitle">
          Create an ATS Friendly Latex Resume 🚀
        </p>
      </div>
      <div className="header-right">
        <div className="mode-toggle">
          <button
            className={`mode-toggle-btn ${mode === "form" ? "active" : ""}`}
            onClick={() => setMode("form")}
          >
            📝 Form Mode
          </button>
          <button
            className={`mode-toggle-btn ${mode === "prompt" ? "active" : ""}`}
            onClick={() => setMode("prompt")}
          >
            ✨ Prompt Mode
          </button>
        </div>
        <button
          className="btn btn-outline"
          onClick={onBuildResume}
          disabled={loading}
        >
          {loading ? "Building..." : "Build Resume"} ↗
        </button>
      </div>
    </header>
  );
}
