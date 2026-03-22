import React, { useState, useMemo } from 'react';
import { Market } from '../../types';
import Button from '../shared/Button';
import { SearchIcon } from '../shared/icons/SearchIcon';
import MarketDetailsPage from './MarketDetailsPage';

const mockMarkets: Market[] = [
  {
    id: 'mkt-1',
    name: 'Green Valley Central Market',
    location: 'Green Valley, CA',
    imageUrl: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?q=80&w=1974&auto=format&fit=crop',
    commodities: ['Vegetables', 'Fruits', 'Dairy'],
    description: 'A bustling indoor market open year-round, featuring over 50 local vendors. Known for its fresh organic produce and artisanal cheeses.',
    contactPerson: 'Maria Garcia',
    phone: '555-0101'
  },
  {
    id: 'mkt-2',
    name: 'AgriCo Farmers Hub',
    location: 'Plainsfield, IL',
    imageUrl: 'https://images.unsplash.com/photo-1518635017439-1a434782163d?q=80&w=2070&auto=format&fit=crop',
    commodities: ['Grains', 'Corn', 'Soybeans'],
    description: 'A large-scale wholesale hub specializing in grains and staple crops. Offers storage facilities and logistics support.',
    contactPerson: 'David Chen',
    phone: '555-0102'
  },
  {
    id: 'mkt-3',
    name: 'Coastal Organic Collective',
    location: 'Sunny Bay, FL',
    imageUrl: 'https://images.unsplash.com/photo-1589923188900-85dae5233157?q=80&w=2070&auto=format&fit=crop',
    commodities: ['Fruits', 'Vegetables', 'Organic Produce'],
    description: 'A cooperative market focused on certified organic produce. Strong emphasis on sustainable farming practices and community engagement.',
    contactPerson: 'Laura Smith',
    phone: '555-0103'
  },
   {
    id: 'mkt-4',
    name: 'Mountain View Growers',
    location: 'Ridgecrest, CO',
    imageUrl: 'https://images.unsplash.com/photo-1621202283123-5a0e3a5a7b8e?q=80&w=1932&auto=format&fit=crop',
    commodities: ['Potatoes', 'Root Vegetables', 'Livestock'],
    description: 'A seasonal outdoor market that also facilitates livestock auctions. Best known for high-altitude potatoes and root vegetables.',
    contactPerson: 'Robert Brown',
    phone: '555-0104'
  },
];

const allCommodities = [...new Set(mockMarkets.flatMap(m => m.commodities))].sort();

const MarketplacePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCommodity, setSelectedCommodity] = useState('All');
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);

  const filteredMarkets = useMemo(() => {
    return mockMarkets.filter(market => {
      const nameMatch = market.name.toLowerCase().includes(searchTerm.toLowerCase());
      const commodityMatch = selectedCommodity === 'All' || market.commodities.includes(selectedCommodity);
      return nameMatch && commodityMatch;
    });
  }, [searchTerm, selectedCommodity]);
  
  if (selectedMarket) {
    return <MarketDetailsPage market={selectedMarket} onBack={() => setSelectedMarket(null)} />
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Explore Local Markets</h1>
      
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 p-4 bg-white dark:bg-gray-900 rounded-xl shadow-sm">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search market name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="text-gray-400" />
          </div>
        </div>
        <select
          value={selectedCommodity}
          onChange={(e) => setSelectedCommodity(e.target.value)}
          className="px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-green-500 focus:outline-none"
        >
          <option value="All">All Commodities</option>
          {allCommodities.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Market Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMarkets.map(market => (
          <div key={market.id} className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
            <img className="h-48 w-full object-cover" src={market.imageUrl} alt={market.name} />
            <div className="p-6 flex-grow flex flex-col">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">{market.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{market.location}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {market.commodities.slice(0, 3).map(c => (
                  <span key={c} className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">{c}</span>
                ))}
              </div>
              <div className="mt-auto">
                <Button onClick={() => setSelectedMarket(market)} className="w-full">View Details</Button>
              </div>
            </div>
          </div>
        ))}
        {filteredMarkets.length === 0 && (
            <p className="text-gray-500 md:col-span-2 lg:col-span-3 text-center">No markets found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default MarketplacePage;