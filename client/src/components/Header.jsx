import { Navbar, TextInput, Button, Avatar } from "flowbite-react";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token exists to confirm user is logged in
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);

    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleProfileClick = () => {
    if (isAuthenticated) {
      navigate("/profile"); // Redirect to profile if logged in
    } else {
      navigate("/signin"); // Redirect to sign-in if not logged in
    }
  };

  return (
    <Navbar className="border-b-2">
      <span
        className="self-center whitespace-nowrap text-sm sm:text-xl 
        font-semibold dark:text-white px-2 py-1 bg-gradient-to-r
        from-indigo-500 via-purple-500 to-pink-500 rounded-lg
        text-white"
      >
        COOK WITH SHAKI
      </span>
      <form>
        <TextInput
          type="text"
          placeholder="search recipes.."
          rightIcon={AiOutlineSearch}
        />
      </form>
      <div className="flex gap-3">
        <Button
          className="hidden sm:inline"
          color="gray"
          pill
          onClick={toggleDarkMode}
        >
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </Button>
        <Button className="flex flex-wrap bg-transparent" onClick={handleProfileClick}>
          <Avatar rounded />
        </Button>
      </div>
    </Navbar>
  );
}
