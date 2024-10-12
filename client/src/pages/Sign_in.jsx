import React from "react";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import facebook1 from "../assets/facebook-1.png";
import google1 from "../assets/google-1.png";
import twitter1 from "../assets/twitter-1.png";
import { Link } from "react-router-dom";


export default function Sign_in() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center w-full h-screen bg-white">
      <div className="flex flex-row bg-white w-full h-full max-w-screen-xl p-10">
        <div className="w-1/2 flex items-center justify-center">
          <div className="bg-white rounded-3xl p-10 w-full">
            <h1 className="text-black text-5xl font-bold mb-10">Sign In</h1>
            <div className="flex space-x-6 mb-10">
              <img className="w-14 h-14" src={facebook1} alt="Facebook" />
              <img className="w-14 h-14" src={google1} alt="Google" />
              <img className="w-14 h-14" src={twitter1} alt="Twitter" />
            </div>
            <div>
              <label className="text-black text-2xl font-semibold">
                Username
              </label>
              <input
                className="block w-full p-4 mt-2 bg-gray-200 rounded-xl text-xl"
                placeholder="Username"
              />
            </div>
            <div className="mt-6">
              <label className="text-black text-2xl font-semibold">
                Password
              </label>
              <input
                className="block w-full p-4 mt-2 bg-gray-200 rounded-xl text-xl"
                placeholder="Password"
              />
            </div>
            <div className="flex justify-between items-center mt-6">
              <div className="flex items-center space-x-2">
                <input type="checkbox" className="w-4 h-4" />
                <label className="text-black text-xl font-semibold">
                  Remember Me
                </label>
              </div>
              <a href="#" className="text-black text-xl font-semibold">
                Forgot Password?
              </a>
            </div>
            <Link to='/home'>
            <Button className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full text-white py-4 rounded-xl mt-6 text-xl font-bold">
              Sign In
            </Button>
            </Link>
          </div>
        </div>
        <div className="w-1/2 flex items-center justify-center bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 rounded-3xl">
          <div className="text-center">
            <h1 className="text-white text-5xl font-bold mb-6">
              Welcome To Login
            </h1>
            <p className="text-white text-2xl mb-6">Don’t have an account?</p>
            <Button className="border-white bg-transparent text-white py-4 px-8
              rounded-full font-bold text-xl mx-auto block" onClick=
              {() => navigate("/signup")}>
              Sign Up 
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
