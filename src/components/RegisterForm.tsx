"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/slice/authSlice";
import type { RootState, AppDispatch } from "../redux/store";
import InputField from "@/components/InputField"; // Correct import
import Button from "@/components/Button"; // Correct import

const RegisterForm = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "", address: "" });

  const dispatch = useDispatch<AppDispatch>(); 
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerUser(form)); 
  };

  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-gradient-to-r from-[#D355FF] to-[#9A55FF]">
      <div className="w-full max-w-lg p-6 rounded-lg bg-green bg-opacity-10 backdrop-blur-md border border-white border-opacity-30 shadow-lg opacity-80">
        <h2 className="text-2xl font-bold mb-4 text-center text-black">Register</h2>
        
        {error && <p className="text-red-200 text-center">{error}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField label="Name" value={form.name} type="text" name="name" placeholder="Name" onChange={handleChange}className="mb-3 w-full bg-white bg-opacity-20 text-white placeholder-gray-200"  />
          <InputField label="Email" value={form.email} type="email" name="email" placeholder="Email" onChange={handleChange}  />
          <InputField label="Password" value={form.password} type="password" name="password" placeholder="Password" onChange={handleChange} />
          <InputField label="Phone Number" value={form.phone} type="text" name="phone" placeholder="Phone Number" onChange={handleChange}  />
          <InputField label="Address" value={form.address} type="text" name="address" placeholder="Address" onChange={handleChange} />
         
        <Button type="submit" className="w-full" disabled={loading} text={loading ? "Registering..." : "Register"}>
          {loading ? "Registering..." : "Register"}
        </Button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;

