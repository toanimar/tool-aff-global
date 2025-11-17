import React from 'react';

interface ErrorAlertProps {
  message: string;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center bg-red-900/20 border border-red-500/30 text-red-300 p-6 rounded-lg m-2">
       <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-3 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <h3 className="text-lg font-bold text-white">Generation Failed</h3>
      <p className="mt-1 text-sm max-w-md">{message}</p>
    </div>
  );
};

export default ErrorAlert;