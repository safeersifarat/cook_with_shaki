// routes/recipe.js
import express from 'express';
import { createRecipe, getRecipes } from '../controllers/recipeController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';  // For protected routes

const router = express.Router();

// Create a new recipe
router.post('/create', authMiddleware, createRecipe);

// Get all recipes or filter by cuisine
router.get('/', getRecipes);

export default router;
