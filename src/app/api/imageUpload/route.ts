
import { NextRequest, NextResponse } from "next/server";
import { uploadFile } from "../../../utils/cloudinary";

export async function POST(req: NextRequest) {
  try {
	const formData = await req.formData();
	const file = formData.get("file") as File;

	if (!file) {
	  return NextResponse.json({ error: "File not found" }, { status: 404 });
	}

	const buffer = Buffer.from(await file.arrayBuffer());
	const res = await uploadFile(buffer, "mediaUploader") as {
	  public_id: string;
	  secure_url: string;
	  format: string;
	};

	return NextResponse.json(
	  {
		public_id: res.public_id,
		url: res.secure_url,
		format: res.format,
	  },
	  { status: 200 }
	);
  } catch (error) {
	console.error(error);
	return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}