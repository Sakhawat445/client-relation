import { v2 as cloudinary, UploadStream } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadFile(
  file: Buffer,
  folder: string,
  filename: string,
) {
  return new Promise((resolve, reject) => {
    const uploadstream: UploadStream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "auto", public_id: filename },
      (error, results) => {
        if (results) resolve(results);
        else reject(error);
      },
    );
    uploadstream.end(file);
  });
}
export default cloudinary;
