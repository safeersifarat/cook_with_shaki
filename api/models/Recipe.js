// models/Recipe.js
import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  preparationTime: {
    type: String,
  },
  steps: [String],
  videoLink: {
    type: String,
  },
  ingredients: [
    {
      name: { type: String, required: true },
      quantity: { type: String, required: true },
    },
  ],
  cuisine: {
    type: String,
    enum: ['Indian', 'American', 'Chinese', 'Asian', 'Mexican', 'Thai'],
    required: true,
  },
});


export default mongoose.model('Recipe', recipeSchema);
