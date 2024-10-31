import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import multer from "multer";

// Set up multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const upload = multer({ storage });

// Register a new user
export const register = async (req, res) => {
  const { name, email, password, phone } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ token, message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Login an existing user
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller to get user profile
export const getUserProfile = async (req, res) => {
  try {
    // Fetch user data by ID and select specific fields
    const user = await User.findById(req.user.userId).select("name phone image"); // Ensure correct field names
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


// Controller to update user profile
export const updateUserProfile = async (req, res) => {
  const { name, phone } = req.body;

  // Validate phone number format
  const phoneRegex = /^[0-9]{10}$/;
  if (phone && !phoneRegex.test(phone)) {
    return res.status(400).json({ message: "Invalid phone number format" });
  }

  const updatedData = {};
  if (name) updatedData.name = name;
  if (phone) updatedData.phone = phone;
  if (req.file) updatedData.image = req.file.filename;

  try {
    console.log("Attempting to update user profile...");

    // Attempt to update the user's profile
    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
      updatedData,
      { new: true, runValidators: true }
    ).select("name phone image");

    if (!updatedUser) {
      console.log("User not found, sending 404 response...");
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User profile updated successfully, sending response...");
    return res.json({
      message: "Profile updated successfully",
      updatedUser: {
        name: updatedUser.name,
        phone: updatedUser.phone,
        image: updatedUser.image,
      },
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

