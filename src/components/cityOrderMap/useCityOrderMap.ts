import { useAppSelector, RootState } from "@/redux/store";

interface StateOrderData {
Country: string;  // Using "country" as "state" for map consistency
  orderCount: number;
  date: string;
}

export const useCityOrders = (): StateOrderData[] => {
  const orders = useAppSelector((state: RootState) => state.customer.customers);

  if (!orders) return [];

  const stateOrderMap: Record<string, StateOrderData> = {};

  orders.forEach((order) => {
    if (!order.address) return;

    // Extract city and country from address
    const addressParts = order.address.split(",").map((part) => part.trim());
    const country = addressParts.length > 1 ? addressParts[1] : addressParts[0]; // Get country

    if (!country) return; // Skip if country is missing

    if (!stateOrderMap[country]) {
      stateOrderMap[country] = {
        Country: country, // Treating country as state for mapping
        orderCount: 0,
        date: order.createdDate || new Date().toISOString(),
      };
    }

    // Sum up order counts per country (state)
    stateOrderMap[country].orderCount+= order.orderCount || 0;
  });

  return Object.values(stateOrderMap);
};
