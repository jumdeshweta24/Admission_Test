import React from 'react';
import { TestResult } from '../types';
import { CheckCircle, XCircle, AlertCircle, Award, Brain, TrendingUp } from 'lucide-react';

interface TestReportProps {
  result: TestResult;
  language: 'en' | 'hi';
}

export const TestReport: React.FC<TestReportProps> = ({ result, language }) => {
  const getPerformanceColor = () => {
    switch (result.performance) {
      case 'excellent':
        return 'text-green-600';
      case 'good':
        return 'text-blue-600';
      case 'needs_improvement':
        return 'text-orange-600';
      default:
        return 'text-gray-600';
    }
  };

  const getPerformanceText = () => {
    if (language === 'en') {
      return {
        excellent: 'Excellent',
        good: 'Good',
        needs_improvement: 'Needs Improvement'
      }[result.performance];
    }
    return {
      excellent: 'उत्कृष्ट',
      good: 'अच्छा',
      needs_improvement: 'सुधार की आवश्यकता'
    }[result.performance];
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-lg backdrop-filter">
        <div className="flex items-center justify-center mb-8">
          {result.passed ? (
            <div className="bg-green-100 text-green-600 px-6 py-2 rounded-full font-semibold flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              {language === 'en' ? 'Test Passed' : 'परीक्षा पास की'}
            </div>
          ) : (
            <div className="bg-red-100 text-red-600 px-6 py-2 rounded-full font-semibold flex items-center">
              <XCircle className="w-5 h-5 mr-2" />
              {language === 'en' ? 'Test Not Passed' : 'परीक्षा पास नहीं की'}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">
              {language === 'en' ? 'Score Overview' : 'अंक विश्लेषण'}
            </h3>
            <div className="flex items-center justify-center">
              <div className="relative w-48 h-48">
                <svg className="transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="10"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke={result.passed ? '#22C55E' : '#DC2626'}
                    strokeWidth="10"
                    strokeDasharray={`${(result.score / result.totalQuestions) * 283} 283`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold">
                    {Math.round((result.score / result.totalQuestions) * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">
              {language === 'en' ? 'Performance Analysis' : 'प्रदर्शन विश्लेषण'}
            </h3>
            <div className={`text-2xl font-bold mb-4 ${getPerformanceColor()}`}>
              {getPerformanceText()}
            </div>
            <p className="text-gray-700">
              {result.feedback}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Brain className="w-6 h-6 mr-2 text-blue-600" />
              {language === 'en' ? 'Comprehension Level' : 'समझ का स्तर'}
            </h3>
            <p className="text-gray-700">
              {result.detailedFeedback.comprehension}
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <TrendingUp className="w-6 h-6 mr-2 text-blue-600" />
              {language === 'en' ? 'Reasoning Skills' : 'तर्क कौशल'}
            </h3>
            <p className="text-gray-700">
              {result.detailedFeedback.reasoning}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Award className="w-6 h-6 mr-2 text-green-600" />
              {language === 'en' ? 'Strengths' : 'मजबूत पक्ष'}
            </h3>
            <ul className="space-y-2">
              {result.detailedFeedback.strengths.map((strength, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                  {strength}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <AlertCircle className="w-6 h-6 mr-2 text-orange-600" />
              {language === 'en' ? 'Areas for Improvement' : 'सुधार के क्षेत्र'}
            </h3>
            <ul className="space-y-2">
              {result.detailedFeedback.improvements.map((improvement, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <AlertCircle className="w-4 h-4 mr-2 text-orange-600" />
                  {improvement}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};