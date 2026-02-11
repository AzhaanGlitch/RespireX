import React, { useState } from 'react';
import { Upload, Image, Check } from 'lucide-react';
import Navbar from '../common/Navbar';

const XRayUploadPage = ({ onNavigate }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      setFile(droppedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(droppedFile);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <Navbar 
        showCancelButton={true}
        onCancel={() => onNavigate('patient-home')}
      />

      <div className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center animate-fade-in">
            <div className="inline-block px-4 py-2 bg-blue-50 rounded-full mb-6">
              <span className="text-sm font-semibold text-blue-600">Step 2 of 2</span>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Upload Chest X-Ray</h1>
            <p className="text-xl text-gray-600">Upload a clear image of your chest X-ray for AI analysis</p>
          </div>

          {/* Upload Section */}
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-12 animate-scale">
            {!preview ? (
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`border-3 border-dashed rounded-3xl p-16 text-center transition-all ${
                  isDragging 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                }`}
              >
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-3xl flex items-center justify-center mx-auto mb-8">
                  <Upload className="w-12 h-12 text-blue-600" strokeWidth={2} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {isDragging ? 'Drop your file here' : 'Upload X-Ray Image'}
                </h3>
                <p className="text-gray-600 mb-8 text-lg">
                  Drag and drop or click to browse
                </p>
                <label className="inline-block">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <span className="px-10 py-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 cursor-pointer inline-block font-semibold text-lg shadow-lg hover:shadow-xl btn-primary">
                    Choose File
                  </span>
                </label>
                <p className="text-sm text-gray-500 mt-6">PNG, JPG or JPEG up to 10MB</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Preview */}
                <div className="relative rounded-2xl overflow-hidden border-2 border-gray-200 shadow-lg">
                  <img 
                    src={preview} 
                    alt="X-Ray Preview" 
                    className="w-full h-auto"
                  />
                  <div className="absolute top-4 right-4">
                    <div className="bg-green-500 text-white px-4 py-2 rounded-full flex items-center space-x-2 shadow-lg">
                      <Check className="w-5 h-5" strokeWidth={3} />
                      <span className="font-semibold">Uploaded</span>
                    </div>
                  </div>
                </div>

                {/* File Info */}
                <div className="bg-gray-50 rounded-2xl p-6 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Image className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{file?.name}</p>
                      <p className="text-sm text-gray-600">{(file?.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setFile(null);
                      setPreview(null);
                    }}
                    className="text-red-600 hover:text-red-700 font-semibold"
                  >
                    Remove
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-4">
                  <label className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <span className="block w-full py-4 bg-gray-100 text-gray-900 rounded-xl hover:bg-gray-200 cursor-pointer text-center font-semibold text-lg transition">
                      Change Image
                    </span>
                  </label>
                  <button
                    onClick={() => onNavigate('test-result')}
                    className="flex-1 py-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 font-semibold text-lg shadow-lg hover:shadow-xl btn-primary"
                  >
                    Analyze X-Ray →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Guidelines */}
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl p-8 animate-fade-in stagger-1">
            <h4 className="font-bold text-gray-900 text-xl mb-4 flex items-center space-x-2">
              <Image className="w-6 h-6 text-blue-600" />
              <span>Image Guidelines</span>
            </h4>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start space-x-3">
                <Check className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                <span>Ensure the X-ray image is clear and well-lit</span>
              </li>
              <li className="flex items-start space-x-3">
                <Check className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                <span>The entire chest area should be visible in the image</span>
              </li>
              <li className="flex items-start space-x-3">
                <Check className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                <span>Avoid images with excessive blur or artifacts</span>
              </li>
              <li className="flex items-start space-x-3">
                <Check className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                <span>This is a preliminary screening tool, not a diagnostic tool</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default XRayUploadPage;