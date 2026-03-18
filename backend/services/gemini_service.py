import google.generativeai as genai
import json
import re
import os


def get_model(api_key: str = None):
    """Configure and return a Gemini model instance."""
    key = os.environ.get("GEMINI_API_KEY") or api_key
    if not key:
        raise ValueError("No Gemini API key found. Set GEMINI_API_KEY in .env or provide it in the request.")
    genai.configure(api_key=key)
    return genai.GenerativeModel("gemini-2.0-flash")


async def enhance_bullets(api_key: str, experience_entry: dict) -> list:
    """Enhance experience bullet points using AI."""
    model = get_model(api_key)

    prompt = f"""You are an expert resume writer. Enhance the following work experience bullet points to be ATS-friendly and impactful.

Rules:
- Start each bullet with a strong action verb (e.g., Developed, Implemented, Spearheaded, Engineered, Optimized)
- Include quantifiable metrics where possible (e.g., "reduced latency by 40%", "served 10K+ users")
- Keep each bullet concise (1-2 lines max)
- Use professional, technical language
- Make them ATS-parseable (avoid special characters, use standard terms)

Company: {experience_entry.get('company', 'N/A')}
Role: {experience_entry.get('role', 'N/A')}

Original bullet points:
{chr(10).join(f'- {b}' for b in experience_entry.get('bullets', []) if b.strip())}

Return ONLY a JSON array of enhanced bullet point strings, nothing else. Example:
["Enhanced bullet 1", "Enhanced bullet 2"]"""

    response = model.generate_content(prompt)
    text = response.text.strip()

    # Extract JSON array from response
    json_match = re.search(r'\[.*\]', text, re.DOTALL)
    if json_match:
        return json.loads(json_match.group())

    # Fallback: split by newlines
    lines = [line.strip().lstrip('- ').strip('"') for line in text.split('\n') if line.strip()]
    return lines if lines else experience_entry.get('bullets', [])


async def suggest_skills(api_key: str, experience: list, projects: list, current_skills: dict) -> dict:
    """Suggest additional skills based on experience and projects."""
    model = get_model(api_key)

    prompt = f"""You are a technical resume advisor. Based on the following work experience and projects, suggest relevant skills that the candidate should highlight.

Experience:
{json.dumps(experience, indent=2)}

Projects:
{json.dumps(projects, indent=2)}

Current Skills:
{json.dumps(current_skills, indent=2)}

Return a JSON object with these exact keys. Merge existing skills with new suggestions (comma-separated strings):
{{
  "languages": "Python, JavaScript, ...",
  "frameworks": "React, Node.js, ...",
  "tools": "Git, Docker, ...",
  "databases": "MySQL, MongoDB, ...",
  "softSkills": "Leadership, Communication, ..."
}}

Return ONLY the JSON object, nothing else."""

    response = model.generate_content(prompt)
    text = response.text.strip()

    json_match = re.search(r'\{.*\}', text, re.DOTALL)
    if json_match:
        return json.loads(json_match.group())

    return current_skills


async def generate_from_prompt(api_key: str, user_prompt: str) -> dict:
    """Parse a free-text prompt into structured resume data."""
    model = get_model(api_key)

    prompt = f"""You are an expert resume parser and writer. Parse the following text description of a person into a structured resume JSON format. Extract all information and organize it properly. If some information is missing, leave those fields as empty strings or empty arrays.

User's description:
\"\"\"{user_prompt}\"\"\"

Return a JSON object with EXACTLY this structure (no markdown, no code blocks, just raw JSON):
{{
  "personal": {{
    "name": "",
    "email": "",
    "phone": "",
    "address": "",
    "pincode": "",
    "linkedin": "",
    "github": "",
    "portfolio": ""
  }},
  "education": [
    {{
      "degree": "",
      "university": "",
      "location": "",
      "startDate": "",
      "endDate": "",
      "gpa": "",
      "coursework": ""
    }}
  ],
  "experience": [
    {{
      "company": "",
      "role": "",
      "location": "",
      "startDate": "",
      "endDate": "",
      "current": false,
      "bullets": ["ATS-optimized bullet point with action verb and metric"]
    }}
  ],
  "projects": [
    {{
      "name": "",
      "description": "",
      "technologies": "",
      "link": "",
      "bullets": ["Description of what was built and impact"]
    }}
  ],
  "achievements": ["Achievement description"],
  "skills": {{
    "languages": "Python, JavaScript, ...",
    "frameworks": "React, Django, ...",
    "tools": "Git, Docker, ...",
    "databases": "MySQL, MongoDB, ...",
    "softSkills": "Leadership, ..."
  }},
  "extracurricular": ["Activity description"]
}}

Important:
- Write professional, ATS-friendly bullet points for experience (start with action verbs, include metrics)
- Dates should be in YYYY-MM format if possible (e.g., "2023-06")
- If a field is not mentioned, leave it as empty string or empty array
- Return ONLY the JSON object"""

    response = model.generate_content(prompt)
    text = response.text.strip()

    # Try to extract JSON from potential markdown code blocks
    code_block_match = re.search(r'```(?:json)?\s*(\{.*?\})\s*```', text, re.DOTALL)
    if code_block_match:
        text = code_block_match.group(1)

    json_match = re.search(r'\{.*\}', text, re.DOTALL)
    if json_match:
        return json.loads(json_match.group())

    raise ValueError("Failed to parse AI response into structured data")
