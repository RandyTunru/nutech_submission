import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { randomBytes } from 'crypto';

const s3Client = new S3Client({ 
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});
const S3_BUCKET = process.env.S3_BUCKET_NAME!;

export const s3Uploader = {
  upload: async (file: Express.Multer.File): Promise<string> => {
    const uniqueFileName = randomBytes(16).toString('hex') + '-' + file.originalname;

    const command = new PutObjectCommand({
      Bucket: S3_BUCKET,
      Key: uniqueFileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await s3Client.send(command);
    
    return `https://${S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueFileName}`;
  },
};