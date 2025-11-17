import React, { useState, useCallback } from 'react';
import Loader from './Loader';
import ErrorAlert from './ErrorAlert';
import { StepLabel } from './StepLabel';

interface OutputSectionProps {
  articleHtml: string;
  isLoading: boolean;
  error: string | null;
}

type ViewMode = 'preview' | 'code';

const OutputSection: React.FC<OutputSectionProps> = ({ articleHtml, isLoading, error }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('preview');
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle');

  const handleCopy = useCallback(() => {
    if (articleHtml) {
      navigator.clipboard.writeText(articleHtml).then(() => {
        setCopyStatus('copied');
        setTimeout(() => setCopyStatus('idle'), 2000);
      });
    }
  }, [articleHtml]);

  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }
    if (error) {
      return <ErrorAlert message={error} />;
    }
    if (!articleHtml) {
      return (
        <div className="text-center text-gray-500 flex flex-col items-center justify-center h-full p-6 min-h-[40rem]">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-400">Your Generated Article Will Appear Here</h3>
          <p>Results from the AI will be displayed in this panel.</p>
        </div>
      );
    }

    return (
      <div className="flex flex-col">
        <div className="p-2 bg-gray-800/50 rounded-t-lg flex justify-between items-center border-b border-gray-600">
          <div className="flex space-x-1">
            <TabButton active={viewMode === 'preview'} onClick={() => setViewMode('preview')}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C3.732 4.943 9.522 3 10 3s6.268 1.943 9.542 7c-3.274 5.057-9.064 7-9.542 7S3.732 15.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>
              Preview
            </TabButton>
            <TabButton active={viewMode === 'code'} onClick={() => setViewMode('code')}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
              HTML
            </TabButton>
          </div>
          {viewMode === 'code' && (
             <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 rounded-md transition-colors text-white font-semibold"
              >
                {copyStatus === 'copied' ? (
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                ) : (
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                )}
                {copyStatus === 'copied' ? 'Copied!' : 'Copy Code'}
            </button>
          )}
        </div>
        <div className="overflow-auto flex-grow">
          {viewMode === 'preview' ? (
            <iframe
              srcDoc={articleHtml}
              title="Generated Article Preview"
              className="w-full h-full bg-white rounded-b-md"
              sandbox="allow-scripts"
              style={{ minHeight: '50rem' }}
            />
          ) : (
            <pre className="whitespace-pre-wrap bg-gray-900 p-4 text-sm text-blue-300 h-full overflow-auto rounded-b-md" style={{ minHeight: '50rem' }}>
              <code>{articleHtml}</code>
            </pre>
          )}
        </div>
      </div>
    );
  };
  
  return (
    <div className="flex flex-col space-y-4">
      <StepLabel step={2} label="Generated Article Output" />
      <div className="bg-gray-700 border border-gray-600 rounded-lg shadow-lg flex flex-col">
        {renderContent()}
      </div>
    </div>
  );
};

interface TabButtonProps {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
}

const TabButton: React.FC<TabButtonProps> = ({ active, onClick, children }) => (
    <button
      onClick={onClick}
      className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
        active
          ? 'bg-blue-600 text-white shadow-md'
          : 'text-gray-400 hover:bg-gray-600/50 hover:text-white'
      }`}
    >
      {children}
    </button>
  );

export default OutputSection;
