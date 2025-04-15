import { useAppSelector } from "@/redux/store";

export const useCustomerDemographics = () => {
  const customers = useAppSelector((state) => state.customer?.customers);

  if (!customers || customers?.length === 0) return {};

  const countryCityMap: Record<string, Set<string>> = {};

  customers.forEach((customer) => {
    const address = customer?.address || "Unknown, Unknown";
    const [city, country] = address.split(",").map((item) => item.trim());

    if (!countryCityMap[country]) {
      countryCityMap[country] = new Set();
    }

    countryCityMap[country].add(city);
  });

  return countryCityMap;
};
