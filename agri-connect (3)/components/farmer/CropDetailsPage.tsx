import React, { useState, useMemo } from 'react';
import { Crop, Expense, Sale } from '../../types';
import Card from '../shared/Card';
import Button from '../shared/Button';
import { ArrowLeftIcon } from '../shared/icons/ArrowLeftIcon';
import CropHealthScanner from './CropHealthScanner';
import { LeafIcon } from '../shared/icons/LeafIcon';

interface CropDetailsPageProps {
  crop: Crop;
  onBack: () => void;
  onAddExpense: (cropId: string, newExpense: Omit<Expense, 'id' | 'date'>) => void;
  onAddSale: (cropId: string, newSale: Omit<Sale, 'id' | 'date' | 'totalAmount'>) => void;
  onAdvanceStage: (cropId: string) => void;
}

const StatCard: React.FC<{ label: string; value: string; }> = ({ label, value }) => (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
        <p className="text-lg font-bold text-gray-800 dark:text-white">{value}</p>
    </div>
);

const ExpenseTracker: React.FC<{ crop: Crop; onAddExpense: CropDetailsPageProps['onAddExpense'] }> = ({ crop, onAddExpense }) => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState<Expense['category']>('Other');
    
    const totalExpenses = crop.expenses.reduce((sum, exp) => sum + exp.amount, 0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const numAmount = parseFloat(amount);
        if (!description.trim() || isNaN(numAmount) || numAmount <= 0) {
            alert("Please enter a valid description and amount.");
            return;
        }
        onAddExpense(crop.id, { description, amount: numAmount, category });
        setDescription('');
        setAmount('');
        setCategory('Other');
    };

    return (
        <Card title="Expense Tracker">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6 pb-6 border-b dark:border-gray-700">
                <input 
                    type="text" 
                    placeholder="Description (e.g., Fertilizer)" 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="sm:col-span-2 w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-green-500"
                />
                 <input 
                    type="number" 
                    placeholder="Amount ($)" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-green-500"
                />
                 <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Expense['category'])}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-green-500"
                 >
                    <option>Labor</option>
                    <option>Fertilizer</option>
                    <option>Pesticide</option>
                    <option>Fuel</option>
                    <option>Other</option>
                 </select>
                 <Button type="submit" className="sm:col-span-4">Add Expense</Button>
            </form>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                {crop.expenses.length > 0 ? crop.expenses.map(exp => (
                    <div key={exp.id} className="flex justify-between items-center p-2 rounded-md bg-gray-50 dark:bg-gray-800">
                        <div>
                            <p className="font-semibold text-gray-800 dark:text-white">{exp.description}</p>
                            <p className="text-xs text-gray-500">{new Date(exp.date).toLocaleDateString()} - {exp.category}</p>
                        </div>
                        <p className="font-bold text-gray-900 dark:text-white">${exp.amount.toFixed(2)}</p>
                    </div>
                )) : <p className="text-center text-gray-500">No expenses logged yet.</p>}
            </div>
            
            <div className="flex justify-between items-center mt-4 pt-4 border-t dark:border-gray-700">
                <p className="font-bold text-md text-gray-800 dark:text-white">Total Expenses</p>
                <p className="font-bold text-md text-red-600 dark:text-red-400">${totalExpenses.toFixed(2)}</p>
            </div>
        </Card>
    );
};

