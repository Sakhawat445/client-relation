"use client";

import React from "react";
import Image from "next/image";
import useProfile from "./useProfile";
import Input from "@/components/input/InputField";
import Button from "@/components/button/Button";

const Profile = () => {
  const {
    user,
    loading,
    error,
    username,
    setUsername,
    imagePreview,
    handleUpdate,
    handleFileChange,
    isUpdating,
    updateError,
  } = useProfile();

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!user) return <p>No user found. Please log in.</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>

      {/* Image Upload Section */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300 flex items-center justify-center">
          {imagePreview ? (
            <Image
              src={imagePreview}
              width={128}
              height={128}
              alt="Profile"
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-gray-400">
              No Image
            </div>
          )}
        </div>
        <label
          htmlFor="imageUpload"
          className="mt-2 cursor-pointer text-blue-500 hover:underline"
        >
          Upload Image
        </label>
        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          name="image"
        />
      </div>

      {updateError && (
        <p className="text-red-500 mb-4">{updateError}</p>
      )}

      <div className="mb-4">
        <label htmlFor="username" className="text-gray-700 font-medium">
          Username:
        </label>
        <Input
          id="username"
          type="text"
          name="username"
          label=""
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="text-gray-700 font-medium">Email:</label>
        <Input
          type="email"
          name="email"
          label=""
          value={user.email || ""}
          className="w-full p-2 border rounded-lg mt-1"
          onChange={() => {}}
        />
      </div>

      <Button
        onClick={handleUpdate}
        disabled={isUpdating}
        className="mt-4 w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300"
      >
        {isUpdating ? "Updating..." : "Update Profile"}
      </Button>
    </div>
  );
};

export default Profile;
