

import { useAppSelector } from "@/redux/store";

export const useTotalOrders = () => {
  // Fetch all customers from Redux store
  const customers = useAppSelector((state) => state.customer?.customers);

  // Total orders (sum of orderCount for ALL customers)
  const totalOrders = customers?.reduce((sum, customer) => sum + (customer?.orderCount || 0), 0) || 0;

  // Completed orders (sum of orderCount for only APPROVED customers)
  const completedOrders =
    customers?.filter((customer) => customer?.status === "APPROVED")
      .reduce((sum, customer) => sum + (customer?.orderCount || 0), 0) || 0;

  return { totalOrders, completedOrders };
};
