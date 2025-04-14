import { useAppSelector } from "@/redux/store";
import { ChartData } from "chart.js";

export const useCustomerStats = () => {
  const customers = useAppSelector((state) => state.customer?.customers) || [];

  const totalCustomers = customers?.length;

  const chartData: ChartData<"line", number[], string> = {
    labels: customers?.map(() => ""),
    datasets: [
      {
        label: "Total Customers",
        data: customers?.map((_, index) => index + 1),
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.1)",
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  return { totalCustomers, chartData };
};
