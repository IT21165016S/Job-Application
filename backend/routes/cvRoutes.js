const express = require("express");
const { upload } = require("../utils/fileUpload");
const CV = require("../models/cvModel");

const router = express.Router();

router.post("/upload", upload.single("cv"), async (req, res) => {
  try {
    console.log("📂 File Uploaded:", req.file);
    console.log("📩 Received Form Data:", req.body);

    if (!req.file) {
      console.error("❌ No file uploaded!");
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Ensure Cloudinary serves the PDF correctly
    const fileUrl = req.file.path;  // ✅ Direct Cloudinary URL

    console.log("✅ CV uploaded to Cloudinary:", fileUrl);

    // Save to MongoDB
    const cvEntry = new CV({
      name: req.body.name.trim(),
      email: req.body.email.trim(),
      phone: req.body.phone.trim(),
      cvPublicLink: fileUrl, // ✅ Correctly save Cloudinary URL
    });

    await cvEntry.save();
    console.log("✅ CV metadata saved in MongoDB");

    res.json({
      message: "CV uploaded successfully!",
      fileUrl: fileUrl,
      cvData: cvEntry,
    });
  } catch (error) {
    console.error("❌ Upload failed:", error);
    res.status(500).json({ error: "An unexpected error occurred." });
  }
});


// ✅ Fetch all uploaded CVs
router.get("/all", async (req, res) => {
  try {
    const cvs = await CV.find();
    console.log("📊 Fetched CVs:", cvs);
    res.json(cvs);
  } catch (error) {
    console.error("❌ Error fetching CVs:", error);
    res.status(500).json({ error: "Failed to fetch CV data" });
  }
});

module.exports = router;
