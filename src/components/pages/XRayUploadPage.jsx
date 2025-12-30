import React, { useState } from 'react';
import { Activity, Upload } from 'lucide-react';

export default XRayUploadPage;

const XRayUploadPage = ({ onNavigate }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Activity className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">TB DetectCare</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Upload Chest X-Ray</h1>
          <p className="text-gray-600 mt-2">Please upload a clear image of your chest X-ray for analysis</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          {!preview ? (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
              <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Upload X-Ray Image</h3>
              <p className="text-gray-600 mb-6">PNG, JPG or JPEG up to 10MB</p>
              <label className="inline-block">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <span className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer inline-block">
                  Choose File
                </span>
              </label>
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <img src={preview} alt="X-Ray Preview" className="w-full rounded-lg border border-gray-200" />
              </div>
              <div className="flex space-x-4">
                <label className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <span className="block w-full py-3 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 cursor-pointer text-center font-medium">
                    Change Image
                  </span>
                </label>
                <button
                  onClick={() => onNavigate('test-result')}
                  className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  Analyze X-Ray
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 mb-2">Important Guidelines</h4>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>• Ensure the X-ray image is clear and well-lit</li>
            <li>• The entire chest area should be visible in the image</li>
            <li>• Avoid uploading images with excessive blur or artifacts</li>
            <li>• This is a preliminary screening tool, not a diagnostic tool</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
