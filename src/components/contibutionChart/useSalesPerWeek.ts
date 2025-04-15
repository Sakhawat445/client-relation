import { useState, useEffect } from "react";
import { useAppSelector } from "@/redux/store";
import { RootState } from "@/redux/store";
import { HeatMapData } from "@/types/types";

const useSalesPerWeek = () => {
  const customerSales = useAppSelector(
    (state: RootState) => state.customer?.customers,
  );
  const [data, setData] = useState<HeatMapData[]>([]);

  useEffect(() => {
    if (customerSales && customerSales.length > 0) {
      const groupedData: Record<string, HeatMapData> = {};

      customerSales.forEach((customer) => {
        const date = new Date(customer?.createdDate);
        const hour = date?.getUTCHours().toString();
        const day = date?.toLocaleDateString("en-US", {
          weekday: "short",
        }) as keyof HeatMapData;
        const orderCount = customer.orderCount || 0;

        if (!groupedData[hour]) {
          groupedData[hour] = {
            hour,
            Mon: 0,
            Tue: 0,
            Wed: 0,
            Thu: 0,
            Fri: 0,
            Sat: 0,
            Sun: 0,
          };
        }

        (groupedData[hour][day as keyof HeatMapData] as number) += orderCount;
      });

      setData(Object.values(groupedData));
    }
  }, [customerSales]);

  return data;
};

export default useSalesPerWeek;
