# Smart School Management System - Quick Start Guide

This guide will help you quickly set up and run the Smart School Management System.

## Prerequisites

- Node.js (v14+)
- MongoDB (v4+) or MongoDB Atlas account
- npm or yarn

## Setup Instructions

### 1. Clone the Repository

If you haven't already cloned the repository, do so with:

```bash
git clone <repository-url>
cd Smart-School-Management-System
```

### 2. Backend Setup

Navigate to the server directory and install dependencies:

```bash
cd server
npm install
```

Create an environment file:

```bash
npm run create-env
```

Seed the database with demo data:

```bash
npm run seed
```

Start the backend server:

```bash
npm start
```

The server should be running on http://localhost:5003

### 3. Frontend Setup

Open a new terminal window, navigate to the frontend directory and install dependencies:

```bash
cd frontend
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend should be running on http://localhost:5173

### 4. Quick Start (Windows PowerShell)

For Windows users, we've created a PowerShell script to start both servers simultaneously:

```bash
.\start-app.ps1
```

## Login Credentials

Use these demo accounts to test different roles:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@school.com | Admin123! |
| Teacher | teacher@school.com | Teacher123! |
| Student | student@school.com | Student123! |
| Administrative | manager@school.com | Manager123! |

## Key Features

- Enhanced Administrative Dashboard
- Modern UI with smooth animations
- Role-based access control
- Student and teacher management
- Fee tracking
- Timetable management
- Responsive design for all devices

## Troubleshooting

If you encounter issues:

1. Make sure MongoDB is running
2. Check the connection string in your `.env` file
3. Ensure all dependencies are installed
4. Check browser console for errors
5. Verify that ports 5003 (backend) and 5173 (frontend) are available

For detailed troubleshooting, refer to `login-troubleshooting-guide.md`. 