import { useState, useEffect } from "react";
import { useAppSelector, RootState } from "@/redux/store";

interface SalesData {
  date: string;
  currentWeek: number;
  lastWeek: number;
}

export const useSalesData = () => {
  const customers = useAppSelector((state: RootState) => state.customer?.customers); 

  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [totalSales, setTotalSales] = useState<number>(0);
  const [percentageChange, setPercentageChange] = useState<number>(0);

  useEffect(() => {
    if (customers.length > 0) {
      const today = new Date();
      const oneWeekAgo = new Date(today);
      oneWeekAgo.setDate(today.getDate() - 7);
      const twoWeeksAgo = new Date(today);
      twoWeeksAgo.setDate(today.getDate() - 14);

      const currentWeekCustomers = customers?.filter((customer) => new Date(customer?.createdDate) >= oneWeekAgo);
      const lastWeekCustomers = customers?.filter(
        (customer) => new Date(customer?.createdDate) >= twoWeeksAgo && new Date(customer?.createdDate) < oneWeekAgo
      );

      const currentWeekTotal = currentWeekCustomers?.reduce((acc, customer) => acc + (customer?.spendings ?? 0), 0);

      const lastWeekTotal = lastWeekCustomers?.reduce((acc, customer) => acc + (customer?.spendings ?? 0), 0);

      setTotalSales(currentWeekTotal);

      const percentage = lastWeekTotal > 0 ? ((currentWeekTotal - lastWeekTotal) / lastWeekTotal) * 100 : 0;
      setPercentageChange(percentage);

      const groupedData: Record<string, { currentWeek: number; lastWeek: number }> = {};

      customers.forEach((customer) => {
        const date = new Date(customer?.createdDate).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });

        if (!groupedData[date]) {
          groupedData[date] = { currentWeek: 0, lastWeek: 0 };
        }

        if (new Date(customer?.createdDate) >= oneWeekAgo) {
          groupedData[date].currentWeek += customer?.spendings ?? 0;
        } else if (new Date(customer?.createdDate) >= twoWeeksAgo) {
          groupedData[date].lastWeek += customer?.spendings ?? 0;
        }
      });

      const formattedData = Object.entries(groupedData)?.map(([date, values]) => ({
        date,
        ...values,
      }));

      setSalesData(formattedData);
    }
  }, [customers]);

  return { salesData, totalSales, percentageChange };
};
