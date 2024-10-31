import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import recipeRoutes from "./routes/recipe.js";
import userRoutes from "./routes/users.js"; // Ensure this path is correct if using different folder names
import dotenv from "dotenv";
import cors from 'cors';
import path from "path"; // Required for the uploads route

dotenv.config({ path: './api/key.env' }); // Load environment variables

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB is connected");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/recipe", recipeRoutes);
app.use("/api/users", userRoutes);
app.use("/uploads", express.static(path.join(path.resolve(), "uploads"))); // Serve static files
