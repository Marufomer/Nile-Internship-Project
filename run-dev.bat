@echo off
echo Starting Smart School Management System Development Environment...
echo ---------------------------------------------------------------

rem Check if frontend directory exists
if not exist frontend (
    echo Error: Frontend directory not found!
    exit /b 1
)

rem Check if server directory exists
if not exist server (
    echo Error: Server directory not found!
    exit /b 1
)

echo Starting backend server...
start cmd /k "cd server && npm start"

echo Waiting for backend to initialize...
timeout /t 3 /nobreak > nul

echo Starting frontend development server...
start cmd /k "cd frontend && npm run dev"

echo Both servers are now running!
echo Backend: http://localhost:5003
echo Frontend: http://localhost:5173
echo.
echo Press Ctrl+C in each terminal window to stop the servers when done. 