@echo off
echo Setting up Kalimtak Backend Environment...
echo ==========================================

REM Create virtual environment
echo Creating virtual environment...
python -m venv venv

REM Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\Activate.bat

REM Upgrade pip
echo Upgrading pip...
python -m pip install --upgrade pip

REM Install dependencies
echo Installing dependencies...
pip install -r requirements.txt

echo.
echo Backend environment setup complete!
echo To run the server, execute: run.bat
pause