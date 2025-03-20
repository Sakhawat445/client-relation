import { useState } from "react";

const useNewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<boolean> => {
    e.preventDefault();
    setError("");

    if (!password || !confirmPassword) {
      setError("Both fields are required.");
      return false;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }

    const token = new URLSearchParams(window.location.search).get("token");
    console.log("Reset Token:", token);
    
    if (!token) {
      setError("Invalid or expired token.");
      return false;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/auth/newPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to update password");

      return true; // Success
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An unknown error occurred");
      return false; // Failure
    } finally {
      setLoading(false);
    }
  };

  return { password, confirmPassword, setPassword, setConfirmPassword, handleSubmit, error, loading };
};

export default useNewPassword;
