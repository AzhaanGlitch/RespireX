import React, { useState } from 'react';
import { Check } from 'lucide-react';
import Navbar from '../common/Navbar';

const SymptomTestPage = ({ onNavigate }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  const questions = [
    {
      id: 1,
      question: "Do you have a persistent cough lasting more than 3 weeks?",
      options: ["Yes", "No"]
    },
    {
      id: 2,
      question: "Have you experienced fever, especially in the evenings?",
      options: ["Yes", "No"]
    },
    {
      id: 3,
      question: "Have you noticed unexplained weight loss recently?",
      options: ["Yes", "No"]
    },
    {
      id: 4,
      question: "Do you experience night sweats?",
      options: ["Yes", "No"]
    },
    {
      id: 5,
      question: "Have you coughed up blood or blood-tinged sputum?",
      options: ["Yes", "No"]
    },
    {
      id: 6,
      question: "Do you feel chest pain or discomfort?",
      options: ["Yes", "No"]
    },
    {
      id: 7,
      question: "Have you experienced fatigue or weakness?",
      options: ["Yes", "No"]
    },
    {
      id: 8,
      question: "Have you been in close contact with someone diagnosed with TB?",
      options: ["Yes", "No"]
    }
  ];

  const handleAnswer = (answer) => {
    setAnswers({...answers, [currentQuestion]: answer});
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onNavigate('xray-upload');
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <Navbar 
        showCancelButton={true}
        onCancel={() => onNavigate('patient-home')}
      />

      {/* Progress Bar */}
      <div className="fixed top-20 left-0 right-0 bg-white border-b border-gray-100 z-40">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gray-700">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-semibold text-blue-600">{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-600 to-cyan-600 h-3 rounded-full transition-all duration-500 ease-out progress-bar"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-44 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-12 animate-scale">
            <div className="mb-12">
              <div className="inline-block px-4 py-2 bg-blue-50 rounded-full mb-6">
                <span className="text-sm font-semibold text-blue-600">Symptom Assessment</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 leading-relaxed">
                {questions[currentQuestion].question}
              </h2>
            </div>

            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="group w-full p-8 border-2 border-gray-200 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all text-left font-semibold text-gray-900 text-xl hover-lift flex items-center justify-between"
                >
                  <span>{option}</span>
                  <div className="w-8 h-8 rounded-full border-2 border-gray-300 group-hover:border-blue-500 group-hover:bg-blue-500 transition-all flex items-center justify-center">
                    <Check className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition" strokeWidth={3} />
                  </div>
                </button>
              ))}
            </div>

            {/* Question Navigation */}
            {currentQuestion > 0 && (
              <button
                onClick={() => setCurrentQuestion(currentQuestion - 1)}
                className="mt-8 text-gray-600 hover:text-gray-900 font-medium"
              >
                ← Previous Question
              </button>
            )}
          </div>

          {/* Info Card */}
          <div className="mt-8 bg-white rounded-2xl border border-gray-100 p-6 text-center animate-fade-in">
            <p className="text-gray-600">
              <span className="font-semibold text-gray-900">Privacy Note:</span> Your responses are confidential and used only for screening purposes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymptomTestPage;