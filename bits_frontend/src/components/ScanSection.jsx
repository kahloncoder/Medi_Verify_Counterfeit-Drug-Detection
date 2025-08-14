// src/components/ScanSection.jsx
import React, { useState } from "react";
import { Upload, Camera, X } from "lucide-react";
import { scanQRCode } from "../services/api";
import { getMedicine } from "../services/ic-backend";

const ScanSection = ({ onVerificationComplete, setIsLoading, showAlert }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    } else {
      showAlert("Please select an image file", "error");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files?.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const scanImage = async () => {
    if (!selectedFile) {
      showAlert("Please select an image first", "error");
      return;
    }
    setIsLoading(true);
    try {
      const qr = await scanQRCode(selectedFile);
      if (!qr.success) throw new Error(qr.message || "Failed to detect QR code");

      const medicineId = qr.id;

      const med = await getMedicine(medicineId);
      console.log("[ScanSection] med:", med);

      if (!med.found) {
        // Create counterfeit entry for logging
        const counterfeitResult = {
          found: false,
          id: medicineId,
          name: "Unknown Medicine",
          manufacturer: "Unknown",
          batchNumber: "Unknown",
          manufacturingDate: "Unknown",
          expiryDate: "Unknown",
          blockchainHash: "N/A",
          lastUpdated: new Date().toISOString(),
          status: "Counterfeit"
        };
        
        onVerificationComplete(counterfeitResult);
        showAlert(`Medicine with ID ${medicineId} not found in database - Marked as Counterfeit`, "error");
        return;
      }

      // Pass through exactly what the service returns + status
      onVerificationComplete({
        ...med,
        status: "Verified",
      });

      showAlert("Medicine verified successfully", "success");
    } catch (err) {
      console.error("Scan error:", err);
      showAlert(`Verification failed: ${err.message}`, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="section active">
      <div className="card">
        <h2>Scan Medicine RFID/QR Code</h2>
        <div className="scan-area">
          <div
            className={`upload-zone ${isDragOver ? "dragover" : ""}`}
            onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
            onDragLeave={() => setIsDragOver(false)}
            onClick={() => document.getElementById("imageInput").click()}
          >
            <div className="upload-content">
              <div className="upload-icon"><Camera size={48} /></div>
              <p>Click to upload or drag & drop medicine image</p>
              <p className="upload-hint">Supports JPG, PNG, JPEG formats</p>
            </div>
            <input
              type="file"
              id="imageInput"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => handleFileSelect(e.target.files[0])}
            />
          </div>

          <div className="scan-controls">
            <button className="btn primary" onClick={scanImage}>
              <Upload size={18} /> Scan & Verify
            </button>
            <button className="btn secondary" onClick={() => {
              setSelectedFile(null);
              setImagePreview(null);
              showAlert("Scan cleared", "success");
            }}>
              <X size={18} /> Clear
            </button>
          </div>
        </div>

        {imagePreview && (
          <div className="preview-area">
            <h3>Image Preview</h3>
            <img src={imagePreview} alt="Medicine preview" className="image-preview" />
          </div>
        )}
      </div>
    </section>
  );
};

export default ScanSection;
