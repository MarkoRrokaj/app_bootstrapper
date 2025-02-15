"use client";

import React, { useState, useCallback } from "react";
import { X, Upload, File } from "lucide-react";

const DocumentUploader = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_TYPES = {
    "application/pdf": ".pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      ".docx",
    "text/plain": ".txt",
    "image/jpeg": ".jpg",
    "image/png": ".png",
  };

  const validateFile = (file) => {
    if (file.size > MAX_FILE_SIZE) {
      throw new Error(`File ${file.name} is too large. Maximum size is 5MB`);
    }
    if (!Object.keys(ALLOWED_TYPES).includes(file.type)) {
      throw new Error(`File type ${file.type} is not supported`);
    }
  };

  const handleFileChange = useCallback(async (e) => {
    try {
      setLoading(true);
      setError("");
      const selectedFiles = Array.from(e.target.files);

      // Validate all files
      selectedFiles.forEach(validateFile);

      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const removeFile = useCallback((index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  }, []);

  const getFileIcon = (fileType) => {
    if (fileType.startsWith("image")) {
      return null; // We'll show the image preview instead
    }
    return <File className="w-12 h-12" />;
  };

  return (
    <div className="max-w-4xl mx-auto my-10 p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Document Uploader</h2>

      {/* Upload area */}
      <div className="mb-6">
        <div className="border-2 border-dashed border-base-300 rounded-lg p-8 text-center">
          <Upload className="mx-auto h-12 w-12" />
          <label className="mt-4 block">
            <span className="mt-2 block text-sm">
              Drop files here or click to upload
            </span>
            <input
              type="file"
              accept={Object.values(ALLOWED_TYPES).join(",")}
              multiple
              onChange={handleFileChange}
              className="file-input file-input-bordered w-full max-w-xs mt-2"
              disabled={loading}
            />
          </label>
          <p className="mt-1 text-xs opacity-70">
            Supported formats: PDF, DOCX, TXT, JPG, PNG (max 5MB)
          </p>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="alert alert-error mb-6">
          <span>{error}</span>
        </div>
      )}

      {/* File preview grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {files.map((file, index) => (
          <div key={index} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex justify-between items-start">
                <div className="truncate pr-8">
                  <h3 className="card-title text-sm truncate">{file.name}</h3>
                  <p className="text-sm opacity-70">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="btn btn-square btn-sm btn-ghost"
                  aria-label="Remove file"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-2 flex justify-center">
                {file.type.startsWith("image") ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="max-h-32 w-auto object-contain rounded"
                    onLoad={(e) => {
                      URL.revokeObjectURL(e.target.src);
                    }}
                  />
                ) : (
                  getFileIcon(file.type)
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentUploader;
