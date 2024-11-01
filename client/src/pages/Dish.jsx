import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DOMPurify from "dompurify"; // Import DOMPurify

const DishPage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        console.log("Fetching recipe with ID:", id);
        const response = await axios.get(
          `http://localhost:3000/api/recipe/${id}` // Full URL if needed
        );
        console.log("Fetched recipe data:", response.data); // Log the data directly
        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  if (!recipe) return <p>Recipe not found</p>;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        padding: "20px",
      }}
    >
      {/* Image Section */}
      <div
        style={{
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "5px",
          textAlign: "center",
        }}
      >
        <h1>{recipe.name}</h1>
        {recipe.image ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src={recipe.image}
              alt={recipe.name}
              style={{
                maxWidth: "100%",
                borderRadius: "5px",
                margin: "0 auto",
              }}
            />
          </div>
        ) : (
          <p>No image available</p>
        )}
      </div>

      {/* Ingredients Section */}
      <div
        style={{
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "5px",
        }}
      >
        <h2>Ingredients</h2>
        <ul>
          {recipe.ingredients && recipe.ingredients.length > 0 ? (
            recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))
          ) : (
            <p>No ingredients listed</p>
          )}
        </ul>
      </div>

      {/* Description Section */}
      <div
        style={{
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "5px",
        }}
      >
        <h2>Description</h2>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(recipe.description || "No description available"),
          }}
        />
      </div>

      {/* Video Link Section */}
      <div
        style={{
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "5px",
        }}
      >
        <h2>Cooking Video</h2>
        {recipe.videoLink ? (
          <a
            href={recipe.videoLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "blue", textDecoration: "underline" }}
          >
            Watch on YouTube
          </a>
        ) : (
          <p>No video available</p>
        )}
      </div>
    </div>
  );
};

export default DishPage;
