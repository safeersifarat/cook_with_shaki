import React from "react";
import popularDish1 from "../assets/popularDish1.png";
import popularDish2 from "../assets/popularDish2.png";
import keralaDish1 from "../assets/keralaDish1.png";
import keralaDish2 from "../assets/keralaDish2.png";
import ellipse11 from "../assets/ellipse-11.png";
import ellipse12 from "../assets/ellipse-12.png";
import ellipse13 from "../assets/ellipse-13.png";
import ellipse14 from "../assets/ellipse-14.png";
import logo from "../assets/logo.png";

export default function Home() {
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
          {[popularDish1, popularDish2, popularDish1, popularDish2, popularDish1, popularDish2].map((dish, index) => (
            <div key={index} className="relative w-full h-40 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
              <img
                src={dish}
                alt={`Popular Dish ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Namma Kerala Section */}
      <div className="mt-10 px-20">
        <div className="flex justify-between items-center w-full">
          <h2 className="text-3xl font-semibold dark:text-white">Namma Kerala</h2>
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
          {[keralaDish1, keralaDish2, keralaDish1, keralaDish2, keralaDish1, keralaDish2].map((dish, index) => (
            <div key={index} className="relative w-full h-40 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
              <img
                src={dish}
                alt={`Kerala Dish ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Cuisines Section */}
      <div className="mt-10 px-20">
        <h2 className="text-3xl font-semibold dark:text-white">Cuisines</h2>
        <div className="grid grid-cols-6 gap-4 mt-4">
          {['Indian', 'Chinese', 'Asian', 'American', 'Mexican', 'Thai'].map((cuisine, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                className="w-[138px] h-[138px] rounded-full object-cover"
                src={popularDish1}
                alt={`Cuisine ${index + 1}`}
              />
              <div className="text-lg mt-2 dark:text-white">{cuisine}</div>
            </div>
          ))}
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
            <div className="text-lg text-center dark:text-white">Custom Cooking</div>
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
}
