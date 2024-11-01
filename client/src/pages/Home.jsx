import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Ensure axios is installed
import food6 from "../assets/food6.png";
import logo from "../assets/logo.png";
import food5 from "../assets/food5.png";
import food3 from "../assets/food3.jpg"; // Adjust the path as necessary
import food4 from "../assets/food4.jpg"; // Adjust the path as necessary
import food1 from "../assets/food1.jpg"; // Adjust the path as necessary
import food2 from "../assets/food2.jpg";
import ellipse11 from "../assets/ellipse-11.png";
import ellipse12 from "../assets/ellipse-12.png";
import ellipse13 from "../assets/ellipse-13.png";
import ellipse14 from "../assets/ellipse-14.png";

const cuisineImages = [
  food6, // Indian cuisine
  food5, // Chinese cuisine
  food3, // Asian cuisine
  food4, // American cuisine
  food1, // Mexican cuisine
  food2, // Thai cuisine
];

const Home = () => {
  const [popularRecipes, setPopularRecipes] = useState([]); // State for popular recipes
  const [keralaRecipes, setKeralaRecipes] = useState([]); // State for Kerala recipes

  useEffect(() => {
    // Fetch popular recipes
    const fetchPopularRecipes = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/recipe/popular"
        );
        const data = await response.json();

        console.log("Popular recipes data:", data); // Log the full response

        if (data.recipes && Array.isArray(data.recipes)) {
          setPopularRecipes(data.recipes);
        } else {
          console.error("Expected an array but got:", data);
        }
      } catch (error) {
        console.error("Failed to fetch popular recipes:", error);
      }
    };

    // Fetch Kerala recipes
    const fetchKeralaRecipes = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/recipe/kerala"); // Replace with your actual endpoint
        const data = await response.json();

        if (data.recipes && Array.isArray(data.recipes)) {
          // Safely set Kerala recipes
          setKeralaRecipes(data.recipes);
        } else {
          console.error("Expected an array but got:", data);
        }
      } catch (error) {
        console.error("Error fetching Kerala recipes:", error);
      }
    };

    fetchPopularRecipes();
    fetchKeralaRecipes();
  }, []);
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      {/* App Name and Logo */}
      <div className="flex items-center justify-center py-8">
        <img
          src={logo}
          alt="Cook with Shaki Logo"
          className="w-[72px] h-[72px]"
        />
        <h1 className="text-4xl font-bold ml-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Cook with Shaki
        </h1>
      </div>

      {/* Popular Section */}
      <div className="mt-10 px-20">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-semibold dark:text-white">
            Popular Section
          </h2>
          <button className="flex items-center font-semibold bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            <span className="mr-1">Explore More</span>
            <svg
              className="w-5 h-5 transform translate-y-0.5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.3917 20C16.1309 20 20.7834 15.5229 20.7834 10C20.7834 4.47715 16.1309 0 10.3917 0C4.65252 0 0 4.47715 0 10C0 15.5229 4.65252 20 10.3917 20ZM2.07853 11.4286H14.7304L8.91107 16.7619L10.3919 18.0952L18.7052 10.4762L10.3919 2.85712L8.91107 4.19045L14.7304 9.52379H2.07853V11.4286Z"
                fill="#7D72CE"
              />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-6 gap-4 mt-4">
          {popularRecipes.length > 0 ? (
            popularRecipes.map((recipe) => {
              console.log("Recipe picture URL:", recipe.picture); // Log each image URL
              return (
                <Link
                  key={recipe._id} // Use unique ID from your database
                  to={`/dish/${recipe._id}`} // Pass the recipe ID in the URL
                  className="relative w-full h-40 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden flex items-center justify-center"
                >
                  <img
                    src={recipe.image} // Use the correct field name here
                    alt={recipe.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null; // Prevent infinite loop
                      e.target.src = "https://via.placeholder.com/150"; // Placeholder image
                    }}
                  />

                  <span className="absolute bottom-2 left-2 text-white bg-black bg-opacity-50 p-1 rounded">
                    {recipe.name} {/* Display the recipe name */}
                  </span>
                </Link>
              );
            })
          ) : (
            <p className="text-gray-500">No popular recipes available.</p>
          )}
        </div>
      </div>

      {/* Namma Kerala Section */}
      <div className="mt-10 px-20">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-semibold dark:text-white">
            Namma Kerala
          </h2>
          <button className="flex items-center font-semibold bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            <span className="mr-1">Explore More</span>
            <svg
              className="w-5 h-5 transform translate-y-0.5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.3917 20C16.1309 20 20.7834 15.5229 20.7834 10C20.7834 4.47715 16.1309 0 10.3917 0C4.65252 0 0 4.47715 0 10C0 15.5229 4.65252 20 10.3917 20ZM2.07853 11.4286H14.7304L8.91107 16.7619L10.3919 18.0952L18.7052 10.4762L10.3919 2.85712L8.91107 4.19045L14.7304 9.52379H2.07853V11.4286Z"
                fill="#7D72CE"
              />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-6 gap-4 mt-4">
          {keralaRecipes.length > 0 ? (
            keralaRecipes.map((recipe) => (
              <Link
                key={recipe._id} // Use unique ID from your database
                to={`/dish/${recipe._id}`} // Pass the recipe ID in the URL
                className="relative w-full h-40 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden flex items-center justify-center"
              >
                <img
                  src={recipe.image} // Use the correct field name here
                  alt={recipe.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop
                    e.target.src = "https://via.placeholder.com/150"; // Placeholder image
                  }}
                />

                <span className="absolute bottom-2 left-2 text-white bg-black bg-opacity-50 p-1 rounded">
                  {recipe.name} {/* Display the recipe name */}
                </span>
              </Link>
            ))
          ) : (
            <p className="text-gray-500">No Kerala recipes available.</p>
          )}
        </div>
      </div>
      {/* Cuisine Section */}
      <div className="mt-10 px-20">
        <h2 className="text-3xl font-semibold dark:text-white">Cuisines</h2>
        <div className="grid grid-cols-6 gap-4 mt-4">
          {["Indian", "Chinese", "Asian", "American", "Mexican", "Thai"].map(
            (cuisine, index) => (
              <Link
                key={index}
                to={`/${cuisine.toLowerCase()}`} // Adjust the path to match your routing structure
                className="flex flex-col items-center"
              >
                <img
                  className="w-[138px] h-[138px] rounded-full object-cover"
                  src={cuisineImages[index]} // Use the corresponding image for the cuisine
                  alt={`Cuisine ${cuisine}`} // Use the cuisine name in the alt text for accessibility
                />
                <div className="text-lg mt-2 dark:text-white">{cuisine}</div>
              </Link>
            )
          )}
        </div>
      </div>
      {/* Bottom Navigation Section */}
      <div className="w-full bg-white dark:bg-gray-800 border-t-2 border-black dark:border-gray-600 mt-10 px-40">
        <div className="flex justify-between items-center px-10 py-5">
          <div className="flex flex-col items-center">
            <img className="w-[65px] h-[65px]" src={ellipse11} alt="Home" />
            <div className="text-lg dark:text-white">Home</div>
          </div>

          <div className="flex flex-col items-center">
            <img
              className="w-[65px] h-[65px]"
              src={ellipse12}
              alt="Custom Cooking"
            />
            <div className="text-lg text-center dark:text-white">
              Custom Cooking
            </div>
          </div>

          <div className="flex flex-col items-center">
            <img
              className="w-[65px] h-[65px]"
              src={ellipse13}
              alt="Diet Plan"
            />
            <div className="text-lg dark:text-white">Diet Plan</div>
          </div>

          <div className="flex flex-col items-center">
            <img className="w-[65px] h-[65px]" src={ellipse14} alt="Saved" />
            <div className="text-lg dark:text-white">Saved</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
