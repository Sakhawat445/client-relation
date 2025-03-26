import { useAppSelector } from "@/redux/store";

export const useSalesData = () => {
  const customers = useAppSelector((state) => state.customer.customers); // Fetch customers from Redux

  if (!customers || customers.length === 0) return { totalRevenue: 0, totalSales: 0, data: [] };

  // Function to format date as "3 March 2025"
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Unknown"; // Handle invalid dates

    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  // Compute total revenue and total sales
  const totalRevenue = customers.reduce((sum, customer) => sum + (customer.spendings || 0), 0);
  const totalSales = customers.reduce((sum, customer) => sum + (customer.orderCount || 0), 0); // Sum of orderCount

  // Transform data for chart display
  const salesData = customers.map((customer) => ({
    date: customer.createdDate ? formatDate(customer.createdDate) : "Unknown", // Format date
    revenue: customer.spendings || 0,  // Revenue from spending
    sales: customer.orderCount || 0,   // Sales from order count
    views: customer.orderCount || 0, // Assuming profile views are stored
  }));

  return { totalRevenue, totalSales, data: salesData };
};
