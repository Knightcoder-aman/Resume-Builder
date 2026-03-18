from pydantic import BaseModel
from typing import List, Optional, Dict, Any


class EnhanceRequest(BaseModel):
    api_key: str
    section: str
    index: int = 0
    data: Any


class SuggestSkillsRequest(BaseModel):
    api_key: str
    experience: List[Dict[str, Any]] = []
    projects: List[Dict[str, Any]] = []
    current_skills: Dict[str, str] = {}


class PromptGenerateRequest(BaseModel):
    api_key: str
    prompt: str


class PersonalDetails(BaseModel):
    name: str = ""
    email: str = ""
    phone: str = ""
    address: str = ""
    pincode: str = ""
    linkedin: str = ""
    github: str = ""
    portfolio: str = ""


class Education(BaseModel):
    degree: str = ""
    university: str = ""
    location: str = ""
    startDate: str = ""
    endDate: str = ""
    gpa: str = ""
    coursework: str = ""


class Experience(BaseModel):
    company: str = ""
    role: str = ""
    location: str = ""
    startDate: str = ""
    endDate: str = ""
    current: bool = False
    bullets: List[str] = []


class Project(BaseModel):
    name: str = ""
    description: str = ""
    technologies: str = ""
    link: str = ""
    bullets: List[str] = []


class Skills(BaseModel):
    languages: str = ""
    frameworks: str = ""
    tools: str = ""
    databases: str = ""
    softSkills: str = ""


class ResumeData(BaseModel):
    personal: PersonalDetails = PersonalDetails()
    education: List[Education] = []
    experience: List[Experience] = []
    projects: List[Project] = []
    achievements: List[str] = []
    skills: Skills = Skills()
    extracurricular: List[str] = []


class GenerateLatexRequest(BaseModel):
    resume_data: Dict[str, Any]
