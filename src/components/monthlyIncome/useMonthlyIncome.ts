import { useAppSelector } from "@/redux/store";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc); 
export const useMonthlyIncome = () => {
  interface Customer {
    createdDate?: string;
    spendings?: number; 
  }

  const customers = (useAppSelector((state) => state.customer.customers) as Customer[]) || [];

  const currentMonth = dayjs().format("MMMM"); 
  const lastThreeMonths = [
    dayjs().subtract(2, "month").format("MMMM"), 
    dayjs().subtract(1, "month").format("MMMM"), 
    currentMonth, 
  ];

  const Customers = customers.filter((customer) =>
    customer.createdDate
      ? dayjs(customer.createdDate).utc().isBefore(dayjs().startOf("month"))
      : false
  );


  const totalSpendings = Customers.reduce((sum, customer) => sum + (customer.spendings ?? 0), 0);


  const chartData = lastThreeMonths.map((month) => ({
    name: month,
    value: totalSpendings,
    color: month === currentMonth ? "#9f7aea" : month === lastThreeMonths[1] ? "#4299e1" : "#f56565",
  }));


  return {
    totalIncome: totalSpendings, 
    percentageChange: 0, 
    chartData,
  };
};
