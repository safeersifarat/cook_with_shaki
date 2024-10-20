// routes/recipe.js
import express from "express";
import {
  createRecipe,
  getRecipes,
  deleteRecipe,
  updateRecipe,
} from "../controllers/recipeController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js"; // For protected routes

const router = express.Router();

// Create a new recipe
router.post("/create", authMiddleware, createRecipe);

// Get all recipes or filter by cuisine
router.get("/", getRecipes); // This should handle GET requests at /api/recipe

// Delete a recipe
router.delete("/delete/:id", authMiddleware, deleteRecipe); // Adjust according to your setup

// Update a recipe
router.put("/update/:id", authMiddleware, updateRecipe); // Adjust according to your setup

export default router;
