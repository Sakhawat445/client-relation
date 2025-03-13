import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "@/redux/slice/authSlice";
import { useRouter } from "next/navigation";

const useLoginForm = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const router = useRouter();

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(loginUser(form) as any);

    if (loginUser.fulfilled.match(result)) {
      router.push("/dashboard"); // Redirect if login successful
    }
  };

  return { form, handleChange, handleSubmit };
};

export default useLoginForm;
