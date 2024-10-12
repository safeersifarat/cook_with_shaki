import React from "react";
import facebook1 from "../assets/facebook-1.png";
import google1 from "../assets/google-1.png";
import twitter1 from "../assets/twitter-1.png";
import food1 from "../assets/food1.jpg"; // Add your food image paths
import food2 from "../assets/food2.jpg";
import food3 from "../assets/food3.jpg";
import food4 from "../assets/food4.jpg";
import { Link } from "react-router-dom";

const InputField = ({ placeholder, type }) => {
  return (
    <input
      className="w-full p-2 my-3 border border-gray-300 rounded-md"
      type={type}
      placeholder={placeholder}
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
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="relative flex justify-center items-center h-screen bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500">
      {/* Background food images */}
      <div className="absolute top-1/4 left-10">
        <img src={food1} alt="Food 1" className="w-32 h-32 rounded-full shadow-lg" />
      </div>
      <div className="absolute top-1/4 right-10">
        <img src={food2} alt="Food 2" className="w-32 h-32 rounded-full shadow-lg" />
      </div>
      <div className="absolute bottom-1/4 left-10">
        <img src={food3} alt="Food 3" className="w-32 h-32 rounded-full shadow-lg" />
      </div>
      <div className="absolute bottom-1/4 right-10">
        <img src={food4} alt="Food 4" className="w-32 h-32 rounded-full shadow-lg" />
      </div>

      <div className="max-w-lg w-full p-8 bg-white shadow-md rounded-lg relative z-10">
        <h1 className="text-4xl font-bold text-gray-800 text-center">Sign Up</h1>
        <h2 className="text-2xl text-gray-600 text-center mb-6">Create Your Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField placeholder="Enter Your Username" type="text" />
          <InputField placeholder="Enter Your Email" type="email" />
          <InputField placeholder="Enter Your Phone Number" type="tel" />
          <InputField placeholder="Enter Your Password" type="password" />
          <div className="flex justify-center">
            <Link to="/home">
              <Button className="w-full max-w-md py-4 mt-6 text-xl font-bold text-white rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                Sign Up
              </Button>
            </Link>
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
            <span className="text-indigo-500 cursor-pointer hover:underline">Login</span>
          </Link>
        </p>
        <div className="mt-8 text-center">
          <h3 className="text-2xl font-bold text-gray-800">MAKE YOUR DAY DELICIOUS!</h3>
          <p className="text-gray-600">Let’s Cook Together With Shaki</p>
        </div>
      </div>
    </div>
  );
}
