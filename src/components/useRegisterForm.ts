import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/slice/authSlice";
import type { RootState, AppDispatch } from "../redux/store";

const useRegisterForm = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const dispatch = useDispatch<AppDispatch>();
  const [formError, setFormError] = useState<string | null>(null);
  const { loading: authLoading, error: authError } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, onSuccess: () => void) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Registration logic here
      setLoading(false);
      onSuccess(); // Call the success callback
    } catch (error) {
      setFormError("Registration failed");
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    formError,
    handleChange,
    handleSubmit,
  };
};

export default useRegisterForm;