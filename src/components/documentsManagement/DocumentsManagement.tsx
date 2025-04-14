"use client";

import React, { useState } from "react";
import Button from "@/components/button/Button";
import DocumentRow from "../documentRow/DocumentsRow";
import { useDocumentsManagement } from "./useDocumentsManagement";
import { Search } from "lucide-react";

export default function DocumentManagement() {
  const {
    error,
    documents,
    paginatedDocuments,
    currentPage,
    totalPages,
    setCurrentPage,
    selectedCustomer,
    setSelectedCustomer,
    handleDelete,
  } = useDocumentsManagement();

  const [search, setSearch] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col gap-4 mb-5 lg:flex-row lg:items-center lg:justify-between">
        {/* Tabs */}
        <div className="flex gap-2 sm:gap-4 text-sm font-medium border-b border-gray-300 overflow-x-auto pb-2">
          {["All", "Active", "Archive"].map((tab) => (
            <button
              key={tab}
              className="px-2 sm:px-4 pb-2 whitespace-nowrap text-gray-700 hover:text-purple-600 border-b-2 border-transparent hover:border-purple-600 transition"
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search & Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center w-full sm:w-auto">
          <div className="relative hidden md:flex w-full md:w-80 rounded-md overflow-hidden border border-gray-300">
            <input
              type="text"
              placeholder="Type here"
              value={search}
              onChange={handleSearchChange}
              className="flex-1 px-4 py-2 text-sm focus:outline-none"
            />
            <button className="flex items-center justify-center gap-1 px-4 bg-purple-500 text-white text-sm font-medium">
              <Search size={16} />
              Search
            </button>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="hidden sm:inline-block">
              Download
            </Button>
            <Button variant="outline" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      {documents === null ? (
        <p className="text-center text-sm text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-sm text-red-500">Something went wrong.</p>
      ) : documents && documents.length > 0 ? (
        <>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-[800px] md:min-w-0 border-collapse text-sm">
                <thead className="bg-purple-200 text-gray-600 text-left">
                  <tr>
                    <th className="p-3 w-10"></th>
                    <th className="p-3">Document Name</th>
                    <th className="p-3 text-center">Type</th>
                    <th className="p-3">Author</th>
                    <th className="p-3 text-center">Version</th>
                    <th className="p-3 text-center">Status</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedDocuments?.map((doc, index) => (
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
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-4 text-sm gap-2">
            <p className="text-center sm:text-left">
              Showing {(currentPage - 1) * 10 + 1} to{" "}
              {Math.min(currentPage * 10, documents?.length)} of {documents?.length} entries
            </p>

            <div className="flex flex-wrap justify-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1)?.map((page) => (
                <button
                  key={page}
                  className={`px-2 py-1 sm:px-3 sm:py-1.5 rounded-md border text-xs sm:text-sm ${
                    page === currentPage
                      ? "bg-purple-600 text-white border-purple-600"
                      : "bg-white text-gray-700 border-gray-300"
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
        <p className="text-center text-gray-500">No documents found.</p>
      )}
    </div>
  );
}
