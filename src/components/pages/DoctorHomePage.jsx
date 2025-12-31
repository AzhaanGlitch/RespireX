import React, { useState } from 'react';
import { Activity, Users, CheckCircle, AlertCircle, User, LogOut, MapPin, Filter } from 'lucide-react';

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

  const filteredPatients = selectedState === 'all' || selectedState === 'All States'
    ? patients 
    : patients.filter(p => p.state === selectedState);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-600 to-cyan-700 rounded-xl flex items-center justify-center shadow-lg">
                <Activity className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                RespireX
              </span>
              <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm font-semibold">Doctor</span>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 px-6 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="pt-32 pb-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12 animate-fade-in">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Patient Dashboard</h1>
            <p className="text-xl text-gray-600">Monitor and manage patient records</p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {[
              { icon: Users, label: "Total Patients", value: "248", gradient: "from-blue-500 to-blue-600" },
              { icon: CheckCircle, label: "Negative Cases", value: "198", gradient: "from-green-500 to-green-600" },
              { icon: AlertCircle, label: "Positive Cases", value: "35", gradient: "from-orange-500 to-orange-600" },
              { icon: Activity, label: "Under Review", value: "15", gradient: "from-purple-500 to-purple-600" }
            ].map((stat, idx) => (
              <div key={idx} className={`bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover-lift animate-fade-in stagger-${idx + 1}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                    <stat.icon className="w-6 h-6 text-white" strokeWidth={2} />
                  </div>
                  <span className="text-4xl font-bold text-gray-900">{stat.value}</span>
                </div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Filter Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8 animate-fade-in stagger-5">
            <div className="flex items-center space-x-4">
              <Filter className="w-5 h-5 text-gray-400" />
              <MapPin className="w-5 h-5 text-gray-400" />
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition text-gray-900 font-medium"
              >
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Patient List */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-fade-in stagger-5">
            <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
              <h2 className="text-2xl font-bold text-gray-900">Patient Records</h2>
              <p className="text-gray-600 mt-1">Total {filteredPatients.length} patients</p>
            </div>
            <div className="divide-y divide-gray-100">
              {filteredPatients.map((patient, idx) => (
                <div key={patient.id} className={`p-8 hover:bg-gray-50 transition-all animate-fade-in stagger-${idx + 1}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-2xl flex items-center justify-center">
                        <User className="w-7 h-7 text-cyan-600" strokeWidth={2} />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg mb-1">{patient.name}</h3>
                        <p className="text-gray-600 flex items-center space-x-2">
                          <span>Age {patient.age}</span>
                          <span className="text-gray-400">•</span>
                          <MapPin className="w-4 h-4" />
                          <span>{patient.city}, {patient.state}</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-8">
                      <div className="text-right">
                        <p className="text-sm text-gray-500 mb-1">Last Test</p>
                        <p className="font-semibold text-gray-900">{patient.lastTest}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500 mb-1">Result</p>
                        <p className={`font-bold ${patient.result === 'Positive' ? 'text-orange-600' : 'text-green-600'}`}>
                          {patient.result}
                        </p>
                      </div>
                      <div>
                        <span className={`px-6 py-2 rounded-xl text-sm font-semibold ${
                          patient.riskLevel === 'High' ? 'bg-red-100 text-red-700' :
                          patient.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {patient.riskLevel} Risk
                        </span>
                      </div>
                      <button className="px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition font-semibold shadow-lg hover:shadow-xl btn-primary">
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
    </div>
  );
};

export default DoctorHomePage;