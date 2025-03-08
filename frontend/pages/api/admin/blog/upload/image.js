import { IncomingForm } from 'formidable';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

// Disable Next.js body parsing as we'll use formidable
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  console.log('Image upload API route called');
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed', success: false });
  }

  try {
    // Create upload directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), 'public', 'images', 'blog');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Create a new Promise to handle the file upload
    const form = new IncomingForm({
      uploadDir,
      keepExtensions: true,
      maxFileSize: 5 * 1024 * 1024, // 5MB
    });

    return new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          console.error('Error parsing form:', err);
          res.status(500).json({ error: 'File upload failed', success: false });
          return resolve();
        }

        try {
          // Get the uploaded file
          const file = files.image && files.image[0] ? files.image[0] : files.image;
          
          if (!file) {
            res.status(400).json({ error: 'No image file provided', success: false });
            return resolve();
          }

          console.log('File received:', file);
          
          // Determine file path based on formidable version
          const filePath = file.filepath || file.path;
          const originalName = file.originalFilename || file.name || 'image.jpg';
          const mimeType = file.mimetype || file.type;

          // Check if it's an image
          if (!mimeType || !mimeType.startsWith('image/')) {
            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
            }
            res.status(400).json({ error: 'File must be an image', success: false });
            return resolve();
          }

          // Create a unique filename with original extension
          const fileExt = path.extname(originalName) || '.jpg';
          const newFilename = `${uuidv4()}${fileExt}`;
          const newFilePath = path.join(uploadDir, newFilename);

          // Move the uploaded file to our destination
          fs.copyFileSync(filePath, newFilePath);
          
          // Delete the temporary file if needed
          if (fs.existsSync(filePath) && filePath !== newFilePath) {
            fs.unlinkSync(filePath);
          }

          // Return the URL of the saved image
          const imageUrl = `/images/blog/${newFilename}`;
          console.log('Image saved successfully at:', newFilePath);
          console.log('Image URL:', imageUrl);
          
          res.status(200).json({ url: imageUrl, success: true });
          return resolve();
        } catch (error) {
          console.error('Error processing uploaded file:', error);
          res.status(500).json({ error: `Error processing file: ${error.message}`, success: false });
          return resolve();
        }
      });
    });
  } catch (error) {
    console.error('Error handling image upload:', error);
    return res.status(500).json({ error: `Failed to upload image: ${error.message}`, success: false });
  }
}