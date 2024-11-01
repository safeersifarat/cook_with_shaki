import axios from 'axios';
import mongoose from 'mongoose';
import cron from 'node-cron';
import Recipe from './models/Recipe.js'; // Ensure this path is correct for your setup

const mongoURI = 'mongodb+srv://safeer:7989@cook-with-shaki.btw6x.mongodb.net/cook-with-shaki?retryWrites=true&w=majority&appName=cook-with-shaki';
const spoonacularApiKey = 'f3d6ebae67194c44aaa91d79b6c867ea';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const fetchRecipes = async () => {
    try {
        // Set timeout and make request to Spoonacular API
        const response = await axios.get(`https://api.spoonacular.com/recipes/random`, {
            params: { apiKey: spoonacularApiKey, number: 10 },
            timeout: 5000  // 5-second timeout
        });

        const recipes = response.data.recipes;

        const validCuisines = ['Indian', 'American', 'Chinese', 'Asian', 'Mexican', 'Thai'];
        const validSubCuisines = ['Kerala', 'North Indian', 'South Indian', 'Punjabi', 'Mughlai'];

        const formattedRecipes = recipes.map(recipe => {
            const cuisine = validCuisines.includes(recipe.cuisines[0]) ? recipe.cuisines[0] : 'Indian'; 
            const subCuisine = validSubCuisines.includes(recipe.cuisines[0]) ? recipe.cuisines[0] : 'Kerala';

            if (!recipe.image || !validCuisines.includes(cuisine)) {
                console.warn('Skipping recipe due to missing required fields or invalid cuisine:', recipe.title);
                return null;
            }

            return {
                name: recipe.title,
                image: recipe.image,
                description: recipe.summary,
                preparationTime: recipe.readyInMinutes,
                steps: recipe.instructions,
                videoLink: recipe.sourceUrl,
                quantity: recipe.servings,
                cuisine,
                subCuisine
            };
        }).filter(recipe => recipe !== null);

        if (formattedRecipes.length > 0) {
            await Recipe.insertMany(formattedRecipes);
            console.log('Recipes added successfully!');
        } else {
            console.warn('No valid recipes to insert');
        }
    } catch (error) {
        if (error.code === 'ECONNABORTED') {
            console.error('Request timed out while fetching recipes');
        } else if (error.response) {
            console.error('API responded with error:', error.response.status, error.response.statusText);
        } else {
            console.error('Error fetching recipes:', error.message);
        }
    }
};

// Run fetchRecipes initially
fetchRecipes().then(() => mongoose.connection.close());

// Schedule to run every day at midnight
cron.schedule('0 0 * * *', async () => {
    console.log('Fetching recipes...');
    await fetchRecipes();
});
