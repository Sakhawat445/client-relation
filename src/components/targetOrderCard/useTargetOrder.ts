import { useAppSelector } from "@/redux/store";

export const useTotalOrders = () => {
  const customers = useAppSelector((state) => state.customer?.customers);

  const totalOrders =
    customers?.reduce(
      (sum, customer) => sum + (customer?.orderCount || 0),
      0,
    ) || 0;

  const completedOrders =
    customers
      ?.filter((customer) => customer?.status === "APPROVED")
      .reduce((sum, customer) => sum + (customer?.orderCount || 0), 0) || 0;

  return { totalOrders, completedOrders };
};
