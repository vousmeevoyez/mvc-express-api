import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

export async function upload(file) {
  // Configuration
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  // Upload an image
  return cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
}

export default upload;
