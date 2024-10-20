import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    username: "",
    phone: "",
    image: "",
  });
  const [updatedData, setUpdatedData] = useState({
    username: "",
    phone: "",
  });
  const navigate = useNavigate();

  // Fetch user profile on component mount
  useEffect(() => {
    // Assuming token is stored in localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/signin"); // Redirect if no token
    } else {
      axios
        .get("http://localhost:3000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setProfileData(res.data.user);
          setUpdatedData({
            username: res.data.user.name,
            phone: res.data.user.phone,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [navigate]);

  // Toggle editing mode
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handle form submission for updating profile
  const handleSave = () => {
    const token = localStorage.getItem("token");

    axios
      .put("http://localhost:3000/api/users/profile", updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setProfileData(res.data.updatedUser); // Update profileData with updated info
        setIsEditing(false); // Exit edit mode
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="min-h-screen p-6 bg-white dark:bg-gray-900 text-black dark:text-white">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <img
            src={profileData.image || "default_profile_image_url"} // Placeholder if no image
            alt="Profile"
            className="rounded-full w-24 h-24"
          />
          <div className="ml-4">
            <h2 className="text-2xl font-bold">
              {profileData.username || "Username"}
            </h2>
            <p className="text-lg">
              Phone: {profileData.phone || "Phone Number"}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={isEditing ? handleSave : handleEditClick}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>
      </div>

      <div className="mt-4 space-y-4">
        {isEditing && (
          <div className="space-y-4">
            <input
              type="text"
              name="username"
              value={updatedData.username}
              onChange={handleChange}
              placeholder="Edit Username"
              className="border p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            />
            <input
              type="text"
              name="phone"
              value={updatedData.phone}
              onChange={handleChange}
              placeholder="Edit Phone Number"
              className="border p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            />
          </div>
        )}

        <div className="space-y-2">
          <a
            href="/preference"
            className="block border p-2 text-center dark:bg-gray-800 dark:border-gray-700"
          >
            Preferences
          </a>
          <a
            href="/get-help"
            className="block border p-2 text-center dark:bg-gray-800 dark:border-gray-700"
          >
            Get Help
          </a>
          <a
            href="/terms"
            className="block border p-2 text-center dark:bg-gray-800 dark:border-gray-700"
          >
            Terms and Conditions
          </a>
          <a
            href="/logout"
            className="block border p-2 text-center dark:bg-gray-800 dark:border-gray-700"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/signin");
            }}
          >
            Logout
          </a>
        </div>
      </div>
    </div>
  );
}
