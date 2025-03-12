'use client'
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Dashboard />
      </div>
    );
  };
  

export default Dashboard;
