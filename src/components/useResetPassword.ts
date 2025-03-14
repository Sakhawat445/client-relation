import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/redux/store"; // Import AppDispatch type
import { resetPassword } from "../redux/slice/authSlice"; // Ensure correct import

const useResetPasswordForm = () => {
  const [form, setForm] = useState({ email: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>(); // ✅ Fix: Correctly type dispatch

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await dispatch(resetPassword(form.email)).unwrap(); // ✅ Fix: Correctly type async dispatch
      toast.success("Reset password email sent! Check your inbox.");
      setTimeout(() => router.push("/login"), 3000);
    } catch (error: unknown) {
      const errorMessage = (error instanceof Error) ? error.message : "An error occurred";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { form, loading, error, handleChange, handleSubmit };
};

export default useResetPasswordForm;
