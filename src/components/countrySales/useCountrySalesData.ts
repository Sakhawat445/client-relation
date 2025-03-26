import { useAppSelector } from "@/redux/store";

interface CountrySales {
  country: string;
  sales: number;
}

export const useCountrySalesData = () => {
  const customers = useAppSelector((state) => state.customer.customers);

  if (!customers || customers.length === 0) return { totalOrders: 0, salesData: [] };

  const countrySalesMap: Record<string, number> = {};

  let totalOrders = 0;

  customers.forEach((customer) => {
    // Extract country from the second value of the address
    const addressParts = customer.address ? customer.address.split(",").map(part => part.trim()) : [];
    const country = addressParts.length > 1 ? addressParts[1] : "Unknown";

    const sales = customer.orderCount || 0;
    totalOrders += sales; // Sum of all orderCount values

    if (!countrySalesMap[country]) {
      countrySalesMap[country] = 0;
    }

    countrySalesMap[country] += sales;
  });

  // Transform data for visualization
  const salesData: CountrySales[] = Object.entries(countrySalesMap).map(([country, sales]) => ({
    country,
    sales,
  }));

  return { totalOrders, salesData };
};
