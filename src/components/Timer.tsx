// import React, { useEffect, useRef } from 'react';
// import { Clock } from 'lucide-react';

// interface TimerProps {
//   timeRemaining: number;
//   onTimeUp: () => void;
//   onTimerIssue: (hasIssue: boolean) => void;
// }

// export const Timer: React.FC<TimerProps> = ({ timeRemaining, onTimeUp, onTimerIssue }) => {
//   const lastUpdateRef = useRef<number>(Date.now());
//   const checkIntervalRef = useRef<number>();

//   useEffect(() => {
//     const checkTimerAccuracy = () => {
//       const now = Date.now();
//       const timeDiff = now - lastUpdateRef.current;
      
//       // If the time difference is more than 2 seconds (indicating potential timer issues)
//       if (timeDiff > 2000) {
//         onTimerIssue(true);
//       } else {
//         onTimerIssue(false);
//       }
      
//       lastUpdateRef.current = now;
//     };

//     checkIntervalRef.current = window.setInterval(checkTimerAccuracy, 1000);

//     return () => {
//       if (checkIntervalRef.current) {
//         clearInterval(checkIntervalRef.current);
//       }
//     };
//   }, [onTimerIssue]);

//   useEffect(() => {
//     if (timeRemaining <= 0) {
//       onTimeUp();
//     }
//   }, [timeRemaining, onTimeUp]);

//   const minutes = Math.floor(timeRemaining / 60);
//   const seconds = timeRemaining % 60;

//   const getTimeColor = () => {
//     if (timeRemaining < 300) return 'text-red-600'; // Less than 5 minutes
//     if (timeRemaining < 900) return 'text-orange-500'; // Less than 15 minutes
//     return 'text-blue-600';
//   };

//   return (
//     <div className="fixed top-4 left-4 bg-white rounded-2xl shadow-lg p-4 backdrop-blur-lg backdrop-filter">
//       <div className="flex items-center space-x-3">
//         <Clock className={`w-6 h-6 ${getTimeColor()}`} />
//         <div className={`text-2xl font-bold ${getTimeColor()}`}>
//           {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
//         </div>
//       </div>
//     </div>
//   );
// };
import React, { useEffect, useState } from "react";
import { Clock } from "lucide-react";

interface TimerProps {
  initialTime: number;
  onTimeUp: () => void;
  isTestStarted: boolean;
  isSubmitted: boolean;
}

export const Timer: React.FC<TimerProps> = ({
  initialTime,
  onTimeUp,
  isTestStarted,
  isSubmitted,
}) => {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const [timeTaken, setTimeTaken] = useState(0); // Store total time taken

  useEffect(() => {
    if (!isTestStarted || isSubmitted) return; // Stop timer when test is submitted

    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          onTimeUp();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isTestStarted, isSubmitted, onTimeUp]);

  // When the test is submitted, calculate the time taken
  useEffect(() => {
    if (isSubmitted) {
      setTimeTaken(initialTime - timeRemaining);
    }
  }, [isSubmitted, timeRemaining, initialTime]);

  // Convert seconds into minutes and seconds
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  return (
    <div className="fixed top-4 left-4 bg-white rounded-xl shadow-md p-4">
      {isSubmitted ? (
        <div className="text-xl font-bold text-green-600">
          ✅ Test Completed in {formatTime(timeTaken)}
        </div>
      ) : (
        <div className="flex items-center space-x-3">
          <Clock className="w-6 h-6 text-blue-600" />
          <div className="text-2xl font-bold">{formatTime(timeRemaining)}</div>
        </div>
      )}
    </div>
  );
};
