import React, { useState } from "react";

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://127.0.0.1:8000/detect-audio", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {loading ? "Analyzing..." : "Detect"}
        </button>
      </form>

      {result && (
        <div className="mt-4 p-4 border rounded bg-gray-50">
          <p><strong>Is Fake:</strong> {result.is_fake ? "Yes" : "No"}</p>
          <p><strong>Confidence:</strong> {result.confidence.toFixed(2)}</p>
          <p><strong>Fingerprint:</strong> {result.fingerprint}</p>
        </div>
      )}
    </div>
  );
}
