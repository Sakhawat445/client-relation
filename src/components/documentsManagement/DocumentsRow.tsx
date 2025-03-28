// components/document/DocumentsRow.tsx
import Image from "next/image";
import Button from "@/components/button/Button";
import { Customer } from "@/types/types";

interface DocumentRowProps {
  doc: Customer;
}

export default function DocumentRow({ doc }: DocumentRowProps) {
  // Use doc.documentURL as the file URL for extraction.
  const fileUrl = doc.documentURL || "";
  let extractedName = "";
  let extractedType = "";
  
  if (fileUrl) {
    try {
      const parts = fileUrl.split("/");
      // Use the last part of the URL (e.g. "dummy.pdf")
      const filePart = parts[parts.length - 1];
      const dotIndex = filePart.lastIndexOf(".");
      if (dotIndex !== -1) {
        extractedName = filePart.substring(0, dotIndex); // "dummy"
        extractedType = filePart.substring(dotIndex + 1).toLowerCase();  // "pdf"
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

  // Determine which icon to show based on the file extension.
  let iconPath = "/default-file-icon.png"; // fallback icon
  if (extractedType === "pdf") {
    iconPath = "/pdf-icon.png";
  } else if (extractedType === "xls" || extractedType === "xlsx") {
    iconPath = "/excel-icon.png";
  } else if (extractedType === "doc" || extractedType === "docx") {
    iconPath = "/word-icon.png";
  } else if (extractedType === "ppt" || extractedType === "pptx") {
    iconPath = "/ppt-icon.png";
  }
  // Add more conditions as needed.

  return (
    <tr className="border-b last:border-0">
      {/* Checkbox */}
      <td className="p-3">
        <input type="checkbox" />
      </td>

      {/* Document Name & Date */}
      <td className="p-3">
        <div className="flex items-center gap-2">
          {/* Icon based on document type */}
          <Image src={iconPath} alt="File" width={24} height={24} />
          <div>
            <p className="font-semibold">{extractedName}</p>
            <p className="text-xs text-gray-500">Uploaded {doc.createdDate}</p>
          </div>
        </div>
      </td>

      {/* Document Type */}
      <td className="p-3 text-center">{extractedType.toUpperCase()}</td>

      {/* Author (with avatar) */}
      <td className="p-3">
        <div className="flex items-center gap-2">
          <Image
            src={doc.imageURI || "/default-avatar.png"}
            alt={doc.email}
            width={24}
            height={24}
            className="rounded-full"
          />
          <span>{doc.name}</span>
        </div>
      </td>

      {/* Version */}
      <td className="p-3 text-center">
        {doc.orderCount ? `v${doc.orderCount}` : "N/A"}
      </td>

      {/* Status */}
      <td className="p-3 text-center">
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          {doc.status}
        </span>
      </td>

      {/* Actions */}
      <td className="p-3">
        <div className="flex gap-2">
          <Button variant="outline">View</Button>
          <Button variant="outline">Edit</Button>
        </div>
      </td>
    </tr>
  );
}
