import { S3Client, ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  region: process.env.AWS_REGION || "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { pin } = req.body;
  
  if (pin !== process.env.SECURE_PIN) {
    return res.status(401).json({ success: false, message: 'Invalid PIN' });
  }

  const bucketName = process.env.AWS_BUCKET_NAME || "clgjogi";

  try {
    const command = new ListObjectsV2Command({
      Bucket: bucketName,
    });
    
    const response = await s3.send(command);
    
    if (!response.Contents) {
      return res.status(200).json({ success: true, notes: [] });
    }

    const notes = await Promise.all(response.Contents.map(async (item) => {
      const getObjectParams = {
        Bucket: bucketName,
        Key: item.Key,
      };
      const getCommand = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(s3, getCommand, { expiresIn: 3600 });

      return {
        key: item.Key,
        url: url,
        size: item.Size,
        lastModified: item.LastModified
      };
    }));

    res.status(200).json({ success: true, notes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
}
