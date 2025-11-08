import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadReceiptFile } from "../../features/transaction/transactionThunk";
import "./ReceiptUpload.css";

const ReceiptUpload = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.transaction);

  const [file, setFile] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setSuccessMsg("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    dispatch(uploadReceiptFile(formData))
      .unwrap()
      .then(() => {
        setSuccessMsg("Receipt uploaded and categorized successfully!");
        setFile(null); // reset file input
      })
      .catch(() => {
        setSuccessMsg("");
      });
  };

  return (
    <form onSubmit={handleSubmit} className="receipt-upload">
      <h3>Upload Receipt</h3>

      <input type="file" accept="image/*,.pdf" onChange={handleFileChange} />

      <button type="submit" disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>

      {successMsg && <p className="success">{successMsg}</p>}
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default ReceiptUpload;
