require("dotenv").config();

const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");

const app = express();
app.use(cors());
app.use(express.json());

// =====================
// Multer Storage Setup
// =====================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// =====================
// Upload to IPFS (Pinata)
// =====================

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const data = new FormData();

    data.append("file", fs.createReadStream(req.file.path));
    data.append("network", "public");

    const response = await axios.post(
      "https://uploads.pinata.cloud/v3/files",
      data,
      {
        maxBodyLength: Infinity,
        headers: {
          Authorization: `Bearer ${process.env.PINATA_JWT}`, // ✅ FIXED
          ...data.getHeaders(),
        },
        
      }
    );

    // delete local file
    fs.unlinkSync(req.file.path);

    res.json({
      message: "File uploaded to IPFS 🚀",
      hash: response.data.data.cid,
    });

  } catch (error) {
    console.error("Upload Error:", error.response?.data || error.message);

    res.status(500).json({
      error: "IPFS upload failed",
      details: error.response?.data || error.message,
    });
  }
});

// =====================
// Test Route (IMPORTANT)
// =====================
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// =====================
// Start Server
// =====================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});