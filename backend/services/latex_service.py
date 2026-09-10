import re


def escape_latex(text: str) -> str:
    """Escape special LaTeX characters."""
    if not text:
        return ""
    # Order matters: backslash first
    special_chars = {
        '\\': r'\textbackslash{}',
        '&': r'\&',
        '%': r'\%',
        '$': r'\$',
        '#': r'\#',
        '_': r'\_',
        '{': r'\{',
        '}': r'\}',
        '~': r'\textasciitilde{}',
        '^': r'\textasciicircum{}',
    }
    for char, replacement in special_chars.items():
        text = text.replace(char, replacement)
    return text


def format_date(date_str: str) -> str:
    """Convert YYYY-MM to Month YYYY format."""
    if not date_str:
        return ""
    months = {
        "01": "Jan", "02": "Feb", "03": "Mar", "04": "Apr",
        "05": "May", "06": "Jun", "07": "Jul", "08": "Aug",
        "09": "Sep", "10": "Oct", "11": "Nov", "12": "Dec",
    }
    parts = date_str.split("-")
    if len(parts) == 2:
        year, month = parts
        return f"{months.get(month, month)} {year}"
    return date_str


def render_education(education: list) -> str:
    if not any(e.get("degree") or e.get("university") for e in education):
        return ""
    latex = r"%-----------EDUCATION-----------" + "\n"
    latex += r"\section{EDUCATION}" + "\n"
    latex += r"  \resumeSubHeadingListStart" + "\n"
    for edu in education:
        if not edu.get("degree") and not edu.get("university"):
            continue
        university = escape_latex(edu.get("university", ""))
        degree = escape_latex(edu.get("degree", ""))
        if edu.get("gpa"):
            degree += f" (GPA / Percentage - {escape_latex(edu['gpa'])})"
        
        location = escape_latex(edu.get("location", ""))
        start = format_date(edu.get("startDate", ""))
        end = format_date(edu.get("endDate", ""))
        date_range = f"{start} -- {end}" if start and end else (start or end or "")

        latex += f"    \\resumeSubheading\n      {{{university}}}{{{date_range}}}\n      {{{degree}}}{{{location}}}\n"
    latex += r"  \resumeSubHeadingListEnd" + "\n\n"
    return latex


def render_experience(experience: list) -> str:
    if not any(e.get("company") or e.get("role") for e in experience):
        return ""
    latex = r"%-----------EXPERIENCES-----------" + "\n"
    latex += r"\section{EXPERIENCES}" + "\n"
    latex += r"  \resumeSubHeadingListStart" + "\n"
    for exp in experience:
        if not exp.get("company") and not exp.get("role"):
            continue
        company = escape_latex(exp.get("company", ""))
        role = escape_latex(exp.get("role", ""))
        location = escape_latex(exp.get("location", ""))
        start = format_date(exp.get("startDate", ""))
        end = "Present" if exp.get("current") else format_date(exp.get("endDate", ""))
        date_range = f"{start} -- {end}" if start and end else (start or end or "")

        latex += f"    \\resumeSubheading\n      {{{company}}}{{{date_range}}}\n      {{{role}}}{{{location}}}\n"
        
        bullets = [b for b in exp.get("bullets", []) if b.strip()]
        if bullets:
            latex += r"      \resumeItemListStart" + "\n"
            for bullet in bullets:
                latex += f"        \\resumeItem{{{escape_latex(bullet)}}}\n"
            latex += r"      \resumeItemListEnd" + "\n"
    latex += r"  \resumeSubHeadingListEnd" + "\n\n"
    return latex


def render_projects(projects: list) -> str:
    if not any(p.get("name") for p in projects):
        return ""
    latex = r"%-----------PROJECTS-----------" + "\n"
    latex += r"\section{PROJECTS}" + "\n"
    latex += r"  \resumeSubHeadingListStart" + "\n"
    for proj in projects:
        if not proj.get("name"):
            continue
        name = escape_latex(proj.get("name", ""))
        tech = escape_latex(proj.get("technologies", ""))
        link = proj.get("link", "")

        heading_title = r"\textbf{" + name + r"}"
        if tech:
            heading_title += r" $|$ \emph{" + tech + r"}"
        if link:
            heading_title += r" $|$ \href{" + escape_latex(link) + r"}{\underline{Link}}"

        latex += f"    \\resumeProjectHeading\n      {{{heading_title}}}{{}}\n"
        
        bullets = [b for b in proj.get("bullets", []) if b.strip()]
        if bullets:
            latex += r"      \resumeItemListStart" + "\n"
            for bullet in bullets:
                latex += f"        \\resumeItem{{{escape_latex(bullet)}}}\n"
            latex += r"      \resumeItemListEnd" + "\n"
    latex += r"  \resumeSubHeadingListEnd" + "\n\n"
    return latex


