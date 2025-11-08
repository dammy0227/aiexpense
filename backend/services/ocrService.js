// services/ocrService.js
import Tesseract from "tesseract.js";
import fs from "fs";

/**
 * Extract text from an image or PDF receipt
 * @param {string} filePath
 * @returns {string} extracted text
 */
export const extractTextFromReceipt = async (filePath) => {
  try {
    const { data } = await Tesseract.recognize(filePath, "eng", {
      logger: (m) => console.log(m),
    });

    // Optional: delete file after processing
    fs.unlink(filePath, (err) => {
      if (err) console.error("Failed to delete file:", err);
    });

    return data.text;
  } catch (error) {
    console.error("OCR error:", error);
    throw new Error("Failed to extract text from receipt");
  }
};
