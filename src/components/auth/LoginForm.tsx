"use client";

import useLogin from "./useLogin";
import InputField from "@/components/InputField";
import Button from "@/components/Button";
import Link from "next/link";

const LoginPage = () => {
  const { form, loading, error, handleChange, handleSubmit } = useLogin();

  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-gradient-to-r from-[#D355FF] to-[#9A55FF]">
      <div className="w-full max-w-lg p-6 rounded-lg bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-30 shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-white">Login</h2>

        {error && <p className="text-red-300 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <Button type="submit" className="w-full" disabled={loading} text={loading ? "Logging in..." : "Login"}>
            {loading ? "Logging in..." : "Login"}
          </Button>

          <p className="text-center text-white mt-4">
            Don't have an account?{" "}
            <Link href="/register" className="text-blue-300 underline hover:text-blue-500">
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
