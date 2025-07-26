import React, { useState } from "react";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("http://localhost:8000/detect-audio", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setResult(data);
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Voice Clone Detection</h1>

      <input
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
        className="mb-4"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Upload and Detect
      </button>

      {result && (
        <div className="mt-6 bg-white p-4 rounded shadow-md">
          <p><strong>Is Fake:</strong> {result.is_fake ? "Yes" : "No"}</p>
          <p><strong>Confidence:</strong> {result.confidence}</p>
          <p><strong>Fingerprint:</strong> {result.fingerprint}</p>
        </div>
      )}
    </div>
  );
}

export default App;
