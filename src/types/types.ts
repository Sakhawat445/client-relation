import { ReactNode } from "react";
import { ChartData } from "chart.js";
export type User = {
  id: string;
  name: string;
  email: string;
  imageURL?: string;
};

export type Customer = {
  id?: string;
  name: string;
  email: string;
  imageURI?: string;
  orderCount?: number;
  spendings?: number;
  documentURL?: string;
  createdDate: string;
  status: string;
  address: string;
  contactNumber: number;
  deviceType: string;
  selectedProduct?: string;
  productType?: string;
  product?: { id: string; name: string };
};

export type Product = {
  id?: string;
  name: string;
  price: number;
  stock: number;
  companyName: string;
  imageURL: string;
};

export type AuthState = {
  user: User | null;
  users: User[];
  loading: boolean;
  error: string | null;
};

export type CustomerState = {
  customers: Customer[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};
export type ProductState = {
  products: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};
export type ButtonProps = {
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
  variant?: "primary" | "outline";
  onClick?: () => void;
};

export type CustomerModalProps = {
  isOpen: boolean;
  onClose: () => void;
  isDocumentModal?: boolean;
  isEditModal?: boolean;
  isEditMode?: boolean;
  doc?: Customer;
  editCustomer?: Customer | null;
};

export type CustomerProps = {
  customer: Customer;
  onSelect: (id: string) => void;
  isSelected: boolean;
};
export type DocumentRowProps = {
  doc: Customer;
  isSelected: boolean;
  onSelect: () => void;
};

export type InputFieldProps = {
  type: string;
  name: string;
  id?: string;
  className?: string;

  placeholder?: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
};
export type HeatMapData = {
  hour: string;
  Mon: number;
  Tue: number;
  Wed: number;
  Thu: number;
  Fri: number;
  Sat: number;
  Sun: number;
};
export type OrderData = {
  country: string;
  orders: number;
};
export type CustomerListProps = {
  currentPage: number;
  itemsPerPage: number;
};
export type ProductModalProps = {
  onClose: () => void;
  onSave: (newProduct: {
    name: string;
    price: number;
    stock: number;
    companyName: string;
    imageFile?: File | null;
  }) => void;
};

export type ProductProps = {
  product: {
    id?: string;
    name: string;
    price: number;
    stock: number;
    companyName: string;
    imageURL: string;
    orderCount: number;
    orderDate?: string;
    status: string;
  };
};
export type PurchaseSource = {
  name: string;
  value: number;
  color: string;
};

export type SalesData = {
  date: string;
  currentWeek: number;
  lastWeek: number;
};

export type SaleItemProps = {
  name: string;
  country: string;
  amount: number;
  image: string;
};
export type StatsCardProps = {
  title: string;
  amount: string | number;
  percentage: string | number;
  isPositive: boolean;
  chartData: ChartData<"line", number[], string>;
  icon: ReactNode;
  bgColor: string;
};
export type CustomBarLabelProps = {
  x: number;
  y: number;
  width: number;
  value: number;
};
export type VisitorsData = {
  date: string;
  visitors: number;
};
export type StatCardProps = {
  title: string;
  value: number;
  color: string;
  textColor?: string;
  icon: React.ReactNode;
};
export type StateOrderData = {
  Country: string;
  orderCount: number;
  date: string;
};

export type CountrySales = {
  country: string;
  sales: number;
};

