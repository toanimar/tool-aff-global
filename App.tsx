import React, { useState, useCallback } from 'react';
import { generateAffiliateArticle, GeneratedContent } from './services/geminiService';
import Header from './components/Header';
import InputSection from './components/InputSection';
import OutputSection from './components/OutputSection';
import SeoMetadata from './components/SeoMetadata';
import AdsAssets from './components/AdsAssets';
import { initialContent } from './constants';


const App: React.FC = () => {
  const [rawContent, setRawContent] = useState<string>(initialContent);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!rawContent.trim()) {
      setError('Please provide some content to generate the article.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedContent(null);

    try {
      const result = await generateAffiliateArticle(rawContent);
      setGeneratedContent(result);
    } catch (err) {
      if (err instanceof Error) {
        if (err.message.toLowerCase().includes('permission denied') || err.message.toLowerCase().includes('api key not valid')) {
            setError("Permission Denied. Please ensure your API key is correct and the 'Generative Language API' is enabled in your Google Cloud project.");
        } else {
            setError(`Failed to generate content: ${err.message}. Please check your network connection and try again.`);
        }
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [rawContent]);

  return (
    <div className="min-h-screen bg-gray-800 text-gray-300 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8 flex flex-col gap-8">

        {/* Step 1: Input Section */}
        <InputSection
          rawContent={rawContent}
          setRawContent={setRawContent}
          onGenerate={handleGenerate}
          isLoading={isLoading}
        />

        {/* Step 2: Generated Article Output */}
        <OutputSection
          articleHtml={generatedContent?.articleHtml || ''}
          isLoading={isLoading}
          error={error}
        />

        {/* Step 3 & 4: SEO Metadata & Ads Assets */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <SeoMetadata 
              metadata={generatedContent}
              isLoading={isLoading}
            />
            <AdsAssets 
              metadata={generatedContent}
              isLoading={isLoading}
            />
        </div>

      </main>
      <footer className="text-center py-6 text-gray-500 text-sm border-t border-gray-700 mt-8">
        <p>Powered by Google Gemini. Designed for expert content analysts.</p>
        <p className="font-semibold text-gray-400 mt-1">Created by TOANIMAR</p>
      </footer>
    </div>
  );
};

export default App;
