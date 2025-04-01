import React, { useState } from 'react';
import { UserDetails } from '../types';
import { User, Mail, MapPin, Calendar, GraduationCap } from 'lucide-react';

const states = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

const educationLevels = [
  '10th Pass',
  '12th Pass',
  'Undergraduate',
  'Graduate',
  'Other'
];

interface UserFormProps {
  onSubmit: (data: UserDetails) => void;
  language: 'en' | 'hi';
}

export const UserForm: React.FC<UserFormProps> = ({ onSubmit, language }) => {
  const [formData, setFormData] = useState<UserDetails>({
    fullName: '',
    email: '',
    state: '',
    age: 0,
    educationLevel: '',
    language
  });

  const [errors, setErrors] = useState<Partial<Record<keyof UserDetails, string>>>({});
  const [currentStep, setCurrentStep] = useState(1);

  const validateForm = () => {
    const newErrors: Partial<Record<keyof UserDetails, string>> = {};

    if (!formData.fullName) {
      newErrors.fullName = language === 'en' ? 'Name is required' : 'नाम आवश्यक है';
    }

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = language === 'en' ? 'Valid email is required' : 'वैध ईमेल आवश्यक है';
    }

    if (!formData.state) {
      newErrors.state = language === 'en' ? 'State is required' : 'राज्य का चयन करें';
    }

    if (!formData.age || formData.age < 15 || formData.age > 30) {
      newErrors.age = language === 'en' ? 'Age must be between 15 and 30' : 'आयु 15 से 30 वर्ष के बीच होनी चाहिए';
    }

    if (!formData.educationLevel) {
      newErrors.educationLevel = language === 'en' ? 'Education level is required' : 'शिक्षा स्तर का चयन करें';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
                <input
                  type="text"
                  placeholder={language === 'en' ? 'Enter your full name' : 'अपना पूरा नाम दर्ज करें'}
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="input-field pl-10"
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
                <input
                  type="email"
                  placeholder={language === 'en' ? 'Enter your email' : 'अपना ईमेल दर्ज करें'}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input-field pl-10"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
            </div>
            <button
              onClick={() => setCurrentStep(2)}
              className="btn-primary w-full mt-6"
            >
              {language === 'en' ? 'Next' : 'अगला'}
            </button>
          </>
        );
      case 2:
        return (
          <>
            <div className="space-y-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
                <select
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="select-field pl-10"
                >
                  <option value="">{language === 'en' ? 'Select your state' : 'अपना राज्य चुनें'}</option>
                  {states.map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
                {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
              </div>

              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
                <input
                  type="number"
                  placeholder={language === 'en' ? 'Enter your age' : 'अपनी आयु दर्ज करें'}
                  value={formData.age || ''}
                  onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
                  className="input-field pl-10"
                  min="15"
                  max="30"
                />
                {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
              </div>

              <div className="relative">
                <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
                <select
                  value={formData.educationLevel}
                  onChange={(e) => setFormData({ ...formData, educationLevel: e.target.value })}
                  className="select-field pl-10"
                >
                  <option value="">{language === 'en' ? 'Select education level' : 'शिक्षा स्तर चुनें'}</option>
                  {educationLevels.map((level) => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
                {errors.educationLevel && <p className="text-red-500 text-sm mt-1">{errors.educationLevel}</p>}
              </div>
            </div>
            <div className="flex space-x-4 mt-6">
              <button
                onClick={() => setCurrentStep(1)}
                className="btn-primary w-1/2 bg-gray-500 hover:bg-gray-600"
              >
                {language === 'en' ? 'Back' : 'वापस'}
              </button>
              <button
                onClick={handleSubmit}
                className="btn-primary w-1/2"
              >
                {language === 'en' ? 'Start Test' : 'परीक्षा शुरू करें'}
              </button>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-lg backdrop-filter">
        <h2 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          {language === 'en' ? 'Student Information' : 'छात्र जानकारी'}
        </h2>

        <div className="flex justify-center mb-8">
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentStep === 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>1</div>
            <div className={`w-16 h-1 ${currentStep === 1 ? 'bg-gray-200' : 'bg-blue-600'}`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentStep === 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>2</div>
          </div>
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          {renderStep()}
        </form>
      </div>
    </div>
  );
};