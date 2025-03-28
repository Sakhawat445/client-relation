import { useAppSelector } from "@/redux/store";


const useProfile = () => {
  const { user, loading, error } = useAppSelector((state) => state.auth);
  
  console.log("User data in useProfile:", user);

  return {
    user,
    loading,
    error,
    };
};

export default useProfile;