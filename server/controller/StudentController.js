const Student = require("../model/Studentmodel");
const Grade = require("../model/Grade");
const cloudinary = require("../lib/Cloudinary");

module.exports.UpdateProfile = async (req, res) => {

  const ProfilePic = req.file;
  try {
    const userId = req.user?._id;
    const { firstName, lastName, email, phone, Address, Dateofbirth, gender } =
      req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !Address ||
      !Dateofbirth ||
      !gender
    ) {
      return res
        .status(400)
        .json({ error: "Please provide all neccessary information" });
    }

    
    const newStudent = new Student({
      firstName,
      lastName,
      email,
      phone,
      Address,
      Dateofbirth,
      gender,
    });


    await newStudent.save();

    if (ProfilePic) {
      if (req.file) {
        await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "profile_school_management_system",
              upload_preset: "upload",
            },
            async (error, result) => {
              if (error) {
                console.error("Cloudinary upload failed:", error);
                return reject(error);
              }

              newStudent.profileImage = result.secure_url;
              await newStudent.save();
              resolve();
            }
          );
          stream.end(req.file.buffer);
        });
      }
    }


    res.status(201).json({
      message: "Student profile created successfully",
    });
  } catch (error) {
    console.error("Error during creating Student profile:", error.message);
    res
      .status(400)
      .json({
        error: "Error during creating Student profile: " + error.message,
      });
  }
};

exports.DeleteProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const deleteStudent = await Student.findByIdAndDelete(userId);
    if (!deleteStudent) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User profile deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
      error,
    });
  }
};

module.exports.getallStudents = async (req, res) => {
  try {
    const allStudents = await Student.find();
    res.json({ students: allStudents });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.GetAcadamicRecords = async (req, res) => {
  try {
    const { userId } = req.params;
    const Studentinfo = await Student.findById(userId);
    if (!Studentinfo) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const grades = await Grade.find({ userId });
    if (grades.length === 0) {
      return res.status(404).json({
        message: "No academic records found",
      });
    }

    res.status(200).json({
      academicRecords: grades,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
      error,
    });
  }
};
