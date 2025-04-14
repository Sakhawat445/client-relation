import { useState, useEffect } from "react";
import { useAppSelector, RootState } from "@/redux/store";

interface OrderData {
  country: string;
  orders: number;
}

const useCountryOrderChart = () => {
  const customers = useAppSelector(
    (state: RootState) => state.customer?.customers
  );

  const [orderData, setOrderData] = useState<OrderData[]>([]);

  useEffect(() => {
    if (!customers || customers?.length === 0) return;

    const countryOrders: Record<string, number> = {};

    customers?.forEach((customer) => {
      const addressParts = customer?.address.split(", ");
      const country = addressParts[addressParts?.length - 1].trim();

      if (country) {
        countryOrders[country] =
          (countryOrders[country] || 0) + (Number(customer?.orderCount) || 1);
      }
    });

    const formattedData = Object.entries(countryOrders)
      .map(([country, orders]) => ({ country, orders }))
      .sort((a, b) => b.orders - a.orders);

    setOrderData(formattedData);
  }, [customers]);

  return orderData;
};

export default useCountryOrderChart;