def render_skills(skills: dict) -> str:
    if not skills or not isinstance(skills, dict):
        return ""

    skill_lines = []

    # Map of standard keys to preferred display labels matching target resume
    category_order = [
        ("languages", "Languages"),
        ("techStack", "Tech Stack"),
        ("frameworks", "Tech Stack" if not skills.get("techStack") else "Frameworks & Libraries"),
        ("ai_ml", "AI/ML & Data Science"),
        ("aiml", "AI/ML & Data Science"),
        ("proficiencies", "Technical Proficiencies"),
        ("technicalProficiencies", "Technical Proficiencies"),
        ("tools", "Developer Tools"),
        ("databases", "Databases"),
        ("softSkills", "Soft Skills"),
    ]

    handled_keys = set()
    for key, label in category_order:
        if key in handled_keys:
            continue
        val = skills.get(key)
        if val and isinstance(val, str) and val.strip():
            if key == "frameworks" and skills.get("techStack"):
                continue
            if key == "aiml" and skills.get("ai_ml"):
                continue
            if key == "technicalProficiencies" and skills.get("proficiencies"):
                continue
            skill_lines.append((label, val.strip()))
            handled_keys.add(key)

    # Handle custom skill items if provided (e.g. list of {"label": ..., "value": ...})
    custom_items = skills.get("custom", [])
    if isinstance(custom_items, list):
        for item in custom_items:
            if isinstance(item, dict):
                lbl = item.get("label", "").strip()
                val = item.get("value", "").strip()
                if lbl and val:
                    skill_lines.append((lbl, val))

    # Any other string fields not already handled
    known_keys = {"languages", "techStack", "frameworks", "ai_ml", "aiml", "proficiencies", 
                  "technicalProficiencies", "tools", "databases", "softSkills", "custom"}
    for k, v in skills.items():
        if k not in known_keys and isinstance(v, str) and v.strip():
            display_label = k.replace("_", " ").title()
            skill_lines.append((display_label, v.strip()))

    if not skill_lines:
        return ""

    latex = r"%-----------TECHNICAL SKILLS-----------" + "\n"
    latex += r"\section{TECHNICAL SKILLS}" + "\n"
    latex += r" \begin{itemize}[leftmargin=*, labelindent=0.15in, label=\small$\bullet$]" + "\n"
    for label, val in skill_lines:
        clean_label = label.rstrip(": ")
        latex += f"    \\item \\small{{\\textbf{{{escape_latex(clean_label)}:}} {{{escape_latex(val)}}} \\vspace{{-2pt}}}}\n"
    latex += r" \end{itemize}" + "\n\n"
    return latex


def render_achievements(achievements: list) -> str:
    filtered_achievements = [a for a in achievements if a.strip()]
    if not filtered_achievements:
        return ""
    latex = r"%-----------ACHIEVEMENTS-----------" + "\n"
    latex += r"\section{ACHIEVEMENTS}" + "\n"
    latex += r"  \resumeSubHeadingListStart" + "\n"
    latex += r"    \resumeItemListStart" + "\n"
    for achievement in filtered_achievements:
        latex += f"      \\resumeItem{{{escape_latex(achievement)}}}\n"
    latex += r"    \resumeItemListEnd" + "\n"
    latex += r"  \resumeSubHeadingListEnd" + "\n\n"
    return latex


def render_extracurricular(extracurricular: list) -> str:
    filtered_extra = [e for e in extracurricular if e.strip()]
    if not filtered_extra:
        return ""
    latex = r"%-----------EXTRA CURRICULAR-----------" + "\n"
    latex += r"\section{EXTRA CURRICULAR}" + "\n"
    latex += r"  \resumeSubHeadingListStart" + "\n"
    latex += r"    \resumeItemListStart" + "\n"
    for extra in filtered_extra:
        latex += f"      \\resumeItem{{{escape_latex(extra)}}}\n"
    latex += r"    \resumeItemListEnd" + "\n"
    latex += r"  \resumeSubHeadingListEnd" + "\n\n"
    return latex


