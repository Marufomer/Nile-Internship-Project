# Smart School Management System Startup Script
Write-Host "Starting Smart School Management System..." -ForegroundColor Cyan
Write-Host "----------------------------------------" -ForegroundColor Cyan

# Function to check if a directory exists
function Test-DirectoryExists {
    param (
        [string]$Path
    )
    return Test-Path -Path $Path -PathType Container
}

# Check if frontend directory exists
if (-not (Test-DirectoryExists -Path ".\frontend")) {
    Write-Host "Error: Frontend directory not found!" -ForegroundColor Red
    exit 1
}

# Check if server directory exists
if (-not (Test-DirectoryExists -Path ".\server")) {
    Write-Host "Error: Server directory not found!" -ForegroundColor Red
    exit 1
}

# Start the backend server
Write-Host "Starting backend server..." -ForegroundColor Yellow
Start-Process -FilePath "powershell" -ArgumentList "-NoProfile -ExecutionPolicy Bypass -Command cd .\server; npm start"

# Allow backend to initialize
Write-Host "Waiting for backend to initialize..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# Start frontend development server
Write-Host "Starting frontend development server..." -ForegroundColor Green
Start-Process -FilePath "powershell" -ArgumentList "-NoProfile -ExecutionPolicy Bypass -Command cd .\frontend; npm run dev"

Write-Host "`nBoth servers are now running!" -ForegroundColor Cyan
Write-Host "Backend: http://localhost:5003" -ForegroundColor Yellow
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Green
Write-Host "`nPress Ctrl+C in each terminal window to stop the servers when done." -ForegroundColor Cyan 