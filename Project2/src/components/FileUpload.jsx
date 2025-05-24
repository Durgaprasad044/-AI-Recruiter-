import React, { useState } from 'react';
import { Upload, File, CheckCircle } from 'lucide-react';

const FileUpload = ({ onFileUpload, acceptedFileTypes }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    handleFiles(files);
  };

  const handleFiles = (files) => {
    if (files.length > 0) {
      // Just use the file name in this demo
      for (let i = 0; i < files.length; i++) {
        onFileUpload(files[i].name);
      }
      // Show success animation
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 2000);
    }
  };

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-200 
        ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
    >
      <input
        type="file"
        id="file-upload"
        className="hidden"
        multiple
        accept={acceptedFileTypes}
        onChange={handleFileInputChange}
      />
      
      <label htmlFor="file-upload" className="cursor-pointer">
        <div className="mx-auto w-12 h-12 mb-4 flex items-center justify-center rounded-full bg-blue-100">
          {uploadSuccess ? (
            <CheckCircle className="h-6 w-6 text-green-600" />
          ) : (
            <Upload className="h-6 w-6 text-blue-600" />
          )}
        </div>
        
        <p className="text-sm font-medium text-gray-700 mb-1">
          {uploadSuccess ? 'File uploaded successfully!' : 'Drag & drop files here or click to browse'}
        </p>
        <p className="text-xs text-gray-500">
          {acceptedFileTypes} files supported
        </p>
      </label>
    </div>
  );
};

export default FileUpload;