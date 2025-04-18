// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser } from "@/redux/slice/authSlice";
// import type { RootState, AppDispatch } from "@/redux/store";
// import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";

// const useLoginForm = () => {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const dispatch = useDispatch<AppDispatch>();
//   const { loading, error, user } = useSelector(
//     (state: RootState) => state.auth,
//   );
//   const router = useRouter();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const resultAction = await dispatch(loginUser(form));

//     if (loginUser.fulfilled.match(resultAction)) {
//       toast.success("User logged in successfully!", {
//         position: "top-right",
//         autoClose: 2000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       });

//       setTimeout(() => {
//         router.push("/dashboard");
//       }, 6000);
//     } else {
//       toast.error(
//         (resultAction.payload as string) || "Login failed. Please try again.",
//         {
//           position: "top-right",
//           autoClose: 3000,
//         },
//       );
//     }
//   };

//   return {
//     form,
//     loading,
//     error,
//     user,
//     handleChange,
//     handleSubmit,
//   };
// };

// export default useLoginForm;

"use client";

import { useState, useEffect } from "react";
import { signIn, getCsrfToken } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface FormState {
  email: string;
  password: string;
}

const useLoginForm = () => {
  const [form, setForm] = useState<FormState>({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [csrfToken, setCsrfToken] = useState<string | undefined>(undefined);
  const router = useRouter();

  // Fetch CSRF token once on mount
  useEffect(() => {
    (async () => {
      const token = await getCsrfToken();
      setCsrfToken(token || undefined);
    })();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Use NextAuth signIn helper
    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
      callbackUrl: "/dashboard",
      csrfToken,
    });

    setLoading(false);

    if (res?.error) {
      setError(res.error);
      toast.error(res.error, { position: "top-right", autoClose: 3000 });
    } else {
      toast.success("Logged in successfully!", {
        position: "top-right",
        autoClose: 2000,
      });
      router.push(res?.url || "/dashboard");
    }
  };

  return {
    form,
    loading,
    error,
    csrfToken,
    handleChange,
    handleSubmit,
  };
};

export default useLoginForm;
