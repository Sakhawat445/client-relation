"use client";

import InputField from "@/components/input/InputField";
import Button from "@/components/button/Button";
import useRegisterForm from "./useRegisterForm";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterForm = () => {
  const { form, loading, formError, handleChange, handleSubmit } =
    useRegisterForm();
  const router = useRouter();

  const onSuccessfulRegister = () => {
    toast.success("Registration successful! Redirecting to login...");
    setTimeout(() => {
      router.push("/login");
    }, 3000);
  };

  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-900 mb-6">
          Register
        </h2>

        {formError && (
          <p className="text-red-500 text-center mb-4">{formError}</p>
        )}

        <form
          onSubmit={(e) => handleSubmit(e, onSuccessfulRegister)}
          className="space-y-5"
        >
          <InputField
            label="Name"
            value={form.name}
            type="text"
            name="name"
            placeholder="Enter your name"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
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

          <Button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>

        <p className="text-center mt-4 text-gray-900">
          Already registered?{" "}
          <span
            className="text-gray-900 font-semibold hover:underline cursor-pointer"
            onClick={() => router.push("/login")}
          >
            Login here
          </span>
        </p>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default RegisterForm;
