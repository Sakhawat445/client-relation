"use client";

import React from "react";
import InputField from "@/components/input/InputField";
import Button from "../button/Button";
import useNewPassword from "./useNewPassword";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewPasswordPage: React.FC = () => {
  const router = useRouter();
  const {
    password,
    confirmPassword,
    setPassword,
    setConfirmPassword,
    handleSubmit,
    error,
    loading,
  } = useNewPassword();

  const handlePasswordUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    const success = await handleSubmit(e);

    if (success) {
      toast.success("Password updated successfully! Redirecting to login...", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } else {
      toast.error(error || "Failed to update password", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-900 mb-6">
          Set New Password
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handlePasswordUpdate} className="space-y-5">
          <InputField
            label="New Password"
            value={password}
            type="password"
            name="new-password"
            placeholder="Enter your new password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          <InputField
            label="Confirm Password"
            value={confirmPassword}
            type="password"
            name="confirm-password"
            placeholder="Confirm your new password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
          />

          <Button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Password"}
          </Button>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default NewPasswordPage;
