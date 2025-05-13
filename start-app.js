const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Check if directories exist
const frontendDir = path.join(__dirname, 'frontend');
const serverDir = path.join(__dirname, 'server');

if (!fs.existsSync(frontendDir)) {
  console.error('\x1b[31mError: Frontend directory not found!\x1b[0m');
  process.exit(1);
}

if (!fs.existsSync(serverDir)) {
  console.error('\x1b[31mError: Server directory not found!\x1b[0m');
  process.exit(1);
}

// Function to start a process in a directory
function startProcess(command, args, cwd, name) {
  console.log(`\x1b[33mStarting ${name}...\x1b[0m`);
  
  const proc = spawn(command, args, { 
    cwd,
    shell: true,
    stdio: 'pipe',
    windowsHide: false
  });
  
  // Handle stdout
  proc.stdout.on('data', (data) => {
    console.log(`\x1b[36m[${name}]\x1b[0m ${data.toString().trim()}`);
  });
  
  // Handle stderr
  proc.stderr.on('data', (data) => {
    console.error(`\x1b[31m[${name} ERROR]\x1b[0m ${data.toString().trim()}`);
  });
  
  // Handle process exit
  proc.on('close', (code) => {
    if (code !== 0) {
      console.log(`\x1b[31m${name} process exited with code ${code}\x1b[0m`);
    }
  });
  
  return proc;
}

// Start the backend server
const backendProcess = startProcess('npm', ['start'], serverDir, 'Backend');

// Wait a bit before starting the frontend to allow backend to initialize
console.log('\x1b[33mWaiting for backend to initialize...\x1b[0m');
setTimeout(() => {
  // Start the frontend server
  const frontendProcess = startProcess('npm', ['run', 'dev'], frontendDir, 'Frontend');
  
  console.log('\x1b[32m\nBoth servers are now running!\x1b[0m');
  console.log('\x1b[33mBackend: http://localhost:5003\x1b[0m');
  console.log('\x1b[36mFrontend: http://localhost:5173\x1b[0m');
  console.log('\x1b[0m\nPress Ctrl+C to stop both servers.\x1b[0m');
  
  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n\x1b[33mShutting down servers...\x1b[0m');
    backendProcess.kill();
    frontendProcess.kill();
    process.exit(0);
  });
  
}, 3000); // 3 second delay 