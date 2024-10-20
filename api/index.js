import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import recipeRoutes from "./routes/recipe.js";
import userRoutes from "./routes/users.js";
import dotenv from "dotenv";
import cors from 'cors';

const app = express();
app.use(express.json());


app.use(cors());

// Load env variables from key.env
dotenv.config({ path: './api/key.env' }); // Make sure the path is correct


 

// Initialize express app


// Middleware to parse JSON bodies


// Connect to MongoDB
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
