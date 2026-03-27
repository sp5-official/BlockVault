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
const { PinataSDK } = require("pinata");

const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJlOTE4ZjgxMy04MTAwLTQzZjAtOTAzMC0xODFkZmI5ZjA5Y2MiLCJlbWFpbCI6InN1cmFqcGF3YXIwMDYxQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIxN2Q5NDIxODM5NmIzMWU2ODFmZiIsInNjb3BlZEtleVNlY3JldCI6IjViMmY3Mjg5OTBkY2NmZTkwN2I1MzczN2JiMWEwMjRiOWMzM2FmYmM4MzBjMjU2YWYyMGRmMjk1MTU0MzVmYzciLCJleHAiOjE4MDUzOTkyOTN9.pFCv_a21bN4KWlF_VZGIGguYgdPDDsMHTswB0Psfjz0";

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
          Authorization: `Bearer ${JWT}`,
          ...data.getHeaders(),
        },
      }
    );

    // delete local file after upload
    fs.unlinkSync(req.file.path);

    res.json({
      message: "File uploaded to IPFS 🚀",
      hash: response.data.data.cid,  // 👈 IMPORTANT
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
// (Optional) Download Local File
// =====================
app.get("/download/:filename", (req, res) => {
    const filePath = path.join(__dirname, "uploads", req.params.filename);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: "File not found" });
    }

    res.download(filePath);
});

// =====================
// Start Server
// =====================
app.listen(5000, () => {
    console.log("🚀 Server running on http://localhost:5000");
});