# MongoDB Installation and Setup Guide

Follow these steps to install and configure MongoDB for your Smart School Management System.

## 1. Install MongoDB Community Edition

1. **Download MongoDB Community Server**:
   - Go to [MongoDB Download Center](https://www.mongodb.com/try/download/community)
   - Select the version (recommended: latest LTS version)
   - Select your platform (Windows)
   - Select "msi" as the package
   - Click Download

2. **Run the installer**:
   - Double-click the downloaded .msi file
   - Follow the installation wizard
   - Choose "Complete" setup type
   - **Important**: Make sure "Install MongoDB as a Service" is checked
   - Click "Install"

3. **Verify installation**:
   - MongoDB should be installed in `C:\Program Files\MongoDB\Server\[version]`
   - The MongoDB service should be running automatically

## 2. Test MongoDB Connection

1. **Using MongoDB Compass** (GUI tool):
   - MongoDB Compass should have been installed with MongoDB
   - Open MongoDB Compass from the Start menu
   - Connect using the connection string: `mongodb://localhost:27017`
   - You should see a welcome screen and available databases

2. **Using our test script**:
   - Open a command prompt or PowerShell window
   - Navigate to your project folder:
     ```
     cd C:\Users\hp\Desktop\Nile_Technology_Smart-School-Management-System\server
     ```
   - Run the test script:
     ```
     node test-mongo-connection.js
     ```
   - You should see: "✅ Connected to MongoDB (nile)"

## 3. Common Issues and Troubleshooting

### MongoDB Service Not Running

If you get connection errors:

1. **Check if MongoDB service is running**:
   - Press `Win + R`, type `services.msc`, and press Enter
   - Look for "MongoDB Server" in the list
   - If it's not running, right-click and select "Start"
   - If it's not listed, MongoDB may not be installed correctly

2. **Start MongoDB manually**:
   - Open Command Prompt as Administrator
   - Run:
     ```
     net start MongoDB
     ```

### Port Issues

MongoDB uses port 27017 by default. If another application is using this port:

1. **Check port usage**:
   - Open Command Prompt as Administrator
   - Run:
     ```
     netstat -ano | findstr 27017
     ```
   - If you see something using this port, you'll need to either:
     - Stop that process
     - Configure MongoDB to use a different port

## 4. Create Demo Accounts

After MongoDB is running:

1. **Create the demo accounts**:
   ```
   cd server
   npm run seed
   ```

2. **Verify accounts were created**:
   ```
   npm run check-mongo
   ```

## 5. Start the Application

1. **Start the backend**:
   ```
   cd server
   npm start
   ```

2. **Start the frontend** (in a new terminal):
   ```
   cd frontend
   npm run dev
   ```

3. **Access the application** in your browser:
   - Open: http://localhost:5173
   - Login with one of the demo accounts (e.g., admin@school.com / Admin123!) 