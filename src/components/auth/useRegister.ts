import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/slice/authSlice";
import type { RootState, AppDispatch } from "../../redux/store";
import { useRouter } from "next/navigation"; // Import Next.js router

const useRegister = () => {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error, user } = useSelector((state: RootState) => state.auth);
    const router = useRouter(); // Initialize router
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      dispatch(registerUser(form));
    };
  
    // Redirect to dashboard if user is successfully registered
    useEffect(() => {
      if (user) {
        router.push("/dashboard");
      }
    }, [user, router]);
  
    return {
      form,
      loading,
      error,
      handleChange,
      handleSubmit,
    };
  };
  
  export default useRegister;
  