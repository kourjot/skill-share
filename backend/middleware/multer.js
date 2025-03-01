import multer from "multer";
import path from "path";
import "dotenv/config";
import { fileURLToPath } from "url";
import fs from "fs";

// Get current directory using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define uploads folder path
const uploadsDir = path.join(__dirname, "uploads");

// Ensure the uploads directory exists, create it if not
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);  // Use the uploads directory as destination
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Set filename to current timestamp + file extension
  },
});

// Multer profile image upload configuration
export const profileMulter = multer({ storage: storage });