def generate_latex(resume_data: dict) -> str:
    """Generate ATS-friendly LaTeX resume matching the Jake's Resume template style."""
    personal = resume_data.get("personal", {})

    latex = r"""\documentclass[letterpaper,11pt]{article}

\usepackage{latexsym}
\usepackage[empty]{fullpage}
\usepackage{titlesec}
\usepackage{marvosym}
\usepackage[usenames,dvipsnames]{color}
\usepackage{verbatim}
\usepackage{enumitem}
\usepackage[hidelinks]{hyperref}
\usepackage{fancyhdr}
\usepackage[english]{babel}
\usepackage{tabularx}
\usepackage{fontawesome5}
\usepackage{multicol}
\setlength{\multicolsep}{-3.0pt}
\setlength{\columnsep}{-1pt}

\pagestyle{fancy}
\fancyhf{} % clear all header and footer fields
\fancyfoot{}
\renewcommand{\headrulewidth}{0pt}
\renewcommand{\footrulewidth}{0pt}

% Adjust margins
\addtolength{\oddsidemargin}{-0.6in}
\addtolength{\evensidemargin}{-0.5in}
\addtolength{\textwidth}{1.19in}
\addtolength{\topmargin}{-.7in}
\addtolength{\textheight}{1.4in}

\urlstyle{same}

\raggedbottom
\raggedright
\setlength{\tabcolsep}{0in}

% Sections formatting
\titleformat{\section}{
  \vspace{-4pt}\scshape\raggedright\large\bfseries
}{}{0em}{}[\color{black}\titlerule \vspace{-5pt}]

% Ensure bullet points are solid dark black circles across all nesting levels
\renewcommand\labelitemi{\small$\bullet$}
\renewcommand\labelitemii{\small$\bullet$}
\renewcommand\labelitemiii{\small$\bullet$}
\renewcommand\labelitemiv{\small$\bullet$}

% Custom commands
\newcommand{\resumeItem}[1]{
  \item\small{
    {#1 \vspace{-2pt}}
  }
}

\newcommand{\resumeSubheading}[4]{
  \vspace{-2pt}\item
    \begin{tabular*}{1.0\textwidth}[t]{l@{\extracolsep{\fill}}r}
      \textbf{#1} & \textbf{\small #2} \\
      \textit{\small#3} & \textit{\small #4} \\
    \end{tabular*}\vspace{-7pt}
}

\newcommand{\resumeProjectHeading}[2]{
    \item
    \begin{tabular*}{1.0\textwidth}{l@{\extracolsep{\fill}}r}
      \small#1 & \textbf{\small #2} \\
    \end{tabular*}\vspace{-7pt}
}

\newcommand{\resumeSubHeadingListStart}{\begin{itemize}[leftmargin=0.0in, label={}]}
\newcommand{\resumeSubHeadingListEnd}{\end{itemize}}
\newcommand{\resumeItemListStart}{\begin{itemize}[leftmargin=*, labelindent=0.15in, label=\small$\bullet$]}
\newcommand{\resumeItemListEnd}{\end{itemize}\vspace{-5pt}}

\begin{document}

%----------HEADING----------
\begin{center}
"""
    name = escape_latex(personal.get("name", "Your Name"))
    latex += r"    {\Huge \scshape " + name + r"} \\ \vspace{2pt}" + "\n"

    address_parts = []
    if personal.get("address"):
        address_parts.append(escape_latex(personal["address"]))
    if personal.get("pincode"):
        address_parts.append(escape_latex(personal["pincode"]))
    
    if address_parts:
        latex += "    " + ", ".join(address_parts) + r" \\ \vspace{2pt}" + "\n"

    contact_parts = []
    if personal.get("phone"):
        contact_parts.append(r"\faPhone\ " + escape_latex(personal["phone"]))
    if personal.get("email"):
        contact_parts.append(r"\href{mailto:" + escape_latex(personal["email"]) + r"}{\faEnvelope \ \underline{" + escape_latex(personal["email"]) + r"}}")
    if personal.get("linkedin"):
        contact_parts.append(r"\href{" + escape_latex(personal["linkedin"]) + r"}{\faLinkedin \ \underline{LinkedIn}}")
    if personal.get("github"):
        contact_parts.append(r"\href{" + escape_latex(personal["github"]) + r"}{\faGithub \ \underline{GitHub}}")
    if personal.get("portfolio"):
        contact_parts.append(r"\href{" + escape_latex(personal["portfolio"]) + r"}{\faGlobe \ \underline{Portfolio}}")

    if contact_parts:
        latex += r"    \small " + " ~ ".join(contact_parts) + "\n"

    latex += r"""\end{center}

"""

    # Section renderers mapping
    section_renderers = {
        "education": lambda: render_education(resume_data.get("education", [])),
        "experience": lambda: render_experience(resume_data.get("experience", [])),
        "projects": lambda: render_projects(resume_data.get("projects", [])),
        "skills": lambda: render_skills(resume_data.get("skills", {})),
        "achievements": lambda: render_achievements(resume_data.get("achievements", [])),
        "extracurricular": lambda: render_extracurricular(resume_data.get("extracurricular", [])),
        "extra_curricular": lambda: render_extracurricular(resume_data.get("extracurricular", [])),
    }

    default_order = ["education", "experience", "projects", "skills", "achievements", "extracurricular"]
    raw_order = resume_data.get("section_order")
    if raw_order and isinstance(raw_order, list):
        section_order = [s for s in raw_order if s in section_renderers]
        # append any default sections that might not be in section_order
        for s in default_order:
            if s not in section_order:
                section_order.append(s)
    else:
        section_order = default_order

    section_visibility = resume_data.get("section_visibility") or {}
    disabled_sections = set(resume_data.get("disabled_sections") or [])

    for section_id in section_order:
        # Check if disabled
        if section_visibility.get(section_id) is False or section_id in disabled_sections:
            continue
        renderer = section_renderers.get(section_id)
        if renderer:
            latex += renderer()

    latex += r"\end{document}" + "\n"

    return latex
