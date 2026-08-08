@echo off
echo Starting AgriVision AI Development Servers...

start cmd /k "cd backend && venv\Scripts\activate && uvicorn main:app --reload --port 8000"
start cmd /k "cd frontend && npm run dev"

echo Backend running on http://localhost:8000
echo Frontend running on http://localhost:5173