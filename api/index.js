import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js"; // Adjust path if necessary
import recipeRoutes from "./routes/recipe.js"; // Adjust path if necessary
import userRoutes from "./routes/users.js"; // Adjust path if necessary

// Initialize express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies

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
app.use("/api/recipe", recipeRoutes); // This should work for /api/recipe
app.use("/api/users", userRoutes);
