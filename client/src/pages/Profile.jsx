import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    phone: "",
    image: "",
  });
  const [updatedData, setUpdatedData] = useState({
    name: "",
    phone: "",
  });
  const [profilePic, setProfilePic] = useState(null);
  const navigate = useNavigate();

  // Fetch user profile on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/signin");
    } else {
      axios
        .get("http://localhost:3000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setProfileData({
            ...res.data.user,
            image: `http://localhost:3000/uploads/${res.data.user.image}`,
          });
          setUpdatedData({
            name: res.data.user.name,
            phone: res.data.user.phone,
          });
        })
        .catch((err) => console.error(err));
    }
  }, [navigate]);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    const isValidPhone = /^[0-9]{10}$/;

    if (!isValidPhone.test(updatedData.phone)) {
      alert("Invalid phone number format");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", updatedData.name);
      formData.append("phone", updatedData.phone);

      if (profilePic) {
        formData.append("profilePic", profilePic);
      }

      const response = await axios.put(
        "http://localhost:3000/api/auth/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setProfileData((prev) => ({
        ...prev,
        name: response.data.updatedUser.name,
        phone: response.data.updatedUser.phone,
        image: `http://localhost:3000/uploads/${response.data.updatedUser.image}?t=${new Date().getTime()}`,
      }));

      setIsEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-white dark:bg-gray-900 text-black dark:text-white">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <img
            src={
              profileData.image || "default_profile_image_url"
            }
            alt="Profile"
            className="rounded-full w-24 h-24"
          />

          <div className="ml-4">
            <h2 className="text-2xl font-bold">{profileData.name || "name"}</h2>
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
              name="name"
              value={updatedData.name}
              onChange={handleChange}
              placeholder="Edit Name"
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
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full p-2 dark:bg-gray-700 dark:border-gray-600"
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
            href="/home"
            className="block border p-2 text-center dark:bg-gray-800 dark:border-gray-700"
            onClick={(e) => {
              e.preventDefault();
              localStorage.removeItem("token");
              navigate("/home");
            }}
          >
            Logout
          </a>
        </div>
      </div>
    </div>
  );
}
