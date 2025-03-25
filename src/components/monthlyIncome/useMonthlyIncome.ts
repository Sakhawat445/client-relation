import { useAppSelector } from "@/redux/store";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc); // Enable UTC plugin for correct date handling

export const useMonthlyIncome = () => {
  // Define the structure of customer data
  interface Customer {
    createdDate?: string;
    spendings?: number; // Single total spendings value
  }

  // Fetch customers from Redux store
  const customers = (useAppSelector((state) => state.customer.customers) as Customer[]) || [];

  // Get the current month and last three months dynamically
  const currentMonth = dayjs().format("MMMM"); // Example: "March"
  const lastThreeMonths = [
    dayjs().subtract(2, "month").format("MMMM"), // "January"
    dayjs().subtract(1, "month").format("MMMM"), // "February"
    currentMonth, // "March"
  ];

  // Filter customers who were created BEFORE the current month
  const Customers = customers.filter((customer) =>
    customer.createdDate
      ? dayjs(customer.createdDate).utc().isBefore(dayjs().startOf("month"))
      : false
  );

  console.log("Valid Customers:",Customers);

  // Calculate total spendings for each of the last three months
  const totalSpendings = Customers.reduce((sum, customer) => sum + (customer.spendings ?? 0), 0);

  console.log("Total Spendings:", totalSpendings);

  // Prepare data for the bar chart (same amount for all months since spendings is a single value)
  const chartData = lastThreeMonths.map((month) => ({
    name: month,
    value: totalSpendings, // Use total spendings directly
    color: month === currentMonth ? "#9f7aea" : month === lastThreeMonths[1] ? "#4299e1" : "#f56565",
  }));

  console.log("Chart Data:", chartData);

  return {
    totalIncome: totalSpendings, // Just the total spendings
    percentageChange: 0, // Can't calculate change without previous months' breakdown
    chartData,
  };
};
