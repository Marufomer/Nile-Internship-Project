const express = require('express');
const User = require("../model/Usermodel");
const bcrypt = require("bcryptjs");
const generateToken = require("../lib/Tokengenerator");
const Cloudinary = require("../lib/Cloudinary");

// Updated signup function for Authcontroller.js
// Replace the existing signup function with this one

module.exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role, ProfilePic } = req.body;

    if (!firstName || !lastName || !email || !password || !role) {
      return res
        .status(400)
        .json({ error: "Please provide all necessary information" });
    }

    const validRoles = ["Teacher", "Manager", "Admin", "Student", "teacher", "manager", "admin", "student", "administrative"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({
        error: "The role should be one of: Teacher/teacher, Manager/manager, Admin/admin, or Student/student",
      });
    }

    const duplicatedUser = await User.findOne({ email });
    if (duplicatedUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedpassword = await bcrypt.hash(password, 10);
    
    let profilePicUrl = "";
    
    // Upload profile picture to Cloudinary if provided
    if (ProfilePic) {
      try {
        const uploadResponse = await Cloudinary.uploader.upload(ProfilePic, {
          folder: "profile_school_managment_system",
          upload_preset: "upload",
        });
        profilePicUrl = uploadResponse.secure_url;
      } catch (cloudinaryError) {
        console.error("Cloudinary upload failed:", cloudinaryError);
        // Continue with empty profile pic if upload fails
      }
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedpassword,
      ProfilePic: profilePicUrl,
      role,
    });

    const savedUser = await newUser.save();
    const token = await generateToken(savedUser, res);

    res.status(201).json({
      message: "Signup successful",
      savedUser: {
        id: savedUser._id,
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        email: savedUser.email,
        role: savedUser.role,
        ProfilePic: savedUser.ProfilePic,
        token,
      },
    });
  } catch (error) {
    console.error("Error during signup:", error.message);
    res.status(400).json({ error: "Error during signup: " + error.message });
  }
}; 