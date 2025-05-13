# Complete Setup Guide for Smart School Management System

This guide will help you set up and test all aspects of the School Management System, including demo accounts for all roles.

## 1. Initial Setup

### Prerequisites
- Node.js and npm installed
- MongoDB installed and running
- Git (optional, for cloning the repository)

### Setup Steps

1. **Set up the backend environment:**
   ```bash
   cd server
   npm run create-env
   ```
   This creates an `.env` file with the following configuration:
   ```
   PORT=5002
   MONGODB_URL=mongodb://localhost:27017/schoolManagementSystem
   JWT_SECRET=schoolmanagementniletech123
   ```

2. **Create all demo accounts:**
   ```bash
   cd server
   npm run seed
   ```
   This will create 8 test accounts with different roles.

3. **Start the backend server:**
   ```bash
   cd server
   npm start
   ```

4. **Start the frontend application (in a new terminal):**
   ```bash
   cd frontend
   npm run dev
   ```

5. **Access the application:**
   Open your browser and go to: `http://localhost:5173` (or the port specified by your frontend)

## 2. Demo Accounts

We've created multiple demo accounts to test different roles and case sensitivity scenarios:

### Admin Accounts
| Email | Password | Role |
|-------|----------|------|
| admin@school.com | Admin123! | admin (lowercase) |
| admin2@school.com | Admin123! | Admin (uppercase) |

### Teacher Accounts
| Email | Password | Role |
|-------|----------|------|
| teacher@school.com | Teacher123! | teacher (lowercase) |
| teacher2@school.com | Teacher123! | Teacher (uppercase) |

### Student Accounts
| Email | Password | Role |
|-------|----------|------|
| student@school.com | Student123! | student (lowercase) |
| student2@school.com | Student123! | Student (uppercase) |

### Administrative/Manager Accounts
| Email | Password | Role |
|-------|----------|------|
| manager@school.com | Manager123! | administrative |
| manager2@school.com | Manager123! | Manager (uppercase) |

## 3. Testing the System

### Login Testing
1. Go to the login page
2. Try logging in with each of the demo accounts
3. Note which accounts work and which don't (this will help identify case sensitivity issues)
4. Check the server console for the debug logs that will show exactly where any login issues occur

### Role-Based Access Testing
After logging in with different accounts, you should see different dashboards:
- **Admin:** Full dashboard with statistics, student management, etc.
- **Teacher:** Teacher dashboard with class information, etc.
- **Student:** Student dashboard with courses, grades, etc.
- **Administrative/Manager:** Administrative dashboard with management functions

## 4. Troubleshooting

If you encounter any issues, refer to the `login-troubleshooting-guide.md` for detailed troubleshooting steps.

Common issues include:
- MongoDB connection problems
- Case sensitivity with roles
- Password hashing issues
- JWT token validation

### Quick Troubleshooting Commands

**Check MongoDB status:**
```bash
# For Windows
net start MongoDB
# For macOS/Linux
brew services list  # or systemctl status mongodb
```

**Verify database connection:**
```bash
mongo
use schoolManagementSystem
db.users.find({}).pretty()
```

**Clear browser storage:**
- Open DevTools (F12)
- Go to Application > Storage > Clear Site Data

## 5. System Tour

### Admin Features
- Student management
- Teacher management
- Fee management
- Timetable management
- Reporting and statistics

### Teacher Features
- Class management
- Grade assignment
- Attendance tracking
- Communication with students

### Student Features
- View schedule
- Access grades
- View fee information
- Communication with teachers

### Administrative Features
- System management
- User account management
- Configuration settings

## 6. Database Structure

The system uses MongoDB with the following main collections:
- users (authentication and profile data)
- students (student-specific data)
- teachers (teacher-specific data)
- timetables (scheduling information)
- fees (payment records)
- grades (academic performance)
- attendance (attendance records)

## 7. Security Notes

- All passwords are hashed using bcrypt
- Authentication uses JWT tokens
- Token expiration is handled automatically
- Role-based access control protects sensitive endpoints 