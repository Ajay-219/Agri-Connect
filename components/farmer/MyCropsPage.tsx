import React, { useState } from 'react';
import { Crop, Expense, Sale } from '../../types';
import CropDetailsPage from './CropDetailsPage';
import Button from '../shared/Button';
import { XIcon } from '../shared/icons/XIcon';

const initialCrops: Crop[] = [
  {
    id: 'crop-1',
    name: 'Wheat',
    variety: 'Winter Red',
    plantingDate: '2023-11-01',
    expectedHarvest: '2024-06-15',
    expectedYield: '4 tons/acre',
    imageUrl: 'https://picsum.photos/seed/wheat/600/400',
    stages: [
      { name: 'Sowing', status: 'completed', duration: 1 },
      { name: 'Germination', status: 'completed', duration: 14 },
      { name: 'Vegetative', status: 'current', duration: 90 },
      { name: 'Flowering', status: 'upcoming', duration: 30 },
      { name: 'Harvest', status: 'upcoming', duration: 20 },
    ],
    commonPests: [
        { name: 'Aphids', description: 'Small sap-sucking insects.', prevention: 'Introduce ladybugs or use neem oil spray.' },
        { name: 'Hessian Fly', description: 'A small gnat whose larvae feed on wheat stems.', prevention: 'Use resistant varieties and delayed planting.' }
    ],
    commonDiseases: [
        { name: 'Powdery Mildew', description: 'A fungal disease that appears as white powdery spots on leaves and stems.', fertilizerRecommendation: 'Ensure balanced nutrition; avoid excess nitrogen.', pesticideRecommendation: 'Apply sulfur-based fungicides or potassium bicarbonate.' },
        { name: 'Stripe Rust', description: 'Fungus causing yellow-orange stripes on leaves.', fertilizerRecommendation: 'Maintain adequate potassium and phosphorus levels.', pesticideRecommendation: 'Use triazole or strobilurin fungicides at first sign of infection.' }
    ],
    expenses: [
        { id: 'exp1', date: '2023-11-01', description: 'Seed Purchase', category: 'Other', amount: 500 },
        { id: 'exp2', date: '2024-03-15', description: 'Nitrogen Application', category: 'Fertilizer', amount: 750 },
    ],
    sales: [
        { id: 'sale1', date: '2024-06-20', quantitySold: 4, pricePerUnit: 500, totalAmount: 2000 },
    ]
  },
  {
    id: 'crop-2',
    name: 'Corn',
    variety: 'Golden Bantam',
    plantingDate: '2024-04-10',
    expectedHarvest: '2024-07-20',
    expectedYield: '200 bushels/acre',
    imageUrl: 'https://picsum.photos/seed/corn/600/400',
    stages: [
      { name: 'Planting', status: 'completed', duration: 1 },
      { name: 'Germination', status: 'current', duration: 10 },
      { name: 'Tasseling', status: 'upcoming', duration: 40 },
      { name: 'Silking', status: 'upcoming', duration: 20 },
      { name: 'Harvest', status: 'upcoming', duration: 30 },
    ],
    commonPests: [
        { name: 'Corn Earworm', description: 'Larvae that feed on corn kernels.', prevention: 'Apply mineral oil to corn silks or use BT sprays.' },
        { name: 'Stalk Borer', description: 'Caterpillars that bore into stalks.', prevention: 'Control weeds around fields early in the season.' }
    ],
    commonDiseases: [
      { name: 'Gray Leaf Spot', description: 'Causes rectangular, tan lesions on leaves.', fertilizerRecommendation: 'Manage nitrogen application to avoid excessive canopy growth.', pesticideRecommendation: 'Apply fungicides like pyraclostrobin or azoxystrobin.' }
    ],
    expenses: [],
    sales: []
  },
];


