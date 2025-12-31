import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-xl font-bold text-gray-900">RespireX</span>
            </div>
            <p className="text-gray-600">Part of Atmanirbhar Bharat Mission</p>
            <p className="text-gray-500 text-sm mt-2">&copy; 2025 RespireX. All rights reserved.</p>
          </div>

          <div className="text-right">
            <div className="flex items-center justify-end space-x-3 mb-2">
              <span className="text-lg font-bold text-gray-900">Team BitBash</span>
              <div className="w-8 h-8 flex items-center justify-center">
                <img 
                  src="/team-bitbash-logo.jpg" 
                  alt="Team BitBash Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <p className="text-gray-600 text-sm">Innovating Healthcare Solutions</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;