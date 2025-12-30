import React, { useState } from 'react';
import { Activity, Users, CheckCircle, AlertCircle, User, LogOut, MapPin } from 'lucide-react';

const DoctorHomePage = ({ onNavigate, onLogout }) => {
  const [selectedState, setSelectedState] = useState('all');
  
  const states = [
    'All States', 'Andhra Pradesh', 'Bihar', 'Gujarat', 'Karnataka', 
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Punjab', 'Rajasthan',
    'Tamil Nadu', 'Uttar Pradesh', 'West Bengal'
  ];

  const patients = [
    {
      id: 1,
      name: "Rahul Sharma",
      age: 34,
      state: "Maharashtra",
      city: "Mumbai",
      lastTest: "Dec 28, 2024",
      result: "Negative",
      riskLevel: "Low"
    },
    {
      id: 2,
      name: "Priya Patel",
      age: 28,
      state: "Gujarat",
      city: "Ahmedabad",
      lastTest: "Dec 27, 2024",
      result: "Positive",
      riskLevel: "High"
    },
    {
      id: 3,
      name: "Amit Kumar",
      age: 42,
      state: "Karnataka",
      city: "Bangalore",
      lastTest: "Dec 26, 2024",
      result: "Negative",
      riskLevel: "Low"
    },
    {
      id: 4,
      name: "Sneha Reddy",
      age: 31,
      state: "Andhra Pradesh",
      city: "Hyderabad",
      lastTest: "Dec 25, 2024",
      result: "Negative",
      riskLevel: "Medium"
    }
  ];

  const filteredPatients = selectedState === 'all' 
    ? patients 
    : patients.filter(p => p.state === selectedState);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Activity className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">TB DetectCare - Doctor Portal</span>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Patient Dashboard</h1>
          <p className="text-gray-600 mt-2">Monitor and manage patient records</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">248</span>
            </div>
            <p className="text-sm text-gray-600">Total Patients</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-900">198</span>
            </div>
            <p className="text-sm text-gray-600">Negative Cases</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <AlertCircle className="w-8 h-8 text-orange-600" />
              <span className="text-2xl font-bold text-gray-900">35</span>
            </div>
            <p className="text-sm text-gray-600">Positive Cases</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <Activity className="w-8 h-8 text-purple-600" />
              <span className="text-2xl font-bold text-gray-900">15</span>
            </div>
            <p className="text-sm text-gray-600">Under Review</p>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center space-x-4">
            <MapPin className="w-5 h-5 text-gray-400" />
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All States</option>
              {states.slice(1).map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Patient List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Patient Records</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredPatients.map((patient) => (
              <div key={patient.id} className="p-6 hover:bg-gray-50 transition">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{patient.name}</h3>
                      <p className="text-sm text-gray-600">
                        Age {patient.age} • {patient.city}, {patient.state}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Last Test</p>
                      <p className="font-medium text-gray-900">{patient.lastTest}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Result</p>
                      <p className={`font-medium ${patient.result === 'Positive' ? 'text-orange-600' : 'text-green-600'}`}>
                        {patient.result}
                      </p>
                    </div>
                    <div>
                      <span className={`px-4 py-1 rounded-full text-sm font-medium ${
                        patient.riskLevel === 'High' ? 'bg-red-100 text-red-800' :
                        patient.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {patient.riskLevel} Risk
                      </span>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorHomePage;