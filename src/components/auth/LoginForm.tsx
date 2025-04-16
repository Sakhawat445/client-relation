"use client";

import InputField from "@/components/input/InputField";
import Button from "@/components/button/Button";
import useLoginForm from "./useLoginForm";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const { form, loading, error, handleChange, handleSubmit } = useLoginForm();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  useEffect(() => {
    if (user) {
      toast.success("Login successful! Redirecting to dashboard...", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setTimeout(() => {
        router.push("/dashboard");
      });
    }
  }, [user, router]);

  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-900 mb-6">
          Login
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <InputField
            label="Email"
            value={form.email}
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          <InputField
            label="Password"
            value={form.password}
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
          />

          <div className="flex justify-between items-center">
            <button
              onClick={() => router.push("/reset")}
              className="text-gray-900 text-sm hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <Button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-900">Don&apos;t have an account?</p>
          <button
            onClick={() => router.push("/register")}
            className="mt-2 text-gray-900 font-semibold hover:underline"
          >
            Sign Up
          </button>
        </div>

        <ToastContainer />
      </div>
    </div>
  );
};

export default LoginForm;
