
import React, { useState, useMemo } from 'react';
import Card from '../shared/Card';
import { CropStage } from '../../types';
import Button from '../shared/Button';

const initialCropStages: CropStage[] = [
  { name: 'Sowing', status: 'completed' },
  { name: 'Germination', status: 'completed' },
  { name: 'Vegetative', status: 'current' },
  { name: 'Flowering', status: 'upcoming' },
  { name: 'Harvest', status: 'upcoming' },
];

const CropLifecycleTracker: React.FC = () => {
  const [stages, setStages] = useState<CropStage[]>(initialCropStages);

  const handleAdvanceStage = () => {
    setStages(prevStages => {
      const currentIndex = prevStages.findIndex(s => s.status === 'current');
      if (currentIndex !== -1 && currentIndex < prevStages.length - 1) {
        const newStages = [...prevStages];
        newStages[currentIndex] = { ...newStages[currentIndex], status: 'completed' };
        newStages[currentIndex + 1] = { ...newStages[currentIndex + 1], status: 'current' };
        return newStages;
      }
      return prevStages;
    });
  };

  const nextStage = useMemo(() => {
    const currentIndex = stages.findIndex(s => s.status === 'current');
    if (currentIndex !== -1 && currentIndex < stages.length - 1) {
        return stages[currentIndex + 1].name;
    }
    return null;
  }, [stages]);

  const isComplete = !stages.some(s => s.status === 'current' || s.status === 'upcoming');

  return (
    <Card title="Wheat Crop Lifecycle">
      <div className="space-y-4">
        {stages.map((stage, index) => (
          <div key={index} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 transition-all duration-500 ${
              stage.status === 'completed' ? 'bg-green-500 text-white' : 
              stage.status === 'current' ? 'bg-blue-500 text-white ring-4 ring-blue-500/50 animate-pulse' : 
              'bg-gray-200 dark:bg-gray-700 text-gray-500'
            }`}>
              {stage.status === 'completed' ? '✓' : index + 1}
            </div>
            <span className={`font-medium transition-colors duration-300 ${
              stage.status === 'current' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
            }`}>
              {stage.name}
            </span>
          </div>
        ))}
      </div>
      
      {nextStage ? (
        <p className="text-xs text-center text-gray-500 mt-4">Next stage: {nextStage} in ~2 weeks.</p>
      ) : (
        <p className="text-xs text-center font-semibold text-green-600 mt-4">
          {isComplete ? 'Harvest Complete!' : 'Final Stage: Harvest'}
        </p>
      )}

      <div className="mt-4 pt-4 border-t dark:border-gray-700 flex justify-center">
          <Button onClick={handleAdvanceStage} disabled={!nextStage}>
              Advance Stage
          </Button>
      </div>
    </Card>
  );
};

export default CropLifecycleTracker;
