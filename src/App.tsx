import React, { useState } from 'react';
import { Logo } from './components/Logo';
import { LanguageToggle } from './components/LanguageToggle';
import { UserForm } from './components/UserForm';
import { Timer } from './components/Timer';
import { Test } from './components/Test';
import { UserDetails, TestState } from './types';

function App() {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [isTestStarted, setIsTestStarted] = useState(false); // New state to track test start
  const [testState, setTestState] = useState<TestState>({
    currentQuestion: 1,
    answers: {},
    timeRemaining: 5400, // 90 minutes in seconds
    isSubmitted: false,
    timerIssue: false
  });

  const handleLanguageToggle = (newLang: 'en' | 'hi') => {
    setLanguage(newLang);
  };

  const handleUserSubmit = (data: UserDetails) => {
    setUserDetails(data);
    setIsTestStarted(true); // Start test when user submits details
  };

  const handleTimeUp = () => {
    if (!testState.isSubmitted) {
      setTestState(prev => ({ ...prev, isSubmitted: true }));
    }
  };

  const handleTimerIssue = (hasIssue: boolean) => {
    setTestState(prev => ({ ...prev, timerIssue: hasIssue }));
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Logo />
        <LanguageToggle language={language} onToggle={handleLanguageToggle} />
        
        {!userDetails ? (
          <UserForm onSubmit={handleUserSubmit} language={language} />
        ) : (
          <div className="mt-8">
            {/* Pass isTestStarted to Timer */}
            <Timer 
              initialTime={5400} // 90 minutes
              onTimeUp={handleTimeUp}
              isTestStarted={isTestStarted} 
              isSubmitted={testState.isSubmitted} 
            />
            <Test
              language={language}
              onTimeUp={handleTimeUp}
              testState={testState}
              setTestState={setTestState}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
