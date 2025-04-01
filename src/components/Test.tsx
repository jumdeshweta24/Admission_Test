import React, { useState, useEffect } from 'react';
import { TestQuestion } from './TestQuestion';
import { TestReport } from './TestReport';
import { Question, TestState, TestResult } from '../types';
import { questions } from '../data/questions';

interface TestProps {
  language: 'en' | 'hi';
  onTimeUp: () => void;
  testState: TestState;
  setTestState: React.Dispatch<React.SetStateAction<TestState>>;
}

export const Test: React.FC<TestProps> = ({
  language,
  onTimeUp,
  testState,
  setTestState,
}) => {
  const handleAnswerChange = (answer: string) => {
    setTestState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questions[prev.currentQuestion - 1].id]: answer
      }
    }));
  };

  const handleNext = () => {
    if (testState.currentQuestion < questions.length) {
      setTestState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1
      }));
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (testState.currentQuestion > 1) {
      setTestState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion - 1
      }));
    }
  };

  const generateDetailedFeedback = (score: number, categoryScores: Record<string, number>) => {
    const strengths: string[] = [];
    const improvements: string[] = [];
    const totalQuestions = questions.length;
    const percentage = (score / totalQuestions) * 100;

    // Analyze category performance
    Object.entries(categoryScores).forEach(([category, score]) => {
      if (score >= 0.7) {
        strengths.push(language === 'en' 
          ? `Strong performance in ${category} questions`
          : `${category} प्रश्नों में उत्कृष्ट प्रदर्शन`);
      } else if (score <= 0.4) {
        improvements.push(language === 'en'
          ? `Need to improve in ${category} questions`
          : `${category} प्रश्नों में सुधार की आवश्यकता`);
      }
    });

    // Analyze comprehension level
    const comprehension = language === 'en'
      ? percentage >= 70
        ? "Excellent understanding of concepts and problem-solving techniques"
        : percentage >= 50
        ? "Good grasp of basic concepts but needs more practice"
        : "Needs to focus on understanding fundamental concepts"
      : percentage >= 70
        ? "अवधारणाओं और समस्या समाधान तकनीकों की उत्कृष्ट समझ"
        : percentage >= 50
        ? "मूल अवधारणाओं की अच्छी समझ लेकिन अधिक अभ्यास की आवश्यकता है"
        : "मूल अवधारणाओं को समझने पर ध्यान देने की आवश्यकता है";

    // Analyze reasoning skills
    const reasoning = language === 'en'
      ? percentage >= 70
        ? "Strong logical reasoning and pattern recognition abilities"
        : percentage >= 50
        ? "Developing logical thinking skills, continue practicing"
        : "Focus needed on improving logical reasoning skills"
      : percentage >= 70
        ? "मजबूत तार्किक तर्क और पैटर्न पहचान क्षमताएं"
        : percentage >= 50
        ? "तार्किक सोच कौशल विकसित हो रहा है, अभ्यास जारी रखें"
        : "तार्किक तर्क कौशल में सुधार की आवश्यकता है";

    return {
      comprehension,
      reasoning,
      strengths,
      improvements
    };
  };

  const calculateResult = (): TestResult => {
    let score = 0;
    const categoryScores: Record<string, number> = {};
    const categoryCounts: Record<string, number> = {};

    questions.forEach(q => {
      const userAnswer = testState.answers[q.id] || '';
      if (userAnswer.trim().toLowerCase() === q.answer.toLowerCase()) {
        score++;
        categoryScores[q.category] = (categoryScores[q.category] || 0) + 1;
      }
      categoryCounts[q.category] = (categoryCounts[q.category] || 0) + 1;
    });

    // Calculate category percentages
    Object.keys(categoryScores).forEach(category => {
      categoryScores[category] = categoryScores[category] / categoryCounts[category];
    });

    const passed = score >= 13;
    const percentage = score / questions.length;
    const performance = percentage >= 0.8 ? 'excellent' :
                       percentage >= 0.6 ? 'good' : 'needs_improvement';

    const detailedFeedback = generateDetailedFeedback(score, categoryScores);

    const feedback = language === 'en'
      ? `You ${passed ? 'passed' : 'did not pass'} the test with ${score} out of ${questions.length} correct answers.`
      : `आपने ${score} में से ${questions.length} सही उत्तरों के साथ परीक्षा ${passed ? 'पास की' : 'पास नहीं की'}.`;

    return {
      score,
      totalQuestions: questions.length,
      performance,
      categoryScores,
      passed,
      feedback,
      detailedFeedback
    };
  };

  const handleSubmit = () => {
    const result = calculateResult();
    setTestState(prev => ({
      ...prev,
      isSubmitted: true,
      result
    }));
  };

  if (testState.timerIssue) {
    return (
      <div className="max-w-3xl mx-auto bg-red-50 p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          {language === 'en' ? 'Timer Issue Detected' : 'टाइमर में समस्या'}
        </h2>
        <p className="text-red-700 mb-4">
          {language === 'en' 
            ? 'We detected an issue with the timer. Please refresh the page to ensure accurate timing.'
            : 'टाइमर में एक समस्या का पता चला है। कृपया सटीक समय के लिए पेज को रिफ्रेश करें।'}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          {language === 'en' ? 'Refresh Page' : 'पेज रिफ्रेश करें'}
        </button>
      </div>
    );
  }

  if (testState.isSubmitted && testState.result) {
    return <TestReport result={testState.result} language={language} />;
  }

  const currentQuestion = questions[testState.currentQuestion - 1];

  return (
    <div className="max-w-3xl mx-auto">
      <TestQuestion
        question={currentQuestion}
        language={language}
        answer={testState.answers[currentQuestion.id] || ''}
        onAnswerChange={handleAnswerChange}
        onNext={handleNext}
        onPrevious={handlePrevious}
        isFirst={testState.currentQuestion === 1}
        isLast={testState.currentQuestion === questions.length}
      />
    </div>
  );
};