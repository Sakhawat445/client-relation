import { useAppSelector } from "@/redux/store"; // Import useAppSelector
import { RootState } from "@/redux/store"; // Ensure RootState is imported

const useProfile = () => {
  return useAppSelector((state: RootState) => state.auth);
};

export default useProfile;
