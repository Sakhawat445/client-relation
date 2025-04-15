import { useAppSelector } from "@/redux/store";
import { CountrySales } from "@/types/types";

export const useCountrySalesData = () => {
  const customers = useAppSelector((state) => state.customer?.customers);

  if (!customers || customers?.length === 0)
    return { totalOrders: 0, salesData: [] };

  const countrySalesMap: Record<string, number> = {};

  let totalOrders = 0;

  customers.forEach((customer) => {
    const addressParts = customer?.address
      ? customer?.address.split(",").map((part) => part.trim())
      : [];
    const country = addressParts.length > 1 ? addressParts[1] : "Unknown";

    const sales = customer?.orderCount || 0;
    totalOrders += sales;

    if (!countrySalesMap[country]) {
      countrySalesMap[country] = 0;
    }

    countrySalesMap[country] += sales;
  });

  const salesData: CountrySales[] = Object.entries(countrySalesMap)?.map(
    ([country, sales]) => ({
      country,
      sales,
    }),
  );

  return { totalOrders, salesData };
};
