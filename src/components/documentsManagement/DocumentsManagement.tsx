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
  // Use the 'documents' property returned from the hook.
  const { documents, status, error } = useDocumentsManagement();
  
  // Use the typed dispatch
  const dispatch = useDispatch<AppDispatch>();

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const loading = status === "loading";

  const handleDelete = () => {
    if (!selectedCustomer) {
      console.log("in handleDelete", selectedCustomer);
      alert("Please select a document to delete.");
      return;
    }
    // Dispatch the delete thunk using the selected customer's id.
    if (selectedCustomer.id) {
      dispatch(deleteCustomer(selectedCustomer.id));
    } else {
      alert("Selected customer ID is undefined.");
    }
    setSelectedCustomer(null); // Clear selection after delete.
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Document Management</h2>
        <Button onClick={handleDelete}>Delete</Button>
      </div>

      {loading && (
        <p className="text-center text-gray-500">Loading documents...</p>
      )}
      {error && (
        <p className="text-center text-red-500">Error: {error}</p>
      )}

      {/* Table with DocumentRows */}
      {!loading && !error && documents?.length > 0 ? (
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
              {documents.map((doc: Customer, index: number) => (
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
      ) : (
        !loading && (
          <p className="text-center text-gray-500">No documents found.</p>
        )
      )}
    </div>
  );
}
