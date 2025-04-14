
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchCustomers, deleteCustomer } from "../../redux/slice/customerSlice";
import { Customer } from "@/types/types";

export function useDocumentsManagement() {
  const dispatch = useAppDispatch();
  const { customers, status, error } = useAppSelector((state) => state.customer);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const handleDelete = () => {
    if (!selectedCustomer) return alert("Please select a document to delete.");
    if (selectedCustomer?.id) {
      dispatch(deleteCustomer(selectedCustomer?.id));
      setSelectedCustomer(null);
    } else {
      alert("Selected customer ID is undefined.");
    }
  };

  const totalPages = customers ? Math.ceil(customers.length / itemsPerPage) : 1;
  const paginatedDocuments = customers?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return {
    documents: customers,
    paginatedDocuments,
    status,
    error,
    selectedCustomer,
    setSelectedCustomer,
    currentPage,
    setCurrentPage,
    totalPages,
    handleDelete,
  };
}
