// models/Recipe.js
import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  preparationTime: { type: String, required: true },
  steps: { type: [String], required: true },
  youtubeLink: { type: String },
  ingredients: { type: [String], required: true },
  cuisine: { type: String, enum: ['Indian', 'American', 'Chinese', 'Asian', 'Mexican', 'Thai'], required: true },
});

export default mongoose.model('Recipe', recipeSchema);
