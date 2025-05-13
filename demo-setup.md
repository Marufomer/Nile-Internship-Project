# Setting Up Demo Accounts for Testing

This guide will help you set up and test demo accounts for the School Management System.

## 1. Setup Demo Accounts

To create the demo accounts for testing, follow these steps:

1. Make sure your MongoDB server is running
2. Navigate to the server directory:
   ```
   cd server
   ```
3. Run the seed script to create demo accounts:
   ```
   npm run seed
   ```
4. You should see a confirmation message showing the created demo accounts

## 2. Test the Demo Accounts

After setting up the demo accounts, you can test them in the login page:

### Admin Account
- **Email**: admin@school.com
- **Password**: Admin123!
- **Expected Dashboard**: Admin Dashboard with statistics, recent students, and quick actions

### Teacher Account
- **Email**: teacher@school.com
- **Password**: Teacher123!
- **Expected Dashboard**: Teacher Dashboard

### Student Account
- **Email**: student@school.com
- **Password**: Student123!
- **Expected Dashboard**: Student Dashboard/Home

## 3. Troubleshooting

If you encounter login issues:

### Common Problems:
1. **"No user found" error**: The demo account was not created correctly. Rerun the seed script.
2. **"Invalid credentials" error**: The password might be incorrect. Double-check for typos.
3. **Server connection issues**: Make sure your backend server is running.

### Solution Steps:
1. Make sure the MongoDB server is running
2. Restart your backend server:
   ```
   cd server
   npm start
   ```
3. Check MongoDB to ensure the users were created:
   ```
   // Using MongoDB Compass or mongo shell
   db.users.find({email: {$in: ["admin@school.com", "teacher@school.com", "student@school.com"]}})
   ```
4. Clear your browser cache and try logging in again

## 4. Testing Different Roles

Each role has different permissions and views:

- **Admin**: Can manage students, teachers, fees, timetables, etc.
- **Teacher**: Can view assigned classes, manage grades, etc.
- **Student**: Can view their schedule, grades, fees, etc.

Try logging in with each account to test the different user experiences and ensure all functionality works as expected. 