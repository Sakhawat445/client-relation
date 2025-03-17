"use client";

import InputField from "@/components/InputField"; // Reusable InputField component
import Button from "@/components/Button"; // Reusable Button component
import useResetPasswordForm from "./useResetPassword"; // Custom hook for reset password logic
import { useRouter } from "next/navigation"; // For navigation
import { ToastContainer } from "react-toastify"; // For toast notifications
import "react-toastify/dist/ReactToastify.css"; // Toast styles

const ResetPasswordPage = () => {
  const { form, loading, error, handleChange, handleSubmit } = useResetPasswordForm();
  const router = useRouter();

  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-gradient-to-r from-[#D355FF] to-[#9A55FF]">
      <div className="w-full max-w-lg p-6 rounded-lg bg-green bg-opacity-10 backdrop-blur-md border border-white border-opacity-30 shadow-lg opacity-80">
        <h2 className="text-2xl font-bold mb-4 text-center text-black">Reset Password</h2>

        {error && <p className="text-red-200 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Email"
            value={form.email}
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
            className="mb-3 w-full bg-white bg-opacity-20 text-white placeholder-gray-200"
          />
      
        

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Resetting Password..." : "Reset Password"}
          </Button>
        </form>

        {/* Back to Login Link */}
        <p className="text-center mt-4 text-black">
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => router.push("/login")} // Navigate back to login page
          >
            Back to Login
          </span>
        </p>
      </div>

      {/* Toast Container for Notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ResetPasswordPage;