const MyCropsPage: React.FC = () => {
    const [crops, setCrops] = useState<Crop[]>(initialCrops);
    const [selectedCropId, setSelectedCropId] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newCropData, setNewCropData] = useState({ name: '', variety: '', plantingDate: ''});

    const handleAddExpense = (cropId: string, newExpenseData: Omit<Expense, 'id' | 'date'>) => {
        const newExpense: Expense = {
            ...newExpenseData,
            id: `exp-${Date.now()}`,
            date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
        };

        setCrops(prevCrops => 
            prevCrops.map(crop => 
                crop.id === cropId 
                    ? { ...crop, expenses: [...crop.expenses, newExpense] }
                    : crop
            )
        );
    };

    const handleAddSale = (cropId: string, newSaleData: Omit<Sale, 'id' | 'date' | 'totalAmount'>) => {
        const newSale: Sale = {
            ...newSaleData,
            id: `sale-${Date.now()}`,
            date: new Date().toISOString().split('T')[0],
            totalAmount: newSaleData.quantitySold * newSaleData.pricePerUnit
        };

        setCrops(prevCrops =>
            prevCrops.map(crop =>
                crop.id === cropId
                    ? { ...crop, sales: [...crop.sales, newSale] }
                    : crop
            )
        );
    };

    const handleAdvanceStage = (cropId: string) => {
        setCrops(prevCrops => {
            return prevCrops.map(crop => {
                if (crop.id === cropId) {
                    const currentIndex = crop.stages.findIndex(s => s.status === 'current');
                    if (currentIndex !== -1 && currentIndex < crop.stages.length - 1) {
                        const newStages = [...crop.stages];
                        newStages[currentIndex] = { ...newStages[currentIndex], status: 'completed' };
                        newStages[currentIndex + 1] = { ...newStages[currentIndex + 1], status: 'current' };
                        return { ...crop, stages: newStages };
                    }
                }
                return crop;
            });
        });
    };
    
    const handleAddCrop = () => {
        if (!newCropData.name || !newCropData.variety || !newCropData.plantingDate) {
            alert('Please fill out all fields.');
            return;
        }

        const newCrop: Crop = {
            id: `crop-${Date.now()}`,
            ...newCropData,
            expectedHarvest: 'TBD',
            expectedYield: 'TBD',
            imageUrl: `https://picsum.photos/seed/${newCropData.name.toLowerCase()}/600/400`,
            stages: [
                { name: 'Planting', status: 'current', duration: 1 },
                { name: 'Germination', status: 'upcoming', duration: 10 },
                { name: 'Harvest', status: 'upcoming', duration: 60 },
            ],
            commonPests: [],
            commonDiseases: [],
            expenses: [],
            sales: []
        };
        setCrops([newCrop, ...crops]);
        setIsModalOpen(false);
        setNewCropData({ name: '', variety: '', plantingDate: '' });
    };

    const selectedCrop = crops.find(c => c.id === selectedCropId) || null;

    if (selectedCrop) {
        return <CropDetailsPage 
                    crop={selectedCrop} 
                    onBack={() => setSelectedCropId(null)} 
                    onAddExpense={handleAddExpense}
                    onAddSale={handleAddSale}
                    onAdvanceStage={handleAdvanceStage}
                />;
    }

    const calculateFinancials = (crop: Crop) => {
        const totalExpenses = crop.expenses.reduce((total, expense) => total + expense.amount, 0);
        const totalRevenue = crop.sales.reduce((total, sale) => total + sale.totalAmount, 0);
        const netProfit = totalRevenue - totalExpenses;
        return { totalExpenses, totalRevenue, netProfit };
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">My Crops</h1>
                <Button onClick={() => setIsModalOpen(true)}>Add New Crop</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {crops.map(crop => {
                    const { netProfit } = calculateFinancials(crop);
                    const profitColor = netProfit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
                    return (
                        <div key={crop.id} className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
                            <img className="h-48 w-full object-cover" src={crop.imageUrl} alt={crop.name} />
                            <div className="p-6 flex-grow flex flex-col">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">{crop.name}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{crop.variety}</p>
                                    <div className="text-sm text-gray-600 dark:text-gray-300">
                                        Current Stage: <span className="font-semibold text-blue-600 dark:text-blue-400">{crop.stages.find(s => s.status === 'current')?.name}</span>
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-300">
                                        Net Profit: <span className={`font-semibold ${profitColor}`}>${netProfit.toFixed(2)}</span>
                                    </div>
                                </div>
                                <div className="mt-auto pt-4">
                                    <Button onClick={() => setSelectedCropId(crop.id)} className="w-full">
                                        View Details
                                    </Button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            {/* Add Crop Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4">
                    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-md">
                        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Add New Crop</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                                <XIcon />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                             <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Crop Name</label>
                                <input 
                                    type="text" 
                                    placeholder="e.g., Tomato" 
                                    value={newCropData.name}
                                    onChange={(e) => setNewCropData({...newCropData, name: e.target.value})}
                                    className="mt-1 w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-green-500"
                                />
                             </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Variety</label>
                                <input 
                                    type="text" 
                                    placeholder="e.g., Roma" 
                                    value={newCropData.variety}
                                    onChange={(e) => setNewCropData({...newCropData, variety: e.target.value})}
                                    className="mt-1 w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-green-500"
                                />
                             </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Planting Date</label>
                                <input 
                                    type="date" 
                                    value={newCropData.plantingDate}
                                    onChange={(e) => setNewCropData({...newCropData, plantingDate: e.target.value})}
                                    className="mt-1 w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-green-500"
                                />
                             </div>
                        </div>
                        <div className="flex justify-end p-4 bg-gray-50 dark:bg-gray-800 border-t dark:border-gray-700 rounded-b-lg">
                            <Button onClick={() => setIsModalOpen(false)} variant="secondary" className="mr-2">Cancel</Button>
                            <Button onClick={handleAddCrop}>Save Crop</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyCropsPage;