import React from 'react';

interface FileUploadProps {
  onDetect: (audioData: File | Blob) => Promise<void>;
  isLoading: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onDetect, isLoading }) => (
  <div className="p-4 border rounded bg-white shadow">
    <h2 className="text-xl font-bold mb-2">File Upload</h2>
    {/* File upload UI goes here */}
    <input type="file" disabled={isLoading} onChange={e => {
      if (e.target.files && e.target.files[0]) {
        onDetect(e.target.files[0]);
      }
    }} />
    {isLoading && <p className="text-blue-500 mt-2">Detecting...</p>}
  </div>
);
