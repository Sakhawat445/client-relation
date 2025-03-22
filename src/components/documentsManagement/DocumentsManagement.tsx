import { useState } from "react";
import Button from "@/components/button/Button";
import Input from "@/components/input/InputField";
import { useDocumentsManagement } from "./useDocumentsManagement"; // Ensure correct import

export default function DocumentPage() {
  const [search, setSearch] = useState("");
  const { customers: documents, status, error } = useDocumentsManagement(); // Fetch documents

  const loading = status === "loading";

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Filter & Search Section */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          <Button variant="outline">All</Button>
          <Button variant="outline">Active</Button>
          <Button variant="outline">Archive</Button>
        </div>
        <div className="flex gap-2">
          <Input
            name="search"
            label="Search"
            type="text"
            placeholder="Type here"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button>Search</Button>
          <Button>Download</Button>
          <Button variant="destructive">Delete</Button>
        </div>
      </div>

      {/* Loading and Error Handling */}
      {loading && <p className="text-center text-gray-500">Loading documents...</p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}

      {/* Document Table */}
      {!loading && !error && documents?.length > 0 ? (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-3 text-left">Document Name</th>
                <th className="p-3">Type</th>
                <th className="p-3">Author</th>
                <th className="p-3">Uploaded File</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc, index) => (
                <tr key={index} className="border-b">
                  {/* <td className="p-3">{doc.name}</td> */}
                  <td className="p-3">{doc.name}</td>
                  <td className="p-3">
                    {doc.documentURL ? (
                      <a
                        href={doc.documentURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        View Document
                      </a>
                    ) : (
                      "No file uploaded"
                    )}
                  </td>
                  <td className="p-3">
                    <Button variant="outline">Download</Button>
                    <Button variant="destructive">Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !loading && <p className="text-center text-gray-500">No documents found.</p>
      )}
    </div>
  );
}
