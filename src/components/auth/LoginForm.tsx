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

          <div className="flex justify-between items-center">
            <button
              onClick={() => router.push("/reset")}
              className="text-white text-sm hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-white">Don&apos;t have an account?</p>
          <button
            onClick={() => router.push("/register")}
            className="mt-2 text-white font-semibold hover:underline"
          >
            Sign Up
          </button>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default LoginForm;
