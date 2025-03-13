import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const useResetPasswordForm = () => {
  const [form, setForm] = useState({
    email: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Basic validation
    if (!form.email || !form.newPassword || !form.confirmNewPassword) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    if (form.newPassword !== form.confirmNewPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    // Simulate a password reset process (client-side only)
    try {
      // Here, you can add client-side logic to update the password
      // For example, you might update the password in localStorage or context
      console.log("Password reset logic goes here");

      // Simulate a delay for demonstration purposes
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Show success message
      toast.success("Password reset successfully! Redirecting to login...");

      // Redirect to login page after a delay
      setTimeout(() => {
        router.push("/login");
      }, 3000); // 3 seconds delay
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { form, loading, error, handleChange, handleSubmit };
};

export default useResetPasswordForm;