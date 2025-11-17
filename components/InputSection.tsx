import React from 'react';
import { StepLabel } from './StepLabel';

interface InputSectionProps {
  rawContent: string;
  setRawContent: (content: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({ rawContent, setRawContent, onGenerate, isLoading }) => {
  return (
    <div className="bg-gray-700 border border-gray-600 rounded-lg shadow-lg p-6 space-y-4">
      <StepLabel step={1} label="Paste Your Promotional Content" />
      <textarea
        id="raw-content"
        value={rawContent}
        onChange={(e) => setRawContent(e.target.value)}
        placeholder="Paste all your brand info, deals, and coupon details here..."
        className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg shadow-inner focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 resize-y text-gray-300 placeholder-gray-500 min-h-[300px]"
        aria-label="Raw Content Input"
      />
      <button
        onClick={onGenerate}
        disabled={isLoading}
        className="w-full flex items-center justify-center px-6 py-3 text-lg font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/50 disabled:bg-gray-500 disabled:cursor-not-allowed transition-all duration-300 ease-in-out transform hover:scale-[1.02] disabled:scale-100"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : (
           <div className="flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Generate All Assets
           </div>
        )}
      </button>
    </div>
  );
};

export default InputSection;
