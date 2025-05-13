const mongoose = require('mongoose');
const User = require('./model/Usermodel');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    // Use the MongoDB URL directly with the nile database - remove deprecated options
    await mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/nile');
    console.log('MongoDB connected successfully to nile database');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Demo users to be added - expanded to include all roles
const demoUsers = [
  // Admin user
  {
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@school.com',
    password: 'Admin123!',
    role: 'admin',
    ProfilePic: '',
  },
  // Admin user - uppercase role alternative 
  {
    firstName: 'Admin',
    lastName: 'Alt',
    email: 'admin2@school.com',
    password: 'Admin123!',
    role: 'Admin',
    ProfilePic: '',
  },
  // Teacher user
  {
    firstName: 'Teacher',
    lastName: 'User',
    email: 'teacher@school.com',
    password: 'Teacher123!',
    role: 'teacher',
    ProfilePic: '',
  },
  // Teacher user - uppercase role alternative
  {
    firstName: 'Teacher',
    lastName: 'Alt',
    email: 'teacher2@school.com',
    password: 'Teacher123!',
    role: 'Teacher',
    ProfilePic: '',
  },
  // Student user
  {
    firstName: 'Student',
    lastName: 'User',
    email: 'student@school.com',
    password: 'Student123!',
    role: 'student',
    ProfilePic: '',
  },
  // Student user - uppercase role alternative
  {
    firstName: 'Student',
    lastName: 'Alt',
    email: 'student2@school.com',
    password: 'Student123!',
    role: 'Student',
    ProfilePic: '',
  },
  // Administrative/Manager user
  {
    firstName: 'Manager',
    lastName: 'User',
    email: 'manager@school.com',
    password: 'Manager123!',
    role: 'administrative',
    ProfilePic: '',
  },
  // Manager user - uppercase role alternative
  {
    firstName: 'Manager',
    lastName: 'Alt',
    email: 'manager2@school.com',
    password: 'Manager123!',
    role: 'Manager',
    ProfilePic: '',
  },
];

// Seed function to add users
const seedUsers = async () => {
  try {
    await connectDB();
    
    // Clear existing demo users to prevent duplicates
    for (const demoUser of demoUsers) {
      await User.findOneAndDelete({ email: demoUser.email });
    }
    
    // Hash passwords and create users
    const createdUsers = [];
    
    for (const demoUser of demoUsers) {
      const hashedPassword = await bcrypt.hash(demoUser.password, 10);
      
      const newUser = new User({
        ...demoUser,
        password: hashedPassword,
      });
      
      try {
        const savedUser = await newUser.save();
        createdUsers.push({
          email: savedUser.email,
          role: savedUser.role,
          _id: savedUser._id,
        });
      } catch (error) {
        console.error(`Error saving user ${demoUser.email}:`, error.message);
      }
    }
    
    console.log('Demo users created successfully:');
    console.table(createdUsers);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding users:', error);
    process.exit(1);
  }
};

// Run the seed function
seedUsers(); 