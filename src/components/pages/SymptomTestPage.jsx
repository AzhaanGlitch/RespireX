import React, { useState } from 'react';
import { Activity } from 'lucide-react';

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
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Activity className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">RespireX</span>
            </div>
            <button
              onClick={() => onNavigate('patient-home')}
              className="text-gray-600 hover:text-gray-900"
            >
              Cancel Test
            </button>
          </div>
        </div>
      </nav>

      <div className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-gray-700">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">
            {questions[currentQuestion].question}
          </h2>

          <div className="space-y-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className="w-full p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition text-left font-medium text-gray-900"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymptomTestPage;
