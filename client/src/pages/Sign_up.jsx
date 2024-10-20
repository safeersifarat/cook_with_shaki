import React, { useState } from "react";
import facebook1 from "../assets/facebook-1.png";
import google1 from "../assets/google-1.png";
import twitter1 from "../assets/twitter-1.png";
import food1 from "../assets/food1.jpg"; // Add your food image paths
import food2 from "../assets/food2.jpg";
import food3 from "../assets/food3.jpg";
import food4 from "../assets/food4.jpg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // For API calls

const InputField = ({ placeholder, type, name, value, onChange }) => {
  return (
    <input
      className="w-full p-2 my-3 border border-gray-300 rounded-md"
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
};

const Button = ({ onClick, children, type }) => {
  return (
    <button
      className="bg-indigo-500 text-white py-2 px-6 rounded-md mt-4 hover:bg-indigo-600"
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default function Sign_up() {
  const navigate = useNavigate();
   
  // State for form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  });
  
  const [error, setError] = useState("");

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Replace this with your new handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/auth/register", formData);
      navigate("/home"); // If successful, navigate to home
    } catch (err) {
      // Enhanced error handling for better debugging
      if (err.response) {
        setError(err.response.data.message || "Registration failed. Please try again.");
      } else if (err.request) {
        setError("No response from server. Please check your backend connection.");
      } else {
        setError("Error: " + err.message);
      }
    }
  };
  

  // Your component's return statement...


  return (
    <div className="relative flex justify-center items-center h-screen bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500">
      {/* Background food images */}
      <div className="absolute top-1/4 left-20">
        <img
          src={food1}
          alt="Food 1"
          className="w-32 h-32 rounded-full shadow-lg"
        />
      </div>
      <div className="absolute top-1/4 right-20">
        <img
          src={food2}
          alt="Food 2"
          className="w-32 h-32 rounded-full shadow-lg"
        />
      </div>
      <div className="absolute bottom-1/4 left-20">
        <img
          src={food3}
          alt="Food 3"
          className="w-32 h-32 rounded-full shadow-lg"
        />
      </div>
      <div className="absolute bottom-1/4 right-20">
        <img
          src={food4}
          alt="Food 4"
          className="w-32 h-32 rounded-full shadow-lg"
        />
      </div>

      <div className="max-w-lg w-full p-8 bg-white shadow-md rounded-lg relative z-10">
        <h1 className="text-4xl font-bold text-gray-800 text-center">
          Sign Up
        </h1>
        <h2 className="text-2xl text-gray-600 text-center mb-6">
          Create Your Account
        </h2>
        
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            placeholder="Enter Your Username"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <InputField
            placeholder="Enter Your Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <InputField
            placeholder="Enter Your Phone Number"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
          <InputField
            placeholder="Enter Your Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />

          <div className="flex justify-center">
            <Button type="submit">Sign Up</Button>
          </div>
        </form>

        <div className="flex flex-col items-center mt-6">
          <span className="text-gray-500 mb-4">or with</span>
          <div className="flex space-x-5">
            <img src={facebook1} alt="Facebook" className="w-10 h-10 px-1" />
            <img src={google1} alt="Google" className="w-10 h-10" />
            <img src={twitter1} alt="Twitter" className="w-10 h-10" />
          </div>
        </div>
        
        <p className="mt-6 text-center">
          Already have an account?{" "}
          <Link to="/signin">
            <span className="text-indigo-500 cursor-pointer hover:underline">
              Login
            </span>
          </Link>
        </p>

        <div className="mt-8 text-center">
          <h3 className="text-2xl font-bold text-gray-800">
            MAKE YOUR DAY DELICIOUS!
          </h3>
          <p className="text-gray-600">Let’s Cook Together With Shaki</p>
        </div>
      </div>
    </div>
  );
}
