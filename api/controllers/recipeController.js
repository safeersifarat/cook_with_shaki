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

// Update Recipe by ID
export const updateRecipe = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(id.trim(), req.body, { new: true });

    if (!updatedRecipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.json({ message: 'Recipe updated successfully', updatedRecipe });
  } catch (error) {
    res.status(500).json({ message: 'Error updating recipe', error });
  }
};

// Delete Recipe
export const deleteRecipe = async (req, res) => {
  let { id } = req.params;

  // Clean up the ID by trimming any extra spaces or newlines
  id = id.trim();

  try {
    const recipe = await Recipe.findByIdAndDelete(id);
    
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    
    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting recipe", error });
  }
};
