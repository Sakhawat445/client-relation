import { useAppSelector, RootState } from "@/redux/store";

interface StateOrderData {
Country: string; 
  orderCount: number;
  date: string;
}

export const useCityOrders = (): StateOrderData[] => {
  const orders = useAppSelector((state: RootState) => state.customer.customers);

  if (!orders) return [];

  const stateOrderMap: Record<string, StateOrderData> = {};

  orders.forEach((order) => {
    if (!order.address) return;

    const addressParts = order.address.split(",").map((part) => part.trim());
    const country = addressParts.length > 1 ? addressParts[1] : addressParts[0]; 

    if (!country) return; 

    if (!stateOrderMap[country]) {
      stateOrderMap[country] = {
        Country: country, 
        orderCount: 0,
        date: order.createdDate || new Date().toISOString(),
      };
    }

  
    stateOrderMap[country].orderCount+= order.orderCount || 0;
  });

  return Object.values(stateOrderMap);
};
