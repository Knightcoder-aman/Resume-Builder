"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Header from "@/components/Header";
import Sidebar, { DEFAULT_SECTION_ORDER, SECTION_METADATA } from "@/components/Sidebar";
import PromptMode from "@/components/PromptMode";
import ApiKeyModal from "@/components/ApiKeyModal";
import CustomSectionModal from "@/components/CustomSectionModal";
import PersonalDetailsForm from "@/components/forms/PersonalDetailsForm";
import SummaryForm from "@/components/forms/SummaryForm";
import EducationForm from "@/components/forms/EducationForm";
import ExperienceForm from "@/components/forms/ExperienceForm";
import ProjectsForm from "@/components/forms/ProjectsForm";
import AchievementsForm from "@/components/forms/AchievementsForm";
import SkillsForm from "@/components/forms/SkillsForm";
import ExtraCurricularForm from "@/components/forms/ExtraCurricularForm";
import CustomSectionForm from "@/components/forms/CustomSectionForm";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const INITIAL_DATA = {
  personal: { name: "", email: "", phone: "", address: "", pincode: "", linkedin: "", github: "", portfolio: "" },
  summary: "",
  education: [{ degree: "", university: "", location: "", startDate: "", endDate: "", gpa: "", coursework: "" }],
  experience: [{ company: "", role: "", location: "", startDate: "", endDate: "", current: false, bullets: [""] }],
  projects: [{ name: "", description: "", technologies: "", link: "", bullets: [""] }],
  achievements: [""],
  skills: {
    languages: "",
    techStack: "",
    frameworks: "",
    ai_ml: "",
    proficiencies: "",
    tools: "",
    databases: "",
    softSkills: "",
    custom: [],
  },
  extracurricular: [""],
  custom_sections: {},
};

