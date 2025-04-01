import React from 'react';
import { Languages } from 'lucide-react';

interface LanguageToggleProps {
  language: 'en' | 'hi'| 'marathi';
  onToggle: (lang: 'en' | 'hi'| 'marathi') => void;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ language, onToggle }) => {
  return (
    <button
      onClick={() => onToggle(language === 'en' ? 'hi' : 'en')}
      className="fixed top-4 right-4 bg-white px-4 py-2 rounded-full shadow-lg
        hover:shadow-xl transition-all duration-200 border-2 border-blue-100
        flex items-center space-x-2 group"
    >
      <Languages className="w-5 h-5 text-blue-600 group-hover:rotate-180 transition-transform duration-300" />
      <span className="font-medium text-gray-700">{language === 'en' ? 'हिंदी' : 'English'}</span>
    </button>
  );
};