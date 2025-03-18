"use client";

import InputField from "@/components/InputField"; // Correct import
import Button from "@/components/Button"; // Correct import
import useRegisterForm from "./useRegisterForm"; // Import the custom hook
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import { toast, ToastContainer } from "react-toastify"; // Import toast for notifications
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

const RegisterForm = () => {
  const { form, loading, formError, handleChange, handleSubmit } = useRegisterForm();
  const router = useRouter(); // Initialize useRouter

  const onSuccessfulRegister = () => {
    toast.success("Registration successful! Redirecting to login..."); // Show success toast
    setTimeout(() => {
      router.push("/login"); // Navigate to login page after a delay
    }, 3000); // 3 seconds delay
  };

  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-gradient-to-r from-[#D355FF] to-[#9A55FF]">
      <div className="w-full max-w-lg p-6 rounded-lg bg-green bg-opacity-10 backdrop-blur-md border border-white border-opacity-30 shadow-lg opacity-80">
        <h2 className="text-2xl font-bold mb-4 text-center text-black">Register</h2>

        {formError && <p className="text-red-200 text-center">{formError}</p>}

        <form onSubmit={(e) => handleSubmit(e, onSuccessfulRegister)} className="space-y-4">
          <InputField
            label="Name"
            value={form.name}
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="mb-3 w-full bg-white bg-opacity-20 text-white placeholder-gray-200"
          />
          <InputField
            label="Email"
            value={form.email}
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
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
          >
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>

        <p className="text-center mt-4 text-black">
          Already registered?{" "}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => router.push("/login")} // Navigate to login page
          >
            Login here
          </span>
        </p>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
         </div>
  );
};

export default RegisterForm;