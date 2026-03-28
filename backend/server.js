require("dotenv").config();

const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");

const app = express();

// ✅ Strong CORS fix (important for mobile)
app.use(cors({
  origin: "*",
}));

app.use(express.json());

// =====================
// Ensure uploads folder exists
// =====================
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// =====================
// Multer Storage Setup
// =====================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// =====================
// Upload Route
// =====================
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    // ❗ Check file exists
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const data = new FormData();
    data.append("file", fs.createReadStream(req.file.path));
    data.append("network", "public");

    const response = await axios.post(
      "https://uploads.pinata.cloud/v3/files",
      data,
      {
        maxBodyLength: Infinity,
        headers: {
          Authorization: `Bearer ${process.env.PINATA_JWT}`,
          ...data.getHeaders(),
        },
      }
    );

    // ✅ delete file safely
    fs.unlink(req.file.path, (err) => {
      if (err) console.log("File delete error:", err);
    });

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
// Health Check Route
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