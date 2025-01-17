import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function upload_stream(buffer: Buffer, publicId?: string) {
  const [_, result]: [any, UploadApiResponse] = await Promise.all([
    publicId ? await cloudinary.uploader.destroy("recipes/" + publicId) : Promise.resolve(),
    await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "/recipes" }, async (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          }
          resolve(result!);
        })
        .end(buffer);
    }),
  ]);

  return result;
}
