import type { NextApiRequest, NextApiResponse } from "next";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { fileName, fileType, fileContentBase64 } = req.body;

    if (!fileName || !fileType || !fileContentBase64) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const buffer = Buffer.from(fileContentBase64, "base64");

    const uploadParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME || "",
      Key: fileName,
      Body: buffer,
      ContentType: fileType,
    };

    const command = new PutObjectCommand(uploadParams);
    await s3.send(command);

    const imageUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

    return res.status(200).json({ imageUrl });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ message: "Upload failed" });
  }
}
