import React, { useState, useEffect } from 'react';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';

const DoctorHomePage = ({ onNavigate }) => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  // DUMMY DATA - NO BACKEND CALL, NO LOGIN REQUIRED
  useEffect(() => {
    const dummyTests = [
      {
        id: 1,
        test_name: "Test 1",
        patient_name: "Rahul Sharma",
        patient_email: "rahul.sharma@email.com",
        label: "Pneumonia",
        confidence: 0.87,
        date: "2026-01-28",
        status: "Pending Review",
      },
      {
        id: 2,
        test_name: "Test 2",
        patient_name: "Priya Mehta",
        patient_email: "priya.mehta@email.com",
        label: "Normal",
        confidence: 0.94,
        date: "2026-01-30",
        status: "Pending Review",
      },
    ];

    // Simulate loading
    setTimeout(() => {
      setTests(dummyTests);
      setLoading(false);
    }, 500);
  }, []);

  const getConfidenceColor = (conf) => {
    if (conf >= 0.9) return 'text-green-500';
    if (conf >= 0.7) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getLabelBg = (label) => {
    if (label === 'Normal') return 'bg-green-100 text-green-800';
    if (label === 'Pneumonia') return 'bg-red-100 text-red-800';
    if (label === 'COVID-19') return 'bg-orange-100 text-orange-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar onNavigate={onNavigate} isLoggedIn={false} />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-10">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Doctor Dashboard</h1>
            <p className="text-gray-500 mt-1">Review patient test results</p>
          </div>
          <span className="bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded-full">
            Direct Access – Prototype
          </span>
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* TEST CARDS */}
        {!loading && (
          <div className="space-y-6">
            {tests.map((test) => (
              <div
                key={test.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
              >
                {/* Top row */}
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">{test.test_name}</h2>
                    <p className="text-sm text-gray-400 mt-0.5">Date: {test.date}</p>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getLabelBg(test.label)}`}>
                    {test.label}
                  </span>
                </div>

                {/* Patient info */}
                <div className="mt-4 flex flex-wrap gap-6 text-sm text-gray-600">
                  <div>
                    <span className="text-gray-400 text-xs uppercase tracking-wide">Patient</span>
                    <p className="font-medium text-gray-800">{test.patient_name}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-xs uppercase tracking-wide">Email</span>
                    <p className="font-medium text-gray-800">{test.patient_email}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-xs uppercase tracking-wide">Confidence</span>
                    <p className={`font-bold ${getConfidenceColor(test.confidence)}`}>
                      {(test.confidence * 100).toFixed(1)}%
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-xs uppercase tracking-wide">Status</span>
                    <p className="font-medium text-yellow-600">{test.status}</p>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="mt-5 flex gap-3">
                  <button
                    onClick={() => onNavigate && onNavigate('test-result')}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors"
                  >
                    View Full Result
                  </button>
                  <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-semibold px-5 py-2 rounded-lg transition-colors">
                    Contact Patient
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default DoctorHomePage;