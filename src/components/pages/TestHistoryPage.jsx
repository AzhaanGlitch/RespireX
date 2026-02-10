import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';

const TestHistoryPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-20 text-center">

        {/* ─── Icon ─── */}
        <div className="bg-blue-50 rounded-full p-6 mb-6">
          <svg
            className="w-16 h-16 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* ─── Text ─── */}
        <h1 className="text-3xl font-bold text-gray-800 mb-3">Coming Soon</h1>
        <p className="text-gray-500 max-w-md mx-auto text-base leading-relaxed">
          Test History will be available in the next release.
          You'll be able to view all your past X-ray and symptom tests here.
        </p>

        {/* ─── Back button ─── */}
        <button
          onClick={() => navigate('/patient')}
          className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors"
        >
          ← Back to Dashboard
        </button>
      </main>

      <Footer />
    </div>
  );
};

export default TestHistoryPage;