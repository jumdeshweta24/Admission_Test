export interface UserDetails {
  fullName: string;
  email: string;
  state: string;
  age: number;
  educationLevel: string;
  language: 'en' | 'hi'| 'marathi';
}

export interface Question {
  id: number;
  questionEn: string;
  questionHi: string;
  marathi?: string;
  answer: string;
  category: 'logical' | 'pattern' | 'percentage' | 'practical' | 'weight';
  options?: string[];
}

export interface TestResult {
  score: number;
  totalQuestions: number;
  performance: 'excellent' | 'good' | 'needs_improvement';
  feedback: string;
  categoryScores: Record<string, number>;
  passed: boolean;
  detailedFeedback: {
    comprehension: string;
    reasoning: string;
    strengths: string[];
    improvements: string[];
  };
}

export interface TestState {
  currentQuestion: number;
  answers: Record<number, string>;
  timeRemaining: number;
  isSubmitted: boolean;
  result?: TestResult;
  timerIssue?: boolean;
  lastTimerUpdate?: number;
}