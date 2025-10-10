@echo off
echo Starting Kalimtak Backend Server...
echo ==================================

REM Activate virtual environment
call venv\Scripts\Activate.bat

REM Start the FastAPI server
python app.py

pause