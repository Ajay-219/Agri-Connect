import React from 'react';
import Card from '../shared/Card';
import Button from '../shared/Button';

const mockListings = [
    { id: 'L001', crop: 'Organic Tomatoes', quantity: '500 kg', price: '$2.50/kg', status: 'Active' },
    { id: 'L002', crop: 'Sweet Corn', quantity: '1000 kg', price: '$1.80/kg', status: 'Active' },
    { id: 'L003', crop: 'Hass Avocados', quantity: '300 kg', price: '$4.00/kg', status: 'Pending' },
    { id: 'L004', crop: 'Strawberries', quantity: '200 kg', price: '$5.50/kg', status: 'Closed' },
];

const getStatusBadge = (status: string) => {
    switch(status) {
        case 'Active': return 'bg-green-100 text-green-800';
        case 'Pending': return 'bg-yellow-100 text-yellow-800';
        case 'Closed': return 'bg-gray-100 text-gray-800';
        default: return 'bg-gray-100 text-gray-800';
    }
}

const ActionButton: React.FC<{onClick: () => void, children: React.ReactNode, className?: string}> = ({onClick, children, className}) => (
    <button onClick={onClick} className={`px-2.5 py-1.5 text-xs font-semibold rounded-md transition-colors duration-200 ${className}`}>
        {children}
    </button>
);

const MarketListings: React.FC = () => {
  
  const handleEdit = (id: string) => {
    console.log(`Editing listing ${id}`);
    // Placeholder for edit functionality
  };

  const handleDelete = (id: string) => {
    console.log(`Deleting listing ${id}`);
    // Placeholder for delete functionality
  };

  const handleViewOffers = (id: string) => {
    console.log(`Viewing offers for listing ${id}`);
    // Placeholder for view offers functionality
  };
  
  return (
    <Card title="My Market Listings">
      <div className="flex justify-end mb-4">
        <Button>Create New Listing</Button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Crop</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {mockListings.map((listing) => (
              <tr key={listing.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{listing.crop}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{listing.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{listing.price}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(listing.status)}`}>
                    {listing.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <div className="flex items-center justify-end gap-2">
                        <ActionButton onClick={() => handleViewOffers(listing.id)} className="bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/50 dark:text-green-300 dark:hover:bg-green-900/80">
                            View Offers
                        </ActionButton>
                        <ActionButton onClick={() => handleEdit(listing.id)} className="bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:hover:bg-blue-900/80">
                            Edit
                        </ActionButton>
                        <ActionButton onClick={() => handleDelete(listing.id)} className="bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/50 dark:text-red-300 dark:hover:bg-red-900/80">
                            Delete
                        </ActionButton>
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default MarketListings;