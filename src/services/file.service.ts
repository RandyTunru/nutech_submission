import { s3Uploader } from '../utils/s3Uploader';
import { mockUploader } from '../utils/mockUploader';


const isProduction = process.env.NODE_ENV === 'production';
const isS3Configured = 
  process.env.S3_BUCKET_NAME &&
  process.env.AWS_REGION &&
  process.env.AWS_ACCESS_KEY_ID &&
  process.env.AWS_SECRET_ACCESS_KEY;

const fileUploadService = (isProduction && isS3Configured)
  ? s3Uploader
  : mockUploader;

export default fileUploadService;