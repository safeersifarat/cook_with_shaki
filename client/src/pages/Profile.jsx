import React, { useState } from 'react';

export default function Profile() {
    
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="min-h-screen p-6 bg-white dark:bg-gray-900 text-black dark:text-white">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <img
            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD..." // Replace with your actual image URL or keep as base64
            alt="Profile"
            className="rounded-full w-24 h-24"
          />
          <div className="ml-4">
            <h2 className="text-2xl font-bold">Username</h2>
            <p className="text-lg">Phone: 267833566</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleEditClick}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
        </div>
      </div>
      
      <div className="mt-4 space-y-4">
        {isEditing && (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Edit Username"
              className="border p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            />
            <input
              type="text"
              placeholder="Edit Phone Number"
              className="border p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            />
          </div>
        )}

        <div className="space-y-2">
          <a href="/preference" className="block border p-2 text-center dark:bg-gray-800 dark:border-gray-700">Preferences</a>
          <a href="/get-help" className="block border p-2 text-center dark:bg-gray-800 dark:border-gray-700">Get Help</a>
          <a href="/terms" className="block border p-2 text-center dark:bg-gray-800 dark:border-gray-700">Terms and Conditions</a>
          <a href="/logout" className="block border p-2 text-center dark:bg-gray-800 dark:border-gray-700">Logout</a>
        </div>
      </div>
    </div>
  );
};


