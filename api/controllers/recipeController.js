// controllers/recipeController.js
import Recipe from '../models/Recipe.js';

// Create Recipe
export const createRecipe = async (req, res) => {
  const { name, image, description, preparationTime, steps, youtubeLink, ingredients, cuisine } = req.body;

  try {
    const recipe = new Recipe({ name, image, description, preparationTime, steps, youtubeLink, ingredients, cuisine });
    await recipe.save();
    
    res.status(201).json({ message: 'Recipe created successfully', recipe });
  } catch (error) {
    res.status(500).json({ message: 'Error creating recipe', error });
  }
};

// Get Recipes (with optional cuisine filter)
export const getRecipes = async (req, res) => {
  const { cuisine } = req.query;

  try {
    const recipes = cuisine 
      ? await Recipe.find({ cuisine }) 
      : await Recipe.find();
    
    res.json({ recipes });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recipes', error });
  }
};
