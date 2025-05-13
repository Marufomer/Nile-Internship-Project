# Smart School Management System Development Script
Write-Host "Starting Smart School Management System Development Environment..." -ForegroundColor Cyan
Write-Host "---------------------------------------------------------------" -ForegroundColor Cyan

# Check if frontend directory exists
if (-not (Test-Path -Path ".\frontend")) {
    Write-Host "Error: Frontend directory not found!" -ForegroundColor Red
    exit 1
}

# Check if server directory exists
if (-not (Test-Path -Path ".\server")) {
    Write-Host "Error: Server directory not found!" -ForegroundColor Red
    exit 1
}

# Start the backend server
Write-Host "Starting backend server..." -ForegroundColor Yellow
Start-Process -FilePath "powershell" -ArgumentList "-Command cd .\server; npm start"

# Allow backend to initialize
Write-Host "Waiting for backend to initialize..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

# Start frontend development server
Write-Host "Starting frontend development server..." -ForegroundColor Green
Start-Process -FilePath "powershell" -ArgumentList "-Command cd .\frontend; npm run dev"

Write-Host "`nBoth servers are now running!" -ForegroundColor Cyan
Write-Host "Backend: http://localhost:5003" -ForegroundColor Yellow
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Green
Write-Host "`nPress Ctrl+C in each terminal window to stop the servers when done." -ForegroundColor Cyan 