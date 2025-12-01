import React from 'react';
import { Market } from '../../types';
import Card from '../shared/Card';
import Button from '../shared/Button';
import { ArrowLeftIcon } from '../shared/icons/ArrowLeftIcon';

interface MarketDetailsPageProps {
  market: Market;
  onBack: () => void;
}

const MarketDetailsPage: React.FC<MarketDetailsPageProps> = ({ market, onBack }) => {
  return (
    <div className="space-y-6">
      <div>
        <Button onClick={onBack} variant="secondary" className="mb-4 inline-flex items-center gap-2">
            <ArrowLeftIcon />
            Back to Markets
        </Button>
      </div>
      
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
        <img className="h-64 w-full object-cover" src={market.imageUrl} alt={market.name} />
        <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{market.name}</h1>
            <p className="text-md text-gray-500 dark:text-gray-400 mt-1">{market.location}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
             <Card title="About this Market">
                <p>{market.description}</p>
            </Card>
        </div>
        <div className="space-y-6">
             <Card title="Key Commodities">
                <div className="flex flex-wrap gap-2">
                    {market.commodities.map(c => (
                        <span key={c} className="px-2.5 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">{c}</span>
                    ))}
                </div>
            </Card>
            <Card title="Contact Information">
                <div className="space-y-2">
                    <div>
                        <p className="text-sm text-gray-500">Contact Person</p>
                        <p className="font-semibold text-gray-800 dark:text-white">{market.contactPerson}</p>
                    </div>
                     <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-semibold text-gray-800 dark:text-white">{market.phone}</p>
                    </div>
                </div>
            </Card>
        </div>
      </div>
    </div>
  );
};

export default MarketDetailsPage;