"use client";

import { useState } from "react";

const EXAMPLE_PROMPTS = [
  "I'm a B.Tech CSE student from IIT Delhi with 8.5 CGPA, skilled in Python, React, and ML...",
  "Software Engineer with 3 years at Amazon, expertise in distributed systems and AWS...",
  "Fresh graduate from NIT Trichy, strong in DSA, built 5 projects in MERN stack...",
];

export default function PromptMode({ onGenerate, loading }) {
  const [prompt, setPrompt] = useState("");

  return (
    <div className="prompt-mode">
      <div className="prompt-card">
        <h2>✨ Generate Resume with AI</h2>
        <p>
          Describe yourself — your education, experience, skills, projects, and
          achievements. Our AI will parse your input and generate a complete,
          structured resume automatically. You can then review and edit each
          section before building.
        </p>

        <textarea
          className="prompt-textarea"
          placeholder={`Example: "I'm Aman Kumar Singh, a B.Tech Computer Science student at AMU Aligarh with 8.5 CGPA. I've interned at Google as SDE Intern where I built microservices handling 10K req/s. My skills include Python, JavaScript, React, Node.js, MongoDB, and AWS. I've built a Movie Recommendation System using collaborative filtering and a Real-time Chat App using Socket.io. I won 1st place at Smart India Hackathon 2024. I'm also the Technical Lead at ACM Student Chapter..."`}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <div className="prompt-actions">
          <button
            className="btn btn-primary"
            onClick={() => onGenerate(prompt)}
            disabled={!prompt.trim() || loading}
          >
            {loading ? (
              <>
                <span className="spinner" style={{ display: "inline-block", width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "white", borderRadius: "50%", animation: "spin 0.8s linear infinite" }}></span>
                Generating...
              </>
            ) : (
              <>🚀 Generate Resume</>
            )}
          </button>
        </div>

        <div className="prompt-examples">
          <h3>💡 Try an example prompt:</h3>
          {EXAMPLE_PROMPTS.map((example, i) => (
            <span
              key={i}
              className="prompt-example-chip"
              onClick={() => setPrompt(example)}
            >
              {example.substring(0, 60)}...
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
