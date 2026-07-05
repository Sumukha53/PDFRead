import React, { useState } from "react";

type Props = {
  onUpload?: (file: File) => Promise<void> | void;
};

export default function UploadBox({ onUpload }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      if (selectedFile.type !== "application/pdf") {
        alert("Only PDF files are allowed");
        return;
      }

      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a PDF first");
      return;
    }

    try {
      setLoading(true);

      if (onUpload) {
        await onUpload(file);
      }

      setFile(null);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="mb-3 text-xl font-semibold">Upload PDF</h2>
      <p className="mb-4 text-sm text-gray-500">
        Upload a document and start chatting with it instantly.
      </p>

      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-600"
      />

      {file && (
        <p className="mt-3 text-sm font-medium text-gray-700">
          Selected: <span className="font-semibold">{file.name}</span>
        </p>
      )}

      <button
        onClick={handleUpload}
        disabled={loading}
        className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        {loading ? "Uploading..." : "Upload PDF"}
      </button>
    </div>
  );
}