"use client";
import React, { useState } from "react";
import Image from "next/image";
import Button from "@/components/button/Button";
import CustomerModal from "@/components/customerModal/Modal";
import { Customer } from "@/types/types";

interface DocumentRowProps {
  doc: Customer;
  isSelected: boolean;
  onSelect: () => void;
}

export default function DocumentRow({ doc, isSelected, onSelect }: DocumentRowProps) {
  const fileUrl = doc.documentURL || "";
  let extractedName = "";
  let extractedType = "";

  if (fileUrl) {
    try {
      const parts = fileUrl.split("/");
      const filePart = parts[parts.length - 1];
      const dotIndex = filePart.lastIndexOf(".");
      if (dotIndex !== -1) {
        extractedName = filePart.substring(0, dotIndex);
        extractedType = filePart.substring(dotIndex + 1).toLowerCase();
      } else {
        extractedName = filePart;
      }
    } catch {
      extractedName = fileUrl;
    }
  } else {
    extractedName = "No file";
    extractedType = "";
  }

  let iconPath = "/default-file-icon.png";
  if (extractedType === "pdf") {
    iconPath = "/pdf-icon.png";
  } else if (extractedType === "xls" || extractedType === "xlsx") {
    iconPath = "/excel-icon.png";
  } else if (extractedType === "doc" || extractedType === "docx") {
    iconPath = "/word-icon.png";
  } else if (extractedType === "ppt" || extractedType === "pptx") {
    iconPath = "/ppt-icon.png";
  }

  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
  console.log("Document Row", doc);

  return (
    <>
      <tr className="border-b last:border-0">
        <td className="p-3">
          <input
            type="checkbox"
            aria-label="Select customer id"
            checked={isSelected}
            onChange={() => onSelect()}
          />
        </td>

        <td className="p-3">
          <div className="flex items-center gap-2">
            <Image src={iconPath} alt="File" width={24} height={24} />
            <div>
              <p className="font-semibold">{extractedName}</p>
              <p className="text-xs text-gray-500">
                Uploaded {doc.createdDate}
              </p>
            </div>
          </div>
        </td>

        <td className="p-3 text-center">{extractedType.toUpperCase()}</td>

        <td className="p-3">
          <div className="flex items-center gap-2">
            <Image
              src={doc.imageURI || "/default-avatar.png"}
              alt={doc.email}
              width={24}
              height={24}
              className="rounded-full aspect-square object-cover"
              />
            <span>{doc.name}</span>
          </div>
        </td>

        <td className="p-3 text-center">
          {doc.orderCount ? `v${doc.orderCount}` : "N/A"}
        </td>

        <td className="p-3 text-center">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {doc.status}
          </span>
        </td>

        <td className="p-3">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => window.open(doc.documentURL, "_blank")}
            >
              View
            </Button>
            <Button variant="outline" onClick={() => setIsDocumentModalOpen(true)}>
              Edit
            </Button>
          </div>
        </td>
      </tr>

      {isDocumentModalOpen && (
        <CustomerModal
          isOpen={isDocumentModalOpen}
          onClose={() => setIsDocumentModalOpen(false)}
          isDocumentModal={true}
          doc={doc}
        />
      )}
    </>
  );
}
