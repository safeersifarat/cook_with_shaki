import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminPage = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [recipe, setRecipe] = useState({
    name: "",
    imageUrl: "",
    description: "",
    cuisine: "",
    subCuisine: "",
    videoLink: "",
  });
  const [users, setUsers] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");  // For handling error messages

  useEffect(() => {
    fetchUsers();
    fetchRecipes();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/admin/users", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },  // Assuming JWT is stored in localStorage
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to load users.");
    }
  };

  const fetchRecipes = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/admin/recipes", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setRecipes(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error.response || error.message);
      setError("Failed to load recipes.");
    }
  };
  

  const handleUserChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleRecipeChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const addUser = async () => {
    if (!user.name || !user.email || !user.password) {
      alert("All fields are required to add a user.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/api/admin/users",
        user,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      console.log("User added:", response.data);
      setUser({ name: "", email: "", password: "" });
      fetchUsers(); // Re-fetch users after adding a new one
      alert("User added successfully");
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Failed to add user");
    }
  };

  const addRecipe = async () => {
    if (!recipe.name || !recipe.imageUrl || !recipe.description || !recipe.cuisine) {
      alert("All fields are required to add a recipe.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/api/admin/recipes",
        recipe,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      console.log("Recipe added:", response.data);
      setRecipe({
        name: "",
        imageUrl: "",
        description: "",
        cuisine: "",
        subCuisine: "",
        videoLink: "",
      });
      fetchRecipes(); // Re-fetch recipes after adding a new one
      alert("Recipe added successfully");
    } catch (error) {
      console.error("Error adding recipe:", error);
      alert("Failed to add recipe");
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3000/api/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchUsers(); // Re-fetch users after deleting
      alert("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user");
    }
  };

  const deleteRecipe = async (recipeId) => {
    try {
      await axios.delete(`http://localhost:3000/api/admin/recipes/${recipeId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchRecipes(); // Re-fetch recipes after deleting
      alert("Recipe deleted successfully");
    } catch (error) {
      console.error("Error deleting recipe:", error);
      alert("Failed to delete recipe");
    }
  };

  const updateUser = async (userId) => {
    const updatedUser = { ...user, name: "Updated Name" }; // Replace hardcoded with dynamic values
    try {
      await axios.put(
        `http://localhost:3000/api/admin/users/${userId}`,
        updatedUser,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      fetchUsers(); // Re-fetch users after updating
      alert("User updated successfully");
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user");
    }
  };

  const updateRecipe = async (recipeId) => {
    const updatedRecipe = { ...recipe, name: "Updated Recipe" }; // Replace hardcoded with dynamic values
    try {
      await axios.put(
        `http://localhost:3000/api/admin/recipes/${recipeId}`,
        updatedRecipe,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      fetchRecipes(); // Re-fetch recipes after updating
      alert("Recipe updated successfully");
    } catch (error) {
      console.error("Error updating recipe:", error);
      alert("Failed to update recipe");
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold mb-4">Admin Dashboard</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>} {/* Error message */}

      {/* User Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New User</h2>
        <div className="flex space-x-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={user.name}
            onChange={handleUserChange}
            className="border border-gray-300 rounded-lg p-2 w-1/4"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleUserChange}
            className="border border-gray-300 rounded-lg p-2 w-1/4"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleUserChange}
            className="border border-gray-300 rounded-lg p-2 w-1/4"
          />
          <button
            onClick={addUser}
            disabled={!user.name || !user.email || !user.password}  // Disable if fields are empty
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Add User
          </button>
        </div>
      </div>

      {/* Current Users */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8 h-64 overflow-y-scroll">
        <h2 className="text-xl font-semibold mb-4">Current Users</h2>
        <ul>
          {users.length === 0 ? (
            <li>No users found.</li>
          ) : (
            users.map((user) => (
              <li key={user._id} className="flex justify-between mb-4">
                <div>
                  <p>Name: {user.name}</p>
                  <p>Email: {user.email}</p>
                </div>
                <div>
                  <button
                    onClick={() => updateUser(user._id)}
                    className="bg-yellow-500 text-white px-4 py-1 rounded-lg hover:bg-yellow-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 ml-2"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Recipe Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Recipe</h2>
        <div className="flex space-x-4">
          <input
            type="text"
            name="name"
            placeholder="Recipe Name"
            value={recipe.name}
            onChange={handleRecipeChange}
            className="border border-gray-300 rounded-lg p-2 w-1/4"
          />
          <input
            type="text"
            name="imageUrl"
            placeholder="Image URL"
            value={recipe.imageUrl}
            onChange={handleRecipeChange}
            className="border border-gray-300 rounded-lg p-2 w-1/4"
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={recipe.description}
            onChange={handleRecipeChange}
            className="border border-gray-300 rounded-lg p-2 w-1/4"
          />
          <input
            type="text"
            name="cuisine"
            placeholder="Cuisine"
            value={recipe.cuisine}
            onChange={handleRecipeChange}
            className="border border-gray-300 rounded-lg p-2 w-1/4"
          />
          <input
            type="text"
            name="subCuisine"
            placeholder="Sub-Cuisine"
            value={recipe.subCuisine}
            onChange={handleRecipeChange}
            className="border border-gray-300 rounded-lg p-2 w-1/4"
          />
          <input
            type="text"
            name="videoLink"
            placeholder="Video Link"
            value={recipe.videoLink}
            onChange={handleRecipeChange}
            className="border border-gray-300 rounded-lg p-2 w-1/4"
          />
          <button
            onClick={addRecipe}
            disabled={!recipe.name || !recipe.imageUrl || !recipe.description || !recipe.cuisine}  // Disable if fields are empty
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Add Recipe
          </button>
        </div>
      </div>

      {/* Current Recipes */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8 h-64 overflow-y-scroll">
        <h2 className="text-xl font-semibold mb-4">Current Recipes</h2>
        <ul>
          {recipes.length === 0 ? (
            <li>No recipes found.</li>
          ) : (
            recipes.map((recipe) => (
              <li key={recipe._id} className="flex justify-between mb-4">
                <div>
                  <p>Name: {recipe.name}</p>
                  <p>Cuisine: {recipe.cuisine}</p>
                </div>
                <div>
                  <button
                    onClick={() => updateRecipe(recipe._id)}
                    className="bg-yellow-500 text-white px-4 py-1 rounded-lg hover:bg-yellow-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => deleteRecipe(recipe._id)}
                    className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 ml-2"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default AdminPage;
