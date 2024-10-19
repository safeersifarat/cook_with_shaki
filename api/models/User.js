// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String },
  preferences: { type: [String], default: [] },
  favorites: { type: [String], default: [] },  // Array of recipe names
});

export default mongoose.model('User', userSchema);
