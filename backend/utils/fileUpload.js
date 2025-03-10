const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinaryConfig");

// Configure Multer Storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "job_applications", // Folder in Cloudinary
    allowed_formats: ["pdf", "docx"], // Allowed file types
  },
});

const upload = multer({ storage });

module.exports = { upload };
