import express from "express";
import { verifyToken, adminAuth } from "../middlewares/adminAuth.js";
import {
  getUsers, createUser, updateUser, deleteUser,
  getRecipes, createRecipe, updateRecipe, deleteRecipe, adminController
} from "../controllers/adminController.js";

const router = express.Router();
router.get("/admin", verifyToken, adminAuth, adminController);
router.get("/adminpage", verifyToken, adminAuth, (req, res) => {
  res.send("Welcome, Admin!");
});

// User Routes
router.get("/users", verifyToken, adminAuth, getUsers);
router.post("/users", verifyToken, adminAuth, createUser);
router.put("/users/:id", verifyToken, adminAuth, updateUser);
router.delete("/users/:id", verifyToken, adminAuth, deleteUser);

// Recipe Routes
router.get("/recipes", verifyToken, adminAuth, getRecipes);
router.post("/recipes", verifyToken, adminAuth, createRecipe);
router.put("/recipes/:id", verifyToken, adminAuth, updateRecipe);
router.delete("/recipes/:id", verifyToken, adminAuth, deleteRecipe);

export default router;
