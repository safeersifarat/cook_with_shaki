// api/index.js

import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import recipeRoutes from "./routes/recipe.js";
import userRoutes from "./routes/users.js";
import dotenv from "dotenv";
import cors from 'cors';
import path from "path";

dotenv.config({ path: './api/key.env' });

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB is connected");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("Database connection error:", err);
  });

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/recipe", recipeRoutes);
app.use("/api/users", userRoutes);

// Serve static files for uploads
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

export default app;
