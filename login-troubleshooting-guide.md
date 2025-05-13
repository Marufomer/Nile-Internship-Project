# Login Troubleshooting Guide

If you're having issues logging in with the demo accounts, follow these step-by-step troubleshooting instructions.

## 1. Check MongoDB Connection

The most common issue is the MongoDB connection. Make sure:

1. MongoDB is running on your system
2. You have a proper `.env` file in the server directory containing:
   ```
   PORT=5002
   MONGODB_URL=mongodb://localhost:27017/schoolManagementSystem
   JWT_SECRET=schoolmanagementniletech123
   ```

If the `.env` file doesn't exist, create it with the content above.

## 2. Seed the Demo Accounts

The demo accounts need to be added to your database:

1. Make sure the MongoDB URL in your `.env` file is correct
2. Run the seed script:
   ```
   cd server
   npm run seed
   ```
   
If you see any errors, note them down for further troubleshooting.

## 3. Check Server Response

Start your backend server and check the console for any errors:

```
cd server
npm start
```

Common errors include:
- MongoDB connection issues
- Schema validation errors
- Port conflicts

## 4. Test API Endpoints Directly

You can use a tool like Postman or curl to test the login API directly:

```
curl -X POST http://localhost:5002/api/auth/login -H "Content-Type: application/json" -d '{"email":"admin@school.com","password":"Admin123!"}'
```

This helps isolate whether the issue is with the backend or frontend.

## 5. Check Browser Network Tab

1. Open your application in Chrome/Firefox
2. Open Developer Tools (F12)
3. Go to the Network tab
4. Try to log in with a demo account
5. Look for the login request and check:
   - Request payload (should have email and password)
   - Response (error messages)
   - Status code (should be 200 or 201 for success)

## 6. Verify Role Case Sensitivity

The system might be case-sensitive with roles. Make sure the role in the database matches exactly what the frontend expects:

- 'admin' (lowercase) - for admin users
- 'teacher' (lowercase) - for teacher users
- 'student' (lowercase) - for student users

## 7. Clear Local Storage

Your browser might have old authentication data:

1. Open Developer Tools (F12)
2. Go to Application tab
3. Select Local Storage on the left
4. Clear all items related to your application
5. Try logging in again

## 8. Database Verification

If all else fails, connect directly to your MongoDB database and check if the users exist:

```js
// Using MongoDB Compass or mongo shell
db.users.find({email: {$in: ["admin@school.com", "teacher@school.com", "student@school.com"]}})
```

## 9. Manual User Creation

If the seed script is failing, you can manually add a test user:

1. Open MongoDB Compass
2. Connect to your database
3. Find the "users" collection
4. Add a new document with:
   ```json
   {
     "firstName": "Admin",
     "lastName": "User",
     "email": "admin@school.com",
     "password": "$2a$10$XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", // This should be a bcrypt hash of "Admin123!"
     "role": "admin",
     "ProfilePic": "",
     "createdAt": new Date()
   }
   ```

## 10. Backend Password Check Debug

You might need to modify the auth controller to log more debug information. Add console logs in the login function:

```js
console.log("Login attempt:", email);
console.log("User found:", !!duplicatedUser);
console.log("Password match:", hasedpassword);
```

This can help identify exactly where the login is failing. 