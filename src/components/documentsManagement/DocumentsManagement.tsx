"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useDocumentsManagement } from "./useDocumentsManagement"; // adjust path
import DocumentRow from "./DocumentsRow";
import Button from "@/components/button/Button";
import { Customer } from "@/types/types";
import { deleteCustomer } from "@/redux/slice/customerSlice"; // adjust the import path
import type { AppDispatch } from "@/redux/store"; // adjust the path to your store

export default function DocumentManagement() {
  const { documents, status, error } = useDocumentsManagement();
  const dispatch = useDispatch<AppDispatch>();

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const loading = status === "loading";

  const handleDelete = () => {
    if (!selectedCustomer) {
      alert("Please select a document to delete.");
      return;
    }
    if (selectedCustomer.id) {
      dispatch(deleteCustomer(selectedCustomer.id));
    } else {
      alert("Selected customer ID is undefined.");
    }
    setSelectedCustomer(null);
  };

  const totalPages = documents ? Math.ceil(documents.length / itemsPerPage) : 1;

  const paginatedDocuments = documents?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen ">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Document Management</h2>
        <Button onClick={handleDelete}>Delete</Button>
      </div>

      {loading && <p className="text-center text-gray-500">Loading documents...</p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}

      {!loading && !error && documents?.length > 0 ? (
        <>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="p-3 text-left w-10"></th>
                  <th className="p-3 text-left">Document Name</th>
                  <th className="p-3 text-center">Type</th>
                  <th className="p-3 text-left">Author</th>
                  <th className="p-3 text-center">Version</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedDocuments.map((doc: Customer, index: number) => (
                  <DocumentRow
                    key={doc.id || index}
                    doc={doc}
                    isSelected={selectedCustomer?.id === doc.id}
                    onSelect={() => setSelectedCustomer(doc)}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4 text-sm">
            <p>
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, documents.length)} of{" "}
              {documents.length} entries
            </p>
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={`px-3 py-1 rounded-md ${
                    page === currentPage ? "bg-purple-600 text-white" : "bg-white border"
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        !loading && <p className="text-center text-gray-500">No documents found.</p>
      )}
    </div>
  );
}