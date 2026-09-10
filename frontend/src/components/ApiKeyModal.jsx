"use client";

import { useState } from "react";

export default function ApiKeyModal({ onSave, onClose }) {
  const [key, setKey] = useState("");

  const handleSave = () => {
    if (key.trim()) {
      onSave(key.trim());
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>🔑 Set Gemini API Key</h3>
        <p>
          To use AI features, you need a Google Gemini API key. It&apos;s free to get
          one from{" "}
          <a
            href="https://aistudio.google.com/apikey"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google AI Studio
          </a>
          . Your key is stored only in your browser and sent directly to
          Google&apos;s API — it never touches our servers.
        </p>
        <div className="form-group">
          <label className="form-label">API Key</label>
          <input
            className="form-input"
            type="password"
            placeholder="Paste your Gemini API key here..."
            value={key}
            onChange={(e) => setKey(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
          />
        </div>
        <div className="modal-actions">
          <button className="btn btn-outline" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={handleSave}
            disabled={!key.trim()}
          >
            Save Key
          </button>
        </div>
      </div>
    </div>
  );
}
