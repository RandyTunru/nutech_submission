export const mockUploader = {
  upload: async (file: Express.Multer.File): Promise<string> => {
    console.log(`[MockUploader] Faking upload for: ${file.originalname}`);
    return 'https://yoururlapi.com/profile-updated-fake.jpeg';
  },
};