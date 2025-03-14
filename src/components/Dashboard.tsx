"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/redux/slice/authSlice";
import { AppDispatch } from "@/redux/store"; 
import { RootState } from "@/redux/store"; 

export default function Dashboard() {
  const router = useRouter(); // Define router using useRouter hook
  const dispatch = useDispatch<AppDispatch>(); // Type useDispatch with AppDispatch
  const user = useSelector((state: RootState) => state.auth.user); // Get user from Redux

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  const handleLogout = () => {
    dispatch(logoutUser());
    router.push("/login");
  };

  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-gradient-to-r from-[#D355FF] to-[#9A55FF]">
      <div className="w-full max-w-lg p-6 rounded-lg bg-green bg-opacity-10 backdrop-blur-md border border-white border-opacity-30 shadow-lg opacity-80">
        <h1 className="text-2xl font-bold mb-4 text-center text-black">Dashboard</h1>
        <p className="text-center text-black">Welcome to your dashboard!</p>
        <button
          onClick={handleLogout}
          className="w-full mt-4 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
