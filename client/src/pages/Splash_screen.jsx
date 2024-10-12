import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Splash_screen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash-screen h-screen w-screen flex flex-col justify-center items-center">
      <img
        src={logo}
        alt="Cook with Shaki Logo"
        className="splash-logo w-40 h-40 md:w-60 md:h-60"
      />
      <h6 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mt-4">
        Cook with Shaki
      </h6>
    </div>
  );
}
