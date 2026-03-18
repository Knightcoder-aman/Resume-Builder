# AI Resume Builder

Welcome to the AI Resume Builder! This application consists of a FastAPI backend to handle resume generation (and AI features) and a Next.js frontend for an interactive user interface.

## Tech Stack
### **Frontend**
- **Framework:** Next.js (React)
- **Environment:** Node.js
- **Styling:** CSS/Tailwind (Project dependent)

### **Backend**
- **Framework:** FastAPI (Python)
- **AI Integration:** Google Gemini API (for AI enhancements & suggestions)
- **Document Generation:** LaTeX (converts JSON data to ATS-friendly PDF via Overleaf integration)

---

## Prerequisites
- Node.js (for the frontend)
- Python 3.8+ (for the backend)

---

## 🚀 How to Start the Application

You will need to open **two separate terminal windows**: one for the backend and one for the frontend.

### 1. Start the Backend (FastAPI)
The backend is responsible for API requests, AI integrations, and LaTeX compilation.

1. Open a new terminal.
2. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
3. Install the required Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Start the FastAPI development server:
   ```bash
   python -m uvicorn main:app --reload
   ```
   *The backend will be running on `http://localhost:8000`.*

---

### 2. Start the Frontend (Next.js)
The frontend contains the interactive React forms and the preview interface.

1. Open a **second** new terminal.
2. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
3. Install the required Node.js dependencies:
   ```bash
   npm install
   ```
4. Start the Next.js development server:
   ```bash
   npm run dev
   ```
   *The frontend will be running on `http://localhost:3000`.*

---

## Access the App
Once both servers are running, open your browser and navigate to:
**[http://localhost:3000](http://localhost:3000)**

*(Note: Ensure your `.env` files are properly configured if you are using AI keys or external API services.)*
