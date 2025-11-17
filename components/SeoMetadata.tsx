import React, { useState, useCallback } from 'react';
import { GeneratedContent } from '../services/geminiService';
import { StepLabel } from './StepLabel';

interface SeoMetadataProps {
  metadata: GeneratedContent | null;
  isLoading: boolean;
}

const SeoMetadata: React.FC<SeoMetadataProps> = ({ metadata, isLoading }) => {
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-6 animate-pulse">
            <div className="space-y-2">
                <div className="h-3 bg-gray-600 rounded w-1/3"></div>
                <div className="h-10 bg-gray-600 rounded w-full"></div>
            </div>
             <div className="space-y-2">
                <div className="h-3 bg-gray-600 rounded w-1/3"></div>
                <div className="h-20 bg-gray-600 rounded w-full"></div>
            </div>
             <div className="space-y-2">
                <div className="h-3 bg-gray-600 rounded w-1/3"></div>
                <div className="h-10 bg-gray-600 rounded w-full"></div>
            </div>
           <div className="flex flex-wrap gap-2 pt-4">
              <div className="h-6 bg-gray-600 rounded-full w-28"></div>
              <div className="h-6 bg-gray-600 rounded-full w-20"></div>
          </div>
           <div className="flex flex-wrap gap-2 pt-4">
              <div className="h-6 bg-gray-600 rounded-full w-20"></div>
              <div className="h-6 bg-gray-600 rounded-full w-24"></div>
              <div className="h-6 bg-gray-600 rounded-full w-16"></div>
          </div>
        </div>
      );
    }
    
    if (!metadata) {
      return (
        <div className="text-center text-gray-500 flex flex-col items-center justify-center h-full p-6 min-h-[20rem]">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-400">SEO Details</h3>
          <p>Generated metadata will appear here.</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <MetadataField label="Meta Title" value={metadata.metaTitle} />
        <MetadataField label="Meta Description" value={metadata.metaDescription} />
        <MetadataField label="URL Slug" value={metadata.urlSlug} />
        <MetadataField label="Short Description" value={metadata.shortDescription} />
        
        <div>
          <h4 className="text-sm font-semibold text-gray-400 mb-2">Categories</h4>
          <div className="flex flex-wrap gap-2">
              {metadata.categories.map((category, index) => (
              <span key={index} className="px-3 py-1 bg-purple-500/10 text-purple-300 text-sm font-medium rounded-full border border-purple-500/20">
                  {category}
              </span>
              ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-semibold text-gray-400 mb-2">Keywords</h4>
          <div className="flex flex-wrap gap-2">
            {metadata.keywords.map((keyword, index) => (
              <span key={index} className="px-3 py-1 bg-blue-500/10 text-blue-300 text-sm font-medium rounded-full border border-blue-500/20">
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-700 border border-gray-600 rounded-lg shadow-lg p-6 h-full">
      <StepLabel step={3} label="SEO Details" />
      <div className="mt-6">
        {renderContent()}
      </div>
    </div>
  );
};

interface MetadataFieldProps {
    label: string;
    value: string;
}

const MetadataField: React.FC<MetadataFieldProps> = ({ label, value }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(value).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        });
    }, [value]);

    return (
        <div>
            <div className="flex justify-between items-center mb-1">
                <h4 className="text-sm font-semibold text-gray-400">{label}</h4>
                <button 
                    onClick={handleCopy} 
                    className="text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-1 p-1"
                    title={`Copy ${label}`}
                >
                     {isCopied ? (
                        <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        </>
                     ) : (
                        <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        </>
                     )}
                </button>
            </div>
            <p className="text-gray-300 bg-gray-800 p-3 rounded-md text-sm border border-gray-600 whitespace-pre-wrap">{value || ' '}</p>
        </div>
    )
}


export default SeoMetadata;