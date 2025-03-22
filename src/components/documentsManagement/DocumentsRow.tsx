import  Button  from "@/components/button/Button";
import Image from "next/image";

interface Document {
  name: string;
  date: string;
  type: string;
  avatar: string;
  author: string;
  version: string;
}

export default function DocumentRow({ document }: { document: Document }) {
  return (
    <div className="flex items-center justify-between p-4 border-b bg-white rounded-lg shadow-sm">
      <div className="flex items-center gap-4">
        <Image src="/file-icon.png" alt="File" width={24} height={24} />
        <div>
          <p className="font-semibold">{document.name}</p>
          <p className="text-xs text-gray-500">Uploaded {document.date}</p>
        </div>
      </div>
      <p>{document.type}</p>
      <div className="flex items-center gap-2">
        <Image src={document.avatar} alt={document.author} width={24} height={24} className="rounded-full" />
        <p>{document.author}</p>
      </div>
      <p>{document.version}</p>
      <div className="flex gap-2">
        <Button variant="outline">View</Button>
        <Button variant="outline">Edit</Button>
      </div>
    </div>
  );
}
