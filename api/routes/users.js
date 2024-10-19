import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { authenticateJWT } from "../middlewares/auth.js";

const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
  const { email, password, name, profilePicture } = req.body;
  
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, password: hashedPassword, name, profilePicture });

  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: "Registration failed" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(400).send("Email not found");
  const validPassword = await bcrypt.compare(password, user.password);
  
  if (!validPassword) return res.status(400).send("Invalid password");

  const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.header("Authorization", token).json({ token });
});

// Update User Info
router.put("/:id", authenticateJWT, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: "Update failed" });
  }
});

export default router;
