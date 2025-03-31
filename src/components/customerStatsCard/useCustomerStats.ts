import { useAppSelector } from "@/redux/store";
import { ChartData } from "chart.js";

export const useCustomerStats = () => {
  // Fetch all customers from Redux store
  const customers = useAppSelector((state) => state.customer.customers) || [];

  // Get total number of customers
  const totalCustomers = customers.length;

  // Generate chart data
  const chartData: ChartData<"line", number[], string> = {
    labels: customers.map((customer) => `Customer ${customer.id}`), // X-axis labels
    datasets: [
      {
        label: "Total Customers",
        data: customers.map((_, index) => index + 1), // Y-axis values (customer count)
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.1)",
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  return { totalCustomers, chartData };
};
