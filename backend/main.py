from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import (
    EnhanceRequest,
    SuggestSkillsRequest,
    PromptGenerateRequest,
    GenerateLatexRequest,
)
from services.gemini_service import enhance_bullets, suggest_skills, generate_from_prompt
from services.latex_service import generate_latex

app = FastAPI(
    title="Resume Builder API",
    description="ATS-Friendly LaTeX Resume Builder with AI",
    version="1.0.0",
)

# CORS — allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Resume Builder API is running 🚀", "status": "ok"}


@app.post("/api/enhance")
async def enhance_endpoint(req: EnhanceRequest):
    """Enhance experience bullet points using AI."""
    try:
        if req.section == "experience":
            if isinstance(req.data, list) and 0 <= req.index < len(req.data):
                entry = req.data[req.index]
            elif isinstance(req.data, dict):
                entry = req.data
            else:
                raise ValueError("Invalid experience data format")

            enhanced = await enhance_bullets(req.api_key, entry)
            return {"enhanced_bullets": enhanced}
        else:
            raise HTTPException(status_code=400, detail=f"Enhancement not supported for section: {req.section}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/suggest-skills")
async def suggest_skills_endpoint(req: SuggestSkillsRequest):
    """Suggest skills based on experience and projects."""
    try:
        suggested = await suggest_skills(
            req.api_key,
            [exp if isinstance(exp, dict) else exp.dict() for exp in req.experience],
            [proj if isinstance(proj, dict) else proj.dict() for proj in req.projects],
            req.current_skills,
        )
        return {"suggested_skills": suggested}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/generate-from-prompt")
async def generate_from_prompt_endpoint(req: PromptGenerateRequest):
    """Generate structured resume data from a free-text prompt."""
    try:
        if not req.prompt.strip():
            raise HTTPException(status_code=400, detail="Prompt cannot be empty")

        resume_data = await generate_from_prompt(req.api_key, req.prompt)
        return {"resume_data": resume_data}
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/generate-latex")
async def generate_latex_endpoint(req: GenerateLatexRequest):
    """Generate LaTeX code from structured resume data."""
    try:
        latex = generate_latex(req.resume_data)
        return {"latex": latex}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
