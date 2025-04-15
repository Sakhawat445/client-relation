import { useAppSelector } from "@/redux/store";

export const useDeviceStats = () => {
  const customers = useAppSelector((state) => state.customer?.customers);

  if (!customers || customers?.length === 0) {
    return { desktopUsers: 0, mobileUsers: 0 };
  }

  const desktopUsers = customers?.filter(
    (user) => user.deviceType === "DESKTOP",
  ).length;
  const mobileUsers = customers?.filter(
    (user) => user.deviceType === "MOBILE",
  ).length;
  const totalUsers = desktopUsers + mobileUsers;

  return {
    desktopUsers:
      totalUsers > 0 ? Math.round((desktopUsers / totalUsers) * 100) : 0,
    mobileUsers:
      totalUsers > 0 ? Math.round((mobileUsers / totalUsers) * 100) : 0,
  };
};
