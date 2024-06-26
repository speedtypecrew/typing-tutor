@echo off
REM Get the directory path that the .bat file is located in
set "SCRIPT_DIR=%~dp0"

REM Change the directory to that path
cd /d "%SCRIPT_DIR%"

REM Run a terminal command (replace 'your_command_here' with the actual command you want to run)
echo "Starting Django Server!"
py manage.py runserver