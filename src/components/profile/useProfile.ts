import { useAppSelector, useAppDispatch } from "@/redux/store";
import { useState, useEffect } from "react";
import { updateUser } from "@/redux/slice/authSlice";

const useProfile = () => {
  const { user, loading, error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState<string>(user?.name ?? "");
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [updateError, setUpdateError] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string>(
    user?.imageURL ?? "",
  );

  useEffect(() => {
    if (user?.imageURL) setImagePreview(user.imageURL);
    if (user?.name) setUsername(user.name);
  }, [user?.imageURL, user?.name]);

  const handleUpdate = async () => {
    try {
      setIsUpdating(true);
      setUpdateError("");

      const updateData = {
        name: username,
        imageURL: imagePreview,
      };

      console.log("Sending update to server:", updateData);

      const response = await fetch("/api/auth/register", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Update failed:", errorData);
        throw new Error(errorData.message || "Update failed");
      }

      const data = await response.json();
      console.log("Update successful:", data);

      dispatch(
        updateUser({
          name: username,
          imageURL: imagePreview,
        }),
      );
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update profile";
      setUpdateError(errorMessage);
      console.error("Update error:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      const uploadData = new FormData();
      uploadData.append("file", file);
      uploadData.append("filename", file.name);

      try {
        const response = await fetch("/api/imageUpload", {
          method: "POST",
          body: uploadData,
        });

        if (!response.ok) throw new Error("Upload failed");

        const result = await response.json();
        console.log("Upload successful:", result);

        if (name === "image") setImagePreview(result.url);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  return {
    user,
    loading,
    error,
    username,
    setUsername,
    imagePreview,
    setImagePreview,
    handleUpdate,
    handleFileChange,
    isUpdating,
    updateError,
  };
};

export default useProfile;
