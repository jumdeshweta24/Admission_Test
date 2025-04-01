import React, { useState } from 'react';
import { Question } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TestQuestionProps {
  question: Question;
  language: 'en' | 'hi';
  answer: string;
  onAnswerChange: (answer: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export const TestQuestion: React.FC<TestQuestionProps> = ({
  question,
  language,
  answer,
  onAnswerChange,
  onNext,
  onPrevious,
  isFirst,
  isLast,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-lg backdrop-filter">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Question {question.id}
        </h3>
        <p className="text-gray-700 whitespace-pre-wrap">
          {language === 'en' ? question.questionEn : question.questionHi}
        </p>
        {language === 'hi' && question.marathi && (
          <p className="text-gray-600 mt-2 whitespace-pre-wrap">
            {question.marathi}
          </p>
        )}
      </div>

      <div className="mb-8">
        <input
          type="text"
          value={answer}
          onChange={(e) => onAnswerChange(e.target.value)}
          placeholder={language === 'en' ? 'Enter your answer' : 'अपना उत्तर लिखें'}
          className="input-field"
        />
      </div>

      <div className="flex justify-between">
        <button
          onClick={onPrevious}
          disabled={isFirst}
          className={`btn-primary ${isFirst ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          {language === 'en' ? 'Previous' : 'पिछला'}
        </button>
        <button
          onClick={onNext}
          className="btn-primary"
        >
          {isLast ? (language === 'en' ? 'Submit' : 'जमा करें') : (language === 'en' ? 'Next' : 'अगला')}
          {!isLast && <ChevronRight className="w-5 h-5 ml-2" />}
        </button>
      </div>
    </div>
  );
};