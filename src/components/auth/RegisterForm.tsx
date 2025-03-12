"use client";

import Link from "next/link"; // Import Link for navigation
import useRegister from "./useRegister";
import InputField from "@/components/InputField";
import Button from "@/components/Button";

const RegisterForm = () => {
  const { form, loading, error, handleChange, handleSubmit } = useRegister();

  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-gradient-to-r from-[#D355FF] to-[#9A55FF]">
      <div className="w-full max-w-lg p-6 rounded-lg bg-green bg-opacity-10 backdrop-blur-md border border-white border-opacity-30 shadow-lg opacity-80">
        <h2 className="text-2xl font-bold mb-4 text-center text-black">Register</h2>

        {error && <p className="text-red-200 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField label="Name" value={form.name} type="text" name="name" placeholder="Name" onChange={handleChange} className="mb-3 w-full bg-white bg-opacity-20 text-white placeholder-gray-200" />
          <InputField label="Email" value={form.email} type="email" name="email" placeholder="Email" onChange={handleChange} />
          <InputField label="Password" value={form.password} type="password" name="password" placeholder="Password" onChange={handleChange} />

          <Button type="submit" className="w-full" disabled={loading} text={loading ? "Registering..." : "Register"}>
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>

        <p className="text-center text-white mt-4">
          Already registered?{" "}
          <Link href="login" className="text-blue-300 underline hover:text-blue-500">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