const DEFAULT_VISIBILITY = {
  summary: true,
  education: true,
  experience: true,
  projects: true,
  skills: true,
  achievements: true,
  extracurricular: true,
};

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState("light");
  const [mode, setMode] = useState("form");
  const [activeTab, setActiveTab] = useState("personal");
  const [data, setData] = useState(INITIAL_DATA);
  const [savedTabs, setSavedTabs] = useState({});
  const [sectionOrder, setSectionOrder] = useState(DEFAULT_SECTION_ORDER);
  const [sectionVisibility, setSectionVisibility] = useState(DEFAULT_VISIBILITY);
  const [customSections, setCustomSections] = useState({});
  const [showAddCustomModal, setShowAddCustomModal] = useState(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  // Load from localStorage on mount
  useEffect(() => {
    // Theme setup
    const storedTheme = localStorage.getItem("resume_theme") || "light";
    setTheme(storedTheme);
    document.documentElement.setAttribute("data-theme", storedTheme);

    const storedKey = localStorage.getItem("gemini_api_key");
    if (storedKey) setApiKey(storedKey);

    const storedData = localStorage.getItem("resume_data");
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        setData((prev) => ({
          ...prev,
          ...parsed,
          summary: parsed.summary || "",
          custom_sections: parsed.custom_sections || {},
        }));
      } catch (e) {
        // use defaults
      }
    }

    const storedCustom = localStorage.getItem("resume_custom_sections");
    if (storedCustom) {
      try {
        setCustomSections(JSON.parse(storedCustom));
      } catch (e) {
        // use defaults
      }
    }

    const storedSaved = localStorage.getItem("resume_saved_tabs");
    if (storedSaved) {
      try {
        setSavedTabs(JSON.parse(storedSaved));
      } catch (e) {
        // use defaults
      }
    }

    const storedOrder = localStorage.getItem("resume_section_order");
    if (storedOrder) {
      try {
        const parsed = JSON.parse(storedOrder);
        if (Array.isArray(parsed)) {
          // Ensure summary is in order
          if (!parsed.includes("summary")) {
            parsed.unshift("summary");
          }
          setSectionOrder(parsed);
        }
      } catch (e) {
        // use defaults
      }
    }

    const storedVisibility = localStorage.getItem("resume_section_visibility");
    if (storedVisibility) {
      try {
        const parsed = JSON.parse(storedVisibility);
        if (typeof parsed === "object" && parsed !== null) {
          setSectionVisibility((prev) => ({ ...prev, ...parsed }));
        }
      } catch (e) {
        // use defaults
      }
    }

    setMounted(true);
  }, []);

  const handleToggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("resume_theme", nextTheme);
  };

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const handleSaveApiKey = (key) => {
    setApiKey(key);
    localStorage.setItem("gemini_api_key", key);
    setShowApiKeyModal(false);
    showToast("API key saved successfully!");
  };

  const handleSaveTab = (tabId) => {
    const newSaved = { ...savedTabs, [tabId]: true };
    setSavedTabs(newSaved);
    localStorage.setItem("resume_data", JSON.stringify(data));
    localStorage.setItem("resume_saved_tabs", JSON.stringify(newSaved));
    const label = SECTION_METADATA[tabId]?.label || customSections[tabId]?.title || tabId;
    showToast(`${label} saved!`);
  };

  const handleReorderSections = useCallback((draggedId, targetId, position = "after") => {
    setSectionOrder((prev) => {
      const filtered = prev.filter((id) => id !== draggedId);
      const targetIdx = filtered.indexOf(targetId);
      if (targetIdx === -1) return prev;
      const insertIdx = position === "before" ? targetIdx : targetIdx + 1;
      const updated = [...filtered.slice(0, insertIdx), draggedId, ...filtered.slice(insertIdx)];
      localStorage.setItem("resume_section_order", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const handleMoveSection = useCallback((id, direction) => {
    setSectionOrder((prev) => {
      const idx = prev.indexOf(id);
      if (idx === -1) return prev;
      const newIdx = direction === "up" ? idx - 1 : idx + 1;
      if (newIdx < 0 || newIdx >= prev.length) return prev;
      const updated = [...prev];
      const [moved] = updated.splice(idx, 1);
      updated.splice(newIdx, 0, moved);
      localStorage.setItem("resume_section_order", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const handleToggleSection = useCallback((id) => {
    setSectionVisibility((prev) => {
      const currentlyEnabled = prev[id] !== false;
      const updated = { ...prev, [id]: !currentlyEnabled };
      localStorage.setItem("resume_section_visibility", JSON.stringify(updated));
      const label = SECTION_METADATA[id]?.label || customSections[id]?.title || id;
      showToast(
        !currentlyEnabled
          ? `${label} enabled in resume! ✨`
          : `${label} hidden from resume`
      );
      return updated;
    });
  }, [customSections, showToast]);

  const handleAddCustomSection = (title, icon) => {
    const sectionId = `custom_${Date.now()}`;
    const newConfig = { id: sectionId, title, icon };

    const updatedCustom = { ...customSections, [sectionId]: newConfig };
    setCustomSections(updatedCustom);
    localStorage.setItem("resume_custom_sections", JSON.stringify(updatedCustom));

    const updatedOrder = [...sectionOrder, sectionId];
    setSectionOrder(updatedOrder);
    localStorage.setItem("resume_section_order", JSON.stringify(updatedOrder));

    const updatedVis = { ...sectionVisibility, [sectionId]: true };
    setSectionVisibility(updatedVis);
    localStorage.setItem("resume_section_visibility", JSON.stringify(updatedVis));

    // Initialize custom section data
    setData((prev) => {
      const next = {
        ...prev,
        custom_sections: {
          ...(prev.custom_sections || {}),
          [sectionId]: {
            title,
            icon,
            items: [
              {
                title: "",
                subtitle: "",
                date: "",
                location: "",
                bullets: [""],
              },
            ],
          },
        },
      };
      localStorage.setItem("resume_data", JSON.stringify(next));
      return next;
    });

    setActiveTab(sectionId);
    showToast(`Added "${title}" custom section! ✨`);
  };

  const handleDeleteCustomSection = (sectionId) => {
    const label = customSections[sectionId]?.title || "Custom section";
    if (!confirm(`Are you sure you want to delete the "${label}" section?`)) return;

    const updatedCustom = { ...customSections };
    delete updatedCustom[sectionId];
    setCustomSections(updatedCustom);
    localStorage.setItem("resume_custom_sections", JSON.stringify(updatedCustom));

    const updatedOrder = sectionOrder.filter((id) => id !== sectionId);
    setSectionOrder(updatedOrder);
    localStorage.setItem("resume_section_order", JSON.stringify(updatedOrder));

    const updatedVis = { ...sectionVisibility };
    delete updatedVis[sectionId];
    setSectionVisibility(updatedVis);
    localStorage.setItem("resume_section_visibility", JSON.stringify(updatedVis));

    setData((prev) => {
      const nextCust = { ...(prev.custom_sections || {}) };
      delete nextCust[sectionId];
      const next = { ...prev, custom_sections: nextCust };
      localStorage.setItem("resume_data", JSON.stringify(next));
      return next;
    });

    if (activeTab === sectionId) {
      setActiveTab("personal");
    }

    showToast(`Deleted "${label}" section`);
  };

  const ensureApiKey = () => {
    if (!apiKey) {
      setShowApiKeyModal(true);
      return false;
    }
    return true;
  };

  const handleAIEnhance = async (section, index) => {
    if (!ensureApiKey()) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/enhance`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          api_key: apiKey,
          section,
          index,
          data: data[section],
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail || "AI enhancement failed");
      }

      const result = await response.json();

      if (section === "experience" && result.enhanced_bullets) {
        setData((prev) => {
          const updated = [...prev.experience];
          updated[index] = { ...updated[index], bullets: result.enhanced_bullets };
          return { ...prev, experience: updated };
        });
        showToast("Bullet points enhanced with AI! ✨");
      }
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleAISuggestSkills = async () => {
    if (!ensureApiKey()) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/suggest-skills`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          api_key: apiKey,
          experience: data.experience,
          projects: data.projects,
          current_skills: data.skills,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail || "Skill suggestion failed");
      }

      const result = await response.json();
      if (result.suggested_skills) {
        setData((prev) => ({
          ...prev,
          skills: { ...prev.skills, ...result.suggested_skills },
        }));
        showToast("Skills updated with AI suggestions! ✨");
      }
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateFromPrompt = async (prompt) => {
    if (!ensureApiKey()) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/generate-from-prompt`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          api_key: apiKey,
          prompt,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail || "Resume generation failed");
      }

      const result = await response.json();
      if (result.resume_data) {
        setData(result.resume_data);
        const allSaved = {};
        ["personal", "summary", "education", "experience", "projects", "achievements", "skills", "extracurricular"].forEach(
          (tab) => (allSaved[tab] = true)
        );
        setSavedTabs(allSaved);
        localStorage.setItem("resume_data", JSON.stringify(result.resume_data));
        localStorage.setItem("resume_saved_tabs", JSON.stringify(allSaved));
        setMode("form");
        showToast("Resume generated from prompt! Review each section. ✨");
      }
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleBuildResume = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/generate-latex`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resume_data: {
            ...data,
            section_order: sectionOrder,
            section_visibility: sectionVisibility,
            custom_sections: data.custom_sections || {},
          },
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail || "LaTeX generation failed");
      }

      const result = await response.json();
      const latex = result.latex;

      // Open in Overleaf
      const form = document.createElement("form");
      form.method = "POST";
      form.action = "https://www.overleaf.com/docs";
      form.target = "_blank";

      const snipInput = document.createElement("input");
      snipInput.type = "hidden";
      snipInput.name = "snip";
      snipInput.value = latex;
      form.appendChild(snipInput);

      const engineInput = document.createElement("input");
      engineInput.type = "hidden";
      engineInput.name = "engine";
      engineInput.value = "pdflatex";
      form.appendChild(engineInput);

      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);

      showToast("Resume opened in Overleaf! 🎉");
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  // Completeness Calculation
  const completeness = useMemo(() => {
    const isPersonalDone = Boolean(data.personal?.name && data.personal?.email);
    const isSummaryDone = Boolean(data.summary && data.summary.trim().length > 0);
    const isEduDone = Boolean(data.education?.some((e) => e.degree || e.university));
    const isExpDone = Boolean(data.experience?.some((e) => e.company || e.role));
    const isProjDone = Boolean(data.projects?.some((p) => p.name));
    const isSkillsDone = Boolean(
      data.skills?.languages ||
      data.skills?.techStack ||
      data.skills?.frameworks ||
      data.skills?.tools
    );
    const isAchDone = Boolean(data.achievements?.some((a) => a.trim()));
    const isExtraDone = Boolean(data.extracurricular?.some((e) => e.trim()));

    const statusMap = {
      personal: isPersonalDone,
      summary: isSummaryDone,
      education: isEduDone,
      experience: isExpDone,
      projects: isProjDone,
      skills: isSkillsDone,
      achievements: isAchDone,
      extracurricular: isExtraDone,
    };

    // Check custom sections
    Object.keys(customSections).forEach((id) => {
      const items = data.custom_sections?.[id]?.items || [];
      statusMap[id] = items.some(
        (it) => it.title || it.subtitle || (it.bullets && it.bullets.some((b) => b.trim()))
      );
    });

    // Count enabled sections
    const enabledSections = ["personal", ...sectionOrder.filter((id) => sectionVisibility[id] !== false)];
    const totalCount = enabledSections.length;
    const completedCount = enabledSections.filter((id) => statusMap[id]).length;
    const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    return { percentage, completedCount, totalCount };
  }, [data, customSections, sectionOrder, sectionVisibility]);

  // Breadcrumb
  const activeBreadcrumb = useMemo(() => {
    if (activeTab === "personal") return "General > Personal Details";
    const tabMeta = SECTION_METADATA[activeTab];
    if (tabMeta) return `Resume Sections > ${tabMeta.label}`;
    const custom = customSections[activeTab];
    if (custom) return `Resume Sections > ${custom.title}`;
    return "Resume Sections";
  }, [activeTab, customSections]);

  const userInitial = useMemo(() => {
    const name = data.personal?.name?.trim();
    return name ? name.charAt(0).toUpperCase() : "A";
  }, [data.personal?.name]);

  const renderForm = () => {
    if (customSections[activeTab]) {
      return (
        <CustomSectionForm
          sectionId={activeTab}
          sectionConfig={customSections[activeTab]}
          data={data}
          setData={setData}
          onSave={handleSaveTab}
          onDeleteSection={handleDeleteCustomSection}
        />
      );
    }

    switch (activeTab) {
      case "personal":
        return <PersonalDetailsForm data={data} setData={setData} onSave={handleSaveTab} />;
      case "summary":
        return <SummaryForm data={data} setData={setData} onSave={handleSaveTab} />;
      case "education":
        return <EducationForm data={data} setData={setData} onSave={handleSaveTab} />;
      case "experience":
        return <ExperienceForm data={data} setData={setData} onSave={handleSaveTab} onAIEnhance={handleAIEnhance} />;
      case "projects":
        return <ProjectsForm data={data} setData={setData} onSave={handleSaveTab} />;
      case "achievements":
        return <AchievementsForm data={data} setData={setData} onSave={handleSaveTab} />;
      case "skills":
        return <SkillsForm data={data} setData={setData} onSave={handleSaveTab} />;
      case "extracurricular":
        return <ExtraCurricularForm data={data} setData={setData} onSave={handleSaveTab} />;
      default:
        return null;
    }
  };

  return !mounted ? (
    <div className="loading-overlay">
      <div className="loading-spinner"></div>
      <span className="loading-text">Loading Resume Builder...</span>
    </div>
  ) : (
    <>
      <Header
        mode={mode}
        setMode={setMode}
        onBuildResume={handleBuildResume}
        loading={loading}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        breadcrumb={activeBreadcrumb}
        userInitial={userInitial}
      />
      <div className="app-layout">
        {mode === "form" && (
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            savedTabs={savedTabs}
            sectionOrder={sectionOrder}
            sectionVisibility={sectionVisibility}
            customSections={customSections}
            completeness={completeness}
            onReorderSections={handleReorderSections}
            onMoveSection={handleMoveSection}
            onToggleSection={handleToggleSection}
            onOpenAddCustomModal={() => setShowAddCustomModal(true)}
            onDeleteCustomSection={handleDeleteCustomSection}
          />
        )}
        <main className="main-content">
          {mode === "form" && activeTab !== "personal" && sectionVisibility[activeTab] === false && (
            <div className="section-disabled-alert">
              <div className="alert-content">
                <span className="alert-icon">⚠️</span>
                <div>
                  <strong>
                    {SECTION_METADATA[activeTab]?.label || customSections[activeTab]?.title || "This section"} is currently hidden
                  </strong>
                  <p>It will not appear in your generated resume until you enable it.</p>
                </div>
              </div>
              <button
                type="button"
                className="btn btn-sm btn-primary"
                onClick={() => handleToggleSection(activeTab)}
              >
                Enable Section
              </button>
            </div>
          )}
          {mode === "form" ? renderForm() : (
            <PromptMode
              onGenerate={handleGenerateFromPrompt}
              loading={loading}
            />
          )}
        </main>
      </div>

      <CustomSectionModal
        isOpen={showAddCustomModal}
        onClose={() => setShowAddCustomModal(false)}
        onAddSection={handleAddCustomSection}
      />

      {showApiKeyModal && (
        <ApiKeyModal
          onSave={handleSaveApiKey}
          onClose={() => setShowApiKeyModal(false)}
        />
      )}

      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <span className="loading-text">AI is working its magic...</span>
        </div>
      )}

      {toast && (
        <div className={`toast toast-${toast.type}`}>
          {toast.message}
        </div>
      )}
    </>
  );
}
