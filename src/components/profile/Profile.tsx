"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import useProfile from "@/components/profile/useProfile";
import Input from "@/components/input/InputField";
import Button from "@/components/button/Button";
import { updateUser } from "@/redux/slice/authSlice";
import { useAppDispatch } from "@/redux/store";

const Profile = () => {
  const { user, loading, error } = useProfile();
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState<string>(user?.name ?? "");
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [updateError, setUpdateError] = useState<string>("");

  // Initialize imagePreview with user's imageURL if available.
  // Also, update the preview when the user data changes.
  const [imagePreview, setImagePreview] = useState<string>(user?.imageURL ?? "");
  useEffect(() => {
    if (user?.imageURL) {
      setImagePreview(user.imageURL);
    }
    if (user?.name) {
      setUsername(user.name);
    }
  }, [user?.imageURL, user?.name]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!user) return <p>No user found. Please log in.</p>;

  const handleUpdate = async () => {
    try {
      setIsUpdating(true);
      setUpdateError("");

      const updateData = { 
        name: username,
        imageURL: imagePreview,
      };

      console.log("Sending update to server:", updateData);

      const response = await fetch("/api/auth/register", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Update failed:", errorData);
        throw new Error(errorData.message || "Update failed");
      }

      const data = await response.json();
      console.log("Update successful:", data);
      
      dispatch(updateUser({ 
        name: username, 
        imageURL: imagePreview 
      }));
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update profile";
      setUpdateError(errorMessage);
      console.error("Update error:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      const uploadData = new FormData();
      uploadData.append("file", file);
      uploadData.append("filename", file.name);
      try {
        const response = await fetch("/api/imageUpload", {
          method: "POST",
          body: uploadData,
        });
        if (!response.ok) {
          throw new Error("Upload failed");
        }
        const result = await response.json();
        console.log("Upload successful:", result);
        if (name === "image") {
          setImagePreview(result.url);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  console.log("Image preview URL:", imagePreview);
  console.log("User image URL:", user?.imageURL);
  console.log("User data:", user);

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>

      {/* Display Current Profile Info */}
      <div className="mb-6">
        <div className="flex items-center space-x-4">
          {imagePreview ? (
            <Image
              src={imagePreview}
              width={64}
              height={64}
              alt="Profile"
              className="rounded-full"
            />
          ) : (
            <div className="w-16 h-16 flex items-center justify-center bg-gray-200 rounded-full">
              No Image
            </div>
          )}
          <div>
            <p className="font-bold">{username}</p>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
        </div>
      </div>
      
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
