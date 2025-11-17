import React from 'react';

interface StepLabelProps {
    step: number;
    label: string;
}

export const StepLabel: React.FC<StepLabelProps> = ({ step, label }) => {
  return (
    <div className="flex items-center space-x-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-lg shadow-md">
            {step}
        </div>
        <h2 className="text-xl font-semibold text-gray-200">{label}</h2>
    </div>
  );
};
