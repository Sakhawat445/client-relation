import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector, type RootState } from "@/redux/store";
import { fetchUserData } from "@/redux/slice/authSlice";

export function useHeader() {
  const user = useAppSelector((state: RootState) => state.auth.user);
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!user) {
      dispatch(fetchUserData());
    }
  }, [dispatch, user]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return { user, search, handleSearchChange };
}
