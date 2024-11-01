import express from "express";
import {
  createRecipe,
  getRecipes,
  deleteRecipe,
  updateRecipe,
  getRandomRecipes,
  getKeralaRecipes,
  getRecipeById // New import
} from "../controllers/recipeController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Create a new recipe
router.post("/create", authMiddleware, createRecipe);

// Get all recipes or filter by cuisine
router.get("/", getRecipes);

// Get random recipes for Popular section
router.get("/random", getRandomRecipes);

// Get random Kerala recipes for Namma Kerala section
router.get("/kerala", getKeralaRecipes);

router.get("/popular", getRandomRecipes); // This will map the /popular endpoint to the getRandomRecipes controller

// Get a specific recipe by ID
router.get("/:id", getRecipeById); // New route for fetching by ID

// Delete a recipe
router.delete("/delete/:id", authMiddleware, deleteRecipe);

// Update a recipe
router.put("/update/:id", authMiddleware, updateRecipe);

export default router;
