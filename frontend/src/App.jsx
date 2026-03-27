import React, { useState, useEffect } from "react";
import axios from "axios";
import { ethers } from "ethers";

function App() {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [activeTab, setActiveTab] = useState("upload");

  // Upload file
  const uploadFile = async () => {
    if (!file) return alert("Select a file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:5000/upload", formData);

      const cid = res.data.hash;
      const fileName = file.name;

      await saveToBlockchain(cid, file.name);

      alert("Uploaded + stored on Blockchain");

    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  // Save CID to blockchain
  const saveToBlockchain = async (cid, name) => {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(
        "0x5FbDB2315678afecb367f032d93F642f64180aa3", // 🔴 must be latest
        [
          "function uploadFile(string memory _cid, string memory _name) public"
        ],
        signer
      );

      console.log("Sending to blockchain:", cid, name);

      const tx = await contract.uploadFile(cid, name);
      await tx.wait();

      console.log("Saved to blockchain ✅");

    } catch (error) {
      console.error("BLOCKCHAIN ERROR:", error);
    }
  };

  // File Fetch Function
  const loadFilesFromBlockchain = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);

      const contract = new ethers.Contract(
        "0x5FbDB2315678afecb367f032d93F642f64180aa3",
        [
          "function getTotalFiles() view returns (uint)",
          "function getFile(uint) view returns (string,string,address,uint)"
        ],
        provider
      );

      const total = await contract.getTotalFiles();
      console.log("Total:", total);

      let temp = [];

      for (let i = 0; i < total; i++) {
        const file = await contract.getFile(i);

        temp.push({
          cid: file[0],
          name: file[1],
        });
      }

      setFiles(temp);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        await loadFilesFromBlockchain();
      }
    };

    init();
  }, []);


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 p-6 flex flex-col items-center">

      {/* Header */}
      <h1 className="text-3xl font-bold text-white mb-6">
        BlockVault 🔐
      </h1>

      {/* Tabs */}
      <div className="flex bg-white/20 backdrop-blur-md p-2 rounded-xl mb-6">
        <button
          onClick={() => setActiveTab("upload")}
          className={`px-6 py-2 rounded-lg font-medium ${activeTab === "upload"
            ? "bg-white text-indigo-600"
            : "text-white"
            }`}
        >
          Upload 📤
        </button>

        <button
          onClick={() => setActiveTab("files")}
          className={`px-6 py-2 rounded-lg font-medium ${activeTab === "files"
            ? "bg-white text-indigo-600"
            : "text-white"
            }`}
        >
          My Files 📂
        </button>
      </div>

      {/* Upload Section */}
      {activeTab === "upload" && (
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-[400px] text-center">

          <p className="text-gray-500 mb-6">
            Securely upload your files to blockchain storage
          </p>

          <div className="border-2 border-dashed border-gray-300 p-6 rounded-xl mb-4 hover:border-indigo-500 transition">
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full text-gray-600"
            />
          </div>

          <button
            onClick={uploadFile}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Upload File 🚀
          </button>
        </div>
      )}

      {/* Files Section */}
      {activeTab === "files" && (
        <div className="bg-white p-6 rounded-2xl shadow-2xl w-[500px]">

          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Your Files 📂
          </h2>

          {files.length === 0 ? (
            <p className="text-gray-500 text-sm">
              No files uploaded yet
            </p>
          ) : (
            files.map((file, index) => (
              <div key={index}>
                <span>{file.name}</span>

                <a
                  href={`https://gateway.pinata.cloud/ipfs/${file.cid}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  View
                </a>
              </div>
            ))
          )}
        </div>
      )}

    </div>
  );
}

export default App;