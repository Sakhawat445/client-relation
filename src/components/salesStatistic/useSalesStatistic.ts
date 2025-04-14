import { useAppSelector } from "@/redux/store";

export const useSalesData = () => {
  const customers = useAppSelector((state) => state.customer?.customers); 

  if (!customers || customers?.length === 0) return { totalRevenue: 0, totalSales: 0, data: [] };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Unknown";

    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  const totalRevenue = customers?.reduce((sum, customer) => sum + (customer?.spendings || 0), 0);
  const totalSales = customers?.reduce((sum, customer) => sum + (customer?.orderCount || 0), 0);

  const salesData = customers?.map((customer) => ({
    date: customer.createdDate ? formatDate(customer.createdDate) : "Unknown",     revenue: customer?.spendings || 0, 
    sales: customer?.orderCount || 0,  
    views: customer?.orderCount || 0, 
  }));

  return { totalRevenue, totalSales, data: salesData };
};
