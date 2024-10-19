import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import recipeRoutes from "./routes/recipe.js";
import userRoutes from "./routes/users.js";

// Initialize express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json()); 

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://safeer:7989@cook-with-shaki.btw6x.mongodb.net/cook-with-shaki?retryWrites=true&w=majority&appName=cook-with-shaki"
  )
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
app.use("/api/recipe", recipeRoutes);  // This registers recipe routes under /api/recipe
app.use("/api/users", userRoutes);

