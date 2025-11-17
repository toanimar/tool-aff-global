import React, { useState, useCallback } from 'react';
import { GeneratedContent, Sitelink, AdGroup } from '../services/geminiService';
import { StepLabel } from './StepLabel';

interface AdsAssetsProps {
  metadata: GeneratedContent | null;
  isLoading: boolean;
}

type ActiveTab = 'Coupon' | 'Discount';

const AdsAssets: React.FC<AdsAssetsProps> = ({ metadata, isLoading }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('Coupon');

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-6 animate-pulse">
          {/* Tabs Skeleton */}
          <div className="flex space-x-2 border-b border-gray-600 pb-2 mb-4">
            <div className="h-8 bg-gray-600 rounded-md w-28"></div>
            <div className="h-8 bg-gray-600 rounded-md w-28"></div>
          </div>
           {/* Keywords Skeleton */}
           <div>
            <div className="h-4 bg-gray-600 rounded w-1/4 mb-3"></div>
            <div className="flex flex-wrap gap-2">
                <div className="h-6 bg-gray-600 rounded-full w-24"></div>
                <div className="h-6 bg-gray-600 rounded-full w-32"></div>
                <div className="h-6 bg-gray-600 rounded-full w-28"></div>
            </div>
          </div>
          {/* Headlines Skeleton */}
          <div className="pt-4">
            <div className="h-4 bg-gray-600 rounded w-1/4 mb-3"></div>
            <div className="space-y-2">
                <div className="h-5 bg-gray-600 rounded w-full"></div>
                <div className="h-5 bg-gray-600 rounded w-5/6"></div>
            </div>
          </div>
           {/* Sitelinks Skeleton */}
           <div className="pt-4">
            <div className="h-4 bg-gray-600 rounded w-1/3 mb-3"></div>
            <div className="h-20 bg-gray-600 rounded w-full"></div>
          </div>
        </div>
      );
    }

    if (!metadata || !metadata.adGroups || metadata.adGroups.length === 0) {
      return (
        <div className="text-center text-gray-500 flex flex-col items-center justify-center h-full p-6 min-h-[20rem]">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.875 9.168-3.918" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-400">Google Ads Assets</h3>
          <p>Campaign details will appear here.</p>
        </div>
      );
    }
    
    const couponGroup = metadata.adGroups.find(g => g.groupName.toLowerCase().includes('coupon'));
    const discountGroup = metadata.adGroups.find(g => g.groupName.toLowerCase().includes('discount'));
    const activeGroup = activeTab === 'Coupon' ? couponGroup : discountGroup;

    return (
      <div className="space-y-6">
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-600">
          <TabButton name="Coupon" activeTab={activeTab} setActiveTab={setActiveTab} />
          <TabButton name="Discount" activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/* Tab Content */}
        {activeGroup ? (
          <div className="space-y-6 bg-gray-900/20 p-4 rounded-lg">
             <AssetPillList 
              label="Keywords"
              items={activeGroup.keywords}
            />
            <AssetList 
              label={`Headlines (${activeGroup.headlines.length})`}
              items={activeGroup.headlines}
            />
            <AssetList 
              label={`Descriptions (${activeGroup.descriptions.length})`}
              items={activeGroup.descriptions}
            />
          </div>
        ) : (
          <div className="text-gray-500 p-4">Ad group data not found.</div>
        )}

        {/* Shared Assets */}
        <div className="pt-6 border-t border-gray-600/50 space-y-6">
           <h3 className="text-lg font-semibold text-gray-200">Shared Ad Extensions</h3>
           <SitelinkList sitelinks={metadata.sitelinks} />
           <AssetPillList
            label="Callout Extensions"
            items={metadata.callouts || []}
            color="purple"
           />
        </div>

      </div>
    );
  };

  return (
    <div className="bg-gray-700 border border-gray-600 rounded-lg shadow-lg p-6 h-full">
      <StepLabel step={4} label="Google Ads Assets" />
      <div className="mt-6">
        {renderContent()}
      </div>
    </div>
  );
};

// --- Helper Components ---

const TabButton: React.FC<{name: ActiveTab, activeTab: ActiveTab, setActiveTab: (tab: ActiveTab) => void}> = ({ name, activeTab, setActiveTab }) => (
  <button
    onClick={() => setActiveTab(name)}
    className={`px-4 py-2 text-sm font-medium transition-colors duration-200 -mb-px border-b-2 ${
      activeTab === name
        ? 'border-blue-500 text-blue-400'
        : 'border-transparent text-gray-400 hover:text-white hover:border-gray-400'
    }`}
  >
    {name} Ad Group
  </button>
);


const AssetList: React.FC<{label: string, items: string[]}> = ({ label, items }) => {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = useCallback(() => {
    const textToCopy = items.join('\n');
    navigator.clipboard.writeText(textToCopy).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  }, [items]);

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-sm font-semibold text-gray-400">{label}</h4>
        <button
          onClick={handleCopy}
          className="text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-1.5 px-2 py-1 bg-gray-700/50 hover:bg-gray-700 rounded-md border border-gray-600/50"
          title={`Copy All ${label}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
          {isCopied ? 'Copied!' : 'Copy All'}
        </button>
      </div>
      <div className="bg-gray-800 p-3 rounded-md border border-gray-600 max-h-48 overflow-y-auto">
        <ol className="text-gray-300 text-sm space-y-2 list-decimal list-inside">
          {items.map((item, index) => <li key={index}><span className="ml-1">{item}</span></li>)}
        </ol>
      </div>
    </div>
  )
}

const AssetPillList: React.FC<{label: string, items: string[], color?: 'blue' | 'purple'}> = ({ label, items, color = 'blue' }) => {
    const colorClasses = {
        blue: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
        purple: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
    };
    
    return (
        <div>
            <h4 className="text-sm font-semibold text-gray-400 mb-2">{label}</h4>
            <div className="flex flex-wrap gap-2">
                {items.map((item, index) => (
                    <span key={index} className={`px-3 py-1 text-sm font-medium rounded-full border ${colorClasses[color]}`}>
                        {item}
                    </span>
                ))}
            </div>
        </div>
    )
};


const SitelinkList: React.FC<{sitelinks: Sitelink[]}> = ({ sitelinks }) => {
  return (
    <div>
      <h4 className="text-sm font-semibold text-gray-400 mb-2">Sitelink Extensions</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {sitelinks.map((sitelink, index) => (
          <div key={index} className="bg-gray-800 p-3 rounded-lg border border-gray-600">
            <h5 className="font-bold text-blue-400 text-sm">{sitelink.headline}</h5>
            <p className="text-gray-400 text-xs mt-1">{sitelink.description1}</p>
            <p className="text-gray-400 text-xs">{sitelink.description2}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdsAssets;