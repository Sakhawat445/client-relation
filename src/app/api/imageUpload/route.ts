// api/upload/route.ts
import { uploadFile } from "@/utils/cloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const filenameEntry = formData.get("filename");
    const sampleFilename = typeof filenameEntry === "string" 
      ? filenameEntry.split('.').slice(0, -1).join('.') 
      : null; // Get filename from request

    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    if (!sampleFilename) {
      console.log('=> ',sampleFilename)
      return NextResponse.json(
        {  error: "Filename not provided" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const res = (await uploadFile(buffer, "mediaUploader", sampleFilename)) as {
      public_id: string;
      secure_url: string;
      format: string;
    };

    console.log(formData)
    return NextResponse.json(
      {
        filename: sampleFilename, // Return the sample filename provided
        public_id: res.public_id,
        url: res.secure_url,
        format: res.format,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
