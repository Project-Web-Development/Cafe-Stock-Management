import React, { useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const FileUpload = ({ onFileChange }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    // Mengirim data gambar ke parent component
    onFileChange(file);
  };

  return (
    <div className="flex flex-col items-center">
      {selectedFile ? (
        <div className="border-b-[8px] border-indigo-500 shadow-lg w-56 object-cover rounded-3xl mb-2 h-[150px] overflow-hidden">
          <img
            src={URL.createObjectURL(selectedFile)}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="border-b-[8px] border-indigo-500 shadow-lg w-56 object-cover rounded-3xl mb-2 h-[150px] text-center">
          <p className="text-black text-lg">Upload Image</p>
        </div>
      )}
      <div className="bg-[#2C3639] rounded-xl items-center p-2 text-center">
        <label className="text-white cursor-pointer mb-2">
          <input type="file" onChange={handleFileChange} className="hidden" />
          <CloudUploadIcon style={{ fontSize: '32px', width: '32px', height: '32px' }} />
          <span className="ml-2" style={{ fontSize: '16px' }}>Unggah Foto</span>
        </label>
      </div>
      {selectedFile && <p className="text-black">{selectedFile.name}</p>}
    </div>
  );
};

export default FileUpload;
