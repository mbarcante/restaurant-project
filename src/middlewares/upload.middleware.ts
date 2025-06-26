// src/middlewares/upload.middleware.ts
import multer from 'multer';
import { bucket } from 'src/config/firebase-admin';
import { Request } from 'express';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback 
  ) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      
      cb(new Error('Only image files are allowed!'));
    }
  }
});
const uploadImageToFirebase = async (file: Express.Multer.File): Promise<string> => {
  if (!file) {
    throw new Error('No file provided for upload.');
  }

  const filename = `dishes/${Date.now()}-${file.originalname.replace(/ /g, '_')}`;
  const fileUpload = bucket.file(filename);

  const blobStream = fileUpload.createWriteStream({
    metadata: {
      contentType: file.mimetype
    },
    public: true
  });

  return new Promise((resolve, reject) => {
    blobStream.on('error', (err) => {
      console.error('Firebase upload stream error:', err);
      reject(new Error('Failed to upload image to Firebase. Please try again.'));
    });

    blobStream.on('finish', async () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;
      console.log(`Image uploaded successfully to: ${publicUrl}`);
      resolve(publicUrl);
    });
    blobStream.end(file.buffer);
  });
};

export { upload, uploadImageToFirebase };