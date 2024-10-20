import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import { authenticateJWT } from "../middlewares/auth.js";

const router = express.Router();

// Update user information
router.put("/:id", authenticateJWT, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: "Update failed" });
  }
});

export default router;
