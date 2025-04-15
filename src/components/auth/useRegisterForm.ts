import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/slice/authSlice";
import type { RootState, AppDispatch } from "../../redux/store";

const useRegisterForm = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const dispatch = useDispatch<AppDispatch>();
  const [formError, setFormError] = useState<string | null>(null);
  useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    onSuccess: () => void,
  ) => {
    e.preventDefault();
    setFormError(null);

    if (!form.name || !form.email || !form.password) {
      setFormError("All fields are required.");
      return;
    }

    setLoading(true);
    try {
      const resultAction = await dispatch(registerUser(form));
      if (registerUser.fulfilled.match(resultAction)) {
        onSuccess();
      } else {
        setFormError((resultAction.payload as string) || "Registration failed");
      }
    } catch {
      setFormError("Something went wrong. Please try again.");
    } finally {
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
