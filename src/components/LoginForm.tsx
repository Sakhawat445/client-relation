"use client";

import InputField from "@/components/InputField"; // Reusable InputField component
import Button from "@/components/Button"; // Reusable Button component
import useLoginForm from "./useLoginForm"; // Import the custom hook
import { useEffect } from "react"; // Import useEffect
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

const LoginForm = () => {
  const { form, loading, error, handleChange, handleSubmit } = useLoginForm();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user); // Get user from Redux

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      toast.success("Login successful! Redirecting to dashboard...", {
        position: "top-right",
        autoClose: 3000, // Close the toast after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Navigate to dashboard after 3 seconds
      setTimeout(() => {
        router.push("/dashboard");
      }, 3000);
    }
  }, [user, router]);

  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-gradient-to-r from-[#D355FF] to-[#9A55FF]">
      <div className="w-full max-w-lg p-6 rounded-lg bg-green bg-opacity-10 backdrop-blur-md border border-white border-opacity-30 shadow-lg opacity-80">
        <h2 className="text-2xl font-bold mb-4 text-center text-black">Login</h2>

        {error && <p className="text-red-200 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Email"
            value={form.email}
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="mb-3 w-full bg-white bg-opacity-20 text-white placeholder-gray-200"
          />
          <InputField
            label="Password"
            value={form.password}
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
            text={loading ? "Logging in..." : "Login"}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>

      {/* ToastContainer should be rendered once in your app, typically in the root component */}
      <ToastContainer />
    </div>
  );
};

export default LoginForm;