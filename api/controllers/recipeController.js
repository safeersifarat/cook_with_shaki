import Recipe from "../models/Recipe.js";

// Create Recipe
export const createRecipe = async (req, res) => {
  const {
    name,
    image,
    description,
    preparationTime,
    steps,
    videoLink,
    ingredients,
    cuisine,
  } = req.body;

  try {
    const recipe = new Recipe({
      name,
      image,
      description,
      preparationTime,
      steps,
      videoLink,
      ingredients,
      cuisine,
    });
    await recipe.save();

    res.status(201).json({ message: "Recipe created successfully", recipe });
  } catch (error) {
    res.status(500).json({ message: "Error creating recipe", error });
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
    res.status(500).json({ message: "Error fetching recipes", error });
  }
};

// Get random recipes for the Popular section
export const getRandomRecipes = async (req, res) => {
  try {
    const randomRecipes = await Recipe.aggregate([{ $sample: { size: 6 } }]);

    // Log only if the environment is set to development
    if (process.env.NODE_ENV === 'development') {
      console.log("Fetched random recipes for debugging:", randomRecipes);
    }

    res.json({ recipes: randomRecipes });
  } catch (error) {
    res.status(500).json({ message: "Error fetching random recipes", error });
  }
};

// Get random Kerala recipes for the Namma Kerala section
export const getKeralaRecipes = async (req, res) => {
  try {
    const keralaRecipes = await Recipe.aggregate([
      { $match: { cuisine: "Indian", subCuisine: "Kerala" } },
      { $sample: { size: 6 } }
    ]);
    res.json({ recipes: keralaRecipes });
  } catch (error) {
    res.status(500).json({ message: "Error fetching Kerala recipes", error });
  }
};

// Get a specific recipe by ID
export const getRecipeById = async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await Recipe.findById(id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recipe", error });
  }
};

// Update Recipe by ID
export const updateRecipe = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(id.trim(), req.body, {
      new: true,
    });

    if (!updatedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.json({ message: "Recipe updated successfully", updatedRecipe });
  } catch (error) {
    res.status(500).json({ message: "Error updating recipe", error });
  }
};

// Delete Recipe
export const deleteRecipe = async (req, res) => {
  let { id } = req.params;

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
