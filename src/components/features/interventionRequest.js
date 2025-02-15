"use client";

import { useState } from "react";

const InterventionRequest = () => {
  const [request, setRequest] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [submittedRequests, setSubmittedRequests] = useState([]); // Track submitted requests

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const previewFiles = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setUploadedFiles((prevFiles) => [...prevFiles, ...previewFiles]);
    e.target.value = ""; // Clear file input after selection
  };

  const handleSubmit = () => {
    if (!request.trim()) {
      alert("Please enter a description for the request.");
      return;
    }

    const newRequest = {
      description: request,
      files: uploadedFiles,
      timestamp: new Date().toLocaleString(),
    };

    setSubmittedRequests([newRequest, ...submittedRequests]); // Add new request at the top
    setRequest("");
    setUploadedFiles([]);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-base-200 shadow-xl rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">
        Intervention Request
      </h2>

      {/* Request description input */}
      <textarea
        className="textarea textarea-bordered w-full mb-4"
        placeholder="Describe the intervention request"
        value={request}
        onChange={(e) => setRequest(e.target.value)}
      />

      {/* File input for photos and videos */}
      <div className="mb-4">
        <label className="label">
          <span className="label-text">Attach photos/videos</span>
        </label>
        <input
          type="file"
          accept="image/*,video/*"
          multiple
          className="file-input file-input-bordered w-full"
          onChange={handleFileChange}
        />
      </div>

      {/* Display uploaded files with previews */}
      {uploadedFiles.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Attached Files:</h3>
          <div className="grid grid-cols-2 gap-4">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="relative">
                {file.file.type.startsWith("image") ? (
                  <img
                    src={file.preview}
                    alt={`preview-${index}`}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                ) : file.file.type.startsWith("video") ? (
                  <video controls className="w-24 h-24 object-cover rounded-md">
                    <source src={file.preview} type={file.file.type} />
                    Your browser does not support the video tag.
                  </video>
                ) : null}
                <p className="text-sm mt-1">{file.file.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Submit button */}
      <div className="mt-6 text-center">
        <button className="btn btn-primary" onClick={handleSubmit}>
          Submit Request
        </button>
      </div>

      {/* Display submitted requests */}
      {submittedRequests.length > 0 && (
        <div className="mt-10 p-4 bg-base-100 shadow-md rounded-lg">
          <h3 className="text-xl font-bold mb-4 text-center">
            Open Intervetions
          </h3>
          {submittedRequests.map((req, index) => (
            <div key={index} className="p-3 mb-3 border rounded-lg bg-base-200">
              <p className="text-sm text-gray-600">{req.timestamp}</p>
              <p className="text-lg font-semibold">{req.description}</p>

              {/* Display attached files */}
              {req.files.length > 0 && (
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {req.files.map((file, fileIndex) => (
                    <div key={fileIndex} className="relative">
                      {file.file.type.startsWith("image") ? (
                        <img
                          src={file.preview}
                          alt={`request-${index}-file-${fileIndex}`}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                      ) : file.file.type.startsWith("video") ? (
                        <video
                          controls
                          className="w-16 h-16 object-cover rounded-md"
                        >
                          <source src={file.preview} type={file.file.type} />
                        </video>
                      ) : null}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InterventionRequest;
