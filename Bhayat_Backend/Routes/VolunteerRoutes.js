import express from "express";
import Volunteer from "../Models/Volunteer.js";
import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";
import multer from "multer";
import UserSignupAuth from "../middlewares/Auth.js";
import User from '../Models/UserSignup.js';
const volunteerRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join("uploads", "VolunteerImage");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

// Multer Middleware with File Type & Size Validation
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"));
    }
  }
});

// Volunteer Registration Route
volunteerRouter.post("/register", upload.single("image"), async (req, res) => {
  try {
    const { name, email, password, panCard, state, address, validity } = req.body;
    
    // 🔹 1. Check if a User with this email already exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: "You must register as a User first before becoming a Volunteer." 
      });
    }

     // 🔹 2. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

     // 🔹 3. Get the next serial number
    const lastVolunteer = await Volunteer.findOne().sort({ serialno: -1 });
    const newSerialNo = lastVolunteer ? lastVolunteer.serialno + 1 : 1;
    
    // 🔹 4. Create the Volunteer
    const newVolunteer = new Volunteer({
      name,
      email,
      password: hashedPassword,
      panCard,
      state,
      address,
      image: req.file?.path ? `/uploads/VolunteerImage/${req.file.filename}` : null,
      position: "",
      serialno: newSerialNo,
      validity: validity ? new Date(validity) : null, // Convert validity to Date type
      user: existingUser._id, // 🔥 Link to the User document
    });

    const savedVolunteer = await newVolunteer.save();
 
    // 🔹 5. Update the User to mark them as a Volunteer
    existingUser.isVolunteer = true;
    await existingUser.save();

    res.status(201).json({ 
      success: true,
    message: "Volunteer registered successfully",
    volunteer: savedVolunteer 
    });
  } catch (error) {
    res.status(500).json({
      success:false,
      message: "Error registering volunteer",
     error: error.message });
  }
});

// Get All Volunteers (For Admin Panel)
volunteerRouter.get("/all", async (req, res) => {
  try {
    const volunteers = await Volunteer.find().select("-password"); // Exclude password field
    res.status(200).json(volunteers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching volunteers", error: error.message });
  }
});

// Update Volunteer Position & Validity (For Admin Panel)
volunteerRouter.patch("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let { position, validity } = req.body;

    // Convert validity to Date object
    validity = validity ? new Date(validity) : null;

    const updatedVolunteer = await Volunteer.findByIdAndUpdate(
      id,
      { position, validity },
      { new: true }
    );

    if (!updatedVolunteer) {
      return res.status(404).json({ message: "Volunteer not found" });
    }

    res.status(200).json(updatedVolunteer);
  } catch (error) {
    res.status(500).json({ message: "Error updating position", error: error.message });
  }
});

// Fetch Logged-in Volunteer Profile
// volunteerRouter.get("/profile", async (req, res) => {
//   try {
//     const volunteerId = req.query.id; // Temporary way to send ID from frontend

//     if (!volunteerId) {
//       return res.status(400).json({ message: "Volunteer ID is required" });
//     }

//     const volunteer = await Volunteer.findById(volunteerId).select("-password"); // Exclude password

//     if (!volunteer) {
//       return res.status(404).json({ message: "Volunteer not found" });
//     }

//     res.status(200).json({ 
//       volunteer, 
//       serialno: volunteer.serialno 
//     }); // Return the stored serialNumber
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching profile", error: error.message });
//   }
// });

volunteerRouter.get("/profile", UserSignupAuth, async (req, res) => {
  try {
    const volunteerId = req.body.userID; // Extracted from JWT

    if (!volunteerId) {
      return res.status(400).json({ message: "Unauthorized access." });
    }

    const volunteer = await Volunteer.findById(volunteerId).select("-password"); // Exclude password

    if (!volunteer) {
      return res.status(404).json({ message: "Volunteer not found" });
    }

    res.status(200).json({ 
      success: true,
      volunteer, 
      serialno: volunteer.serialno 
    }); // Return the stored serialNumber
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error: error.message });
  }
});

export default volunteerRouter;