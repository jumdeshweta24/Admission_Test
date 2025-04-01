import React from 'react';
import { GraduationCap } from 'lucide-react';

export const Logo: React.FC = () => {
  return (
    <div className="flex items-center justify-center space-x-3 mb-8">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-2xl shadow-lg">
        <GraduationCap className="w-10 h-10 text-white" />
      </div>
      <div className="flex flex-col">
        <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          NavGurukul
        </span>
        <span className="text-sm text-gray-600">Admission Test Portal</span>
      </div>
    </div>
  );
};