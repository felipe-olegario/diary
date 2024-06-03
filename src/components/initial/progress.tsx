import React from 'react';

interface ProgressProps {
  indexSelected?: number;
}

const Progress: React.FC<ProgressProps> = ({ indexSelected = 0 }) => {
  const totalSteps = 4; // Número total de steps/divs

  return (
    <div className="flex space-x-3">
      {[...Array(totalSteps)].map((_, index) => (
        <div
          key={index}
          className={`h-2 w-2 rounded-full ${index <= indexSelected ? 'bg-black' : 'bg-gray-200'}`}
        ></div>
      ))}
    </div>
  );
};

export default Progress;