const SalesTracker: React.FC<{ crop: Crop; onAddSale: CropDetailsPageProps['onAddSale'] }> = ({ crop, onAddSale }) => {
    const [quantitySold, setQuantitySold] = useState('');
    const [pricePerUnit, setPricePerUnit] = useState('');

    const totalRevenue = crop.sales.reduce((sum, sale) => sum + sale.totalAmount, 0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const numQuantity = parseFloat(quantitySold);
        const numPrice = parseFloat(pricePerUnit);
        if (isNaN(numQuantity) || numQuantity <= 0 || isNaN(numPrice) || numPrice <= 0) {
            alert("Please enter valid quantity and price.");
            return;
        }
        onAddSale(crop.id, { quantitySold: numQuantity, pricePerUnit: numPrice });
        setQuantitySold('');
        setPricePerUnit('');
    };

    return (
        <Card title="Sales Tracker">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 pb-6 border-b dark:border-gray-700">
                 <input 
                    type="number" 
                    placeholder="Quantity Sold" 
                    value={quantitySold}
                    onChange={(e) => setQuantitySold(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-green-500"
                />
                <input 
                    type="number" 
                    placeholder="Price per Unit ($)" 
                    value={pricePerUnit}
                    onChange={(e) => setPricePerUnit(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-green-500"
                />
                <Button type="submit" className="sm:col-span-3 sm:w-auto sm:place-self-end">Add Sale</Button>
            </form>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                {crop.sales.length > 0 ? crop.sales.map(sale => (
                    <div key={sale.id} className="flex justify-between items-center p-2 rounded-md bg-gray-50 dark:bg-gray-800">
                        <div>
                            <p className="font-semibold text-gray-800 dark:text-white">{`${sale.quantitySold} units @ $${sale.pricePerUnit.toFixed(2)}`}</p>
                            <p className="text-xs text-gray-500">{new Date(sale.date).toLocaleDateString()}</p>
                        </div>
                        <p className="font-bold text-gray-900 dark:text-white">${sale.totalAmount.toFixed(2)}</p>
                    </div>
                )) : <p className="text-center text-gray-500">No sales logged yet.</p>}
            </div>
            
            <div className="flex justify-between items-center mt-4 pt-4 border-t dark:border-gray-700">
                <p className="font-bold text-md text-gray-800 dark:text-white">Total Revenue</p>
                <p className="font-bold text-md text-green-600 dark:text-green-400">${totalRevenue.toFixed(2)}</p>
            </div>
        </Card>
    );
};


const ProfitSummary: React.FC<{ crop: Crop }> = ({ crop }) => {
    const totalExpenses = crop.expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const totalRevenue = crop.sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
    const netProfit = totalRevenue - totalExpenses;
    const profitColor = netProfit >= 0 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';

    return (
        <Card title="Profit Summary">
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <p className="text-gray-600 dark:text-gray-300">Total Revenue</p>
                    <p className="font-semibold text-green-600 dark:text-green-400">${totalRevenue.toFixed(2)}</p>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-gray-600 dark:text-gray-300">Total Expenses</p>
                    <p className="font-semibold text-red-600 dark:text-red-400">-${totalExpenses.toFixed(2)}</p>
                </div>
                <div className={`flex justify-between items-center p-3 rounded-lg mt-2 ${profitColor}`}>
                    <p className="font-bold text-lg">Net Profit</p>
                    <p className="font-bold text-lg">${netProfit.toFixed(2)}</p>
                </div>
            </div>
        </Card>
    );
};


const CropDetailsPage: React.FC<CropDetailsPageProps> = ({ crop, onBack, onAddExpense, onAddSale, onAdvanceStage }) => {
  
  const isLifecycleComplete = useMemo(() => {
    const currentIndex = crop.stages.findIndex(s => s.status === 'current');
    return currentIndex === -1 || currentIndex === crop.stages.length - 1;
  }, [crop.stages]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
         <Button onClick={onBack} variant="secondary" className="!p-2">
            <ArrowLeftIcon />
        </Button>
        <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{crop.name}</h1>
            <p className="text-gray-500 dark:text-gray-400">{crop.variety}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard label="Planting Date" value={new Date(crop.plantingDate).toLocaleDateString()} />
          <StatCard label="Expected Harvest" value={new Date(crop.expectedHarvest).toLocaleDateString()} />
          <StatCard label="Expected Yield" value={crop.expectedYield} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ExpenseTracker crop={crop} onAddExpense={onAddExpense} />
          <SalesTracker crop={crop} onAddSale={onAddSale} />
      </div>
      
      <ProfitSummary crop={crop} />

      <Card title="Crop Lifecycle">
          <div className="space-y-4">
            {crop.stages.map((stage, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
                      stage.status === 'completed' ? 'bg-green-500 text-white' : 
                      stage.status === 'current' ? 'bg-blue-500 text-white animate-pulse' : 
                      'bg-gray-200 dark:bg-gray-700 text-gray-500'
                    }`}>
                      {stage.status === 'completed' ? '✓' : index + 1}
                    </div>
                    <span className={`font-medium ${
                      stage.status === 'current' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
                    }`}>
                      {stage.name}
                    </span>
                </div>
                {stage.duration && (
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        ~{stage.duration} days
                    </span>
                )}
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t dark:border-gray-700 flex justify-center">
              <Button onClick={() => onAdvanceStage(crop.id)} disabled={isLifecycleComplete}>
                  {isLifecycleComplete ? 'Lifecycle Complete' : 'Advance to Next Stage'}
              </Button>
          </div>
        </Card>

        <Card title="Pest & Disease Intelligence">
            <div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Common Pests</h4>
                <div className="space-y-3">
                    {crop.commonPests.map(pest => (
                        <div key={pest.name} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <h5 className="font-bold text-md text-gray-800 dark:text-white">{pest.name}</h5>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{pest.description}</p>
                            <p className="text-sm text-green-700 dark:text-green-400 mt-2"><span className="font-semibold">Prevention:</span> {pest.prevention}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-6 border-t dark:border-gray-700 pt-4">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Common Diseases</h4>
                <div className="space-y-3">
                    {crop.commonDiseases.map(disease => (
                        <div key={disease.name} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <h5 className="font-bold text-md text-gray-800 dark:text-white">{disease.name}</h5>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{disease.description}</p>
                            <div className="mt-2 text-sm space-y-1 p-3 bg-gray-100 dark:bg-gray-700/50 rounded-md">
                                <p><span className="font-semibold text-blue-600 dark:text-blue-400">Fertilizer:</span> {disease.fertilizerRecommendation}</p>
                                <p><span className="font-semibold text-orange-600 dark:text-orange-400">Pesticide:</span> {disease.pesticideRecommendation}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Card>

        <Card title="Run a Health Scan" icon={<LeafIcon />}>
          <CropHealthScanner />
        </Card>
    </div>
  );
};

export default CropDetailsPage;