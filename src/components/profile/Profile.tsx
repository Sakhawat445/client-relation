"use client";

import React, { useState } from "react";
import useProfile from "@/components/profile/useProfile";
import Input from "@/components/input/InputField";
import Button from "@/components/button/Button";
import { updateUsername } from "@/redux/slice/authSlice";
import { useDispatch } from "react-redux";

const Profile = () => {
  const { user, loading, error } = useProfile();
  const dispatch = useDispatch();
  const [username, setUsername] = useState(user?.name || "");
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState("");

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!user) return <p>No user found. Please log in.</p>;

  const handleUpdate = async () => {
    try {
      setIsUpdating(true);
      setUpdateError("");
      
      const response = await fetch("/api/auth/register", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: username }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Update failed");
      }

      const data = await response.json();
      dispatch(updateUsername(username));
      console.log("Updated Username:", data.user);
    } catch (err) {
      setUpdateError(err instanceof Error ? err.message : "Failed to update profile");
      console.error("Update error:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
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
          value={user?.email || ""}
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