
import React, { useState, useCallback } from 'react';
import Button from '../shared/Button';
import Spinner from '../shared/Spinner';
import { LeafIcon } from '../shared/icons/LeafIcon';
import { predictCropDisease } from '../../services/geminiService';
import { DiseasePrediction } from '../../types';

const fileToGenerativePart = (file: File): Promise<{ mimeType: string; data: string }> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = (e.target?.result as string).split('base64,')[1];
      resolve({
        mimeType: file.type,
        data: base64,
      });
    };
    reader.readAsDataURL(file);
  });
};

const ResultDisplay: React.FC<{ result: DiseasePrediction }> = ({ result }) => {
    const isHealthy = result.diseaseName.toLowerCase() === 'healthy';
    
    const severityColor = {
        Low: 'bg-yellow-100 text-yellow-800',
        Medium: 'bg-orange-100 text-orange-800',
        High: 'bg-red-100 text-red-800',
    };

    if(isHealthy) {
        return (
            <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700">
                <div className="flex items-center gap-3">
                    <div className="bg-green-100 dark:bg-green-800 p-2 rounded-full">
                        <LeafIcon className="h-6 w-6 text-green-500" />
                    </div>
                    <div>
                        <h4 className="font-bold text-lg text-green-800 dark:text-green-200">Healthy Plant!</h4>
                        <p className="text-sm text-green-700 dark:text-green-300">{result.description}</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            <div>
                <h4 className="font-bold text-xl text-gray-800 dark:text-white">{result.diseaseName}</h4>
                <div className="flex items-center gap-2 mt-1">
                     <span className={`px-2 py-1 text-xs font-semibold rounded-full ${severityColor[result.severity]}`}>{result.severity} Severity</span>
                     <span className="text-xs text-gray-500">(Confidence: {Math.round(result.confidence * 100)}%)</span>
                </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">{result.description}</p>
            <div>
                <h5 className="font-semibold text-md text-gray-700 dark:text-gray-200">Fertilizer Recommendation</h5>
                <p className="text-sm text-gray-600 dark:text-gray-300">{result.fertilizerRecommendation}</p>
            </div>
            <div>
                <h5 className="font-semibold text-md text-gray-700 dark:text-gray-200">Pesticide Recommendation</h5>
                <p className="text-sm text-gray-600 dark:text-gray-300">{result.pesticideRecommendation}</p>
            </div>
        </div>
    )
}

const CropHealthScanner: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DiseasePrediction | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null);
      setError(null);
    }
  };

  const handleScan = useCallback(async () => {
    if (!imageFile) return;
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      if (!process.env.API_KEY) {
        throw new Error("API_KEY is not configured. Please set the environment variable.");
      }
      const { data, mimeType } = await fileToGenerativePart(imageFile);
      const prediction = await predictCropDisease(data, mimeType);
      setResult(prediction);
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [imageFile]);
  
  const reset = () => {
    setImageFile(null);
    setPreviewUrl(null);
    setIsLoading(false);
    setError(null);
    setResult(null);
  }

  return (
    <div>
        {!previewUrl && (
            <div className="text-center p-4 border-2 border-dashed rounded-lg dark:border-gray-600">
                <label htmlFor="crop-image-upload" className="cursor-pointer">
                    <p className="text-gray-500">Click to upload an image of a crop leaf</p>
                    <input id="crop-image-upload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                    <Button as="span" className="mt-2">Select Image</Button>
                </label>
            </div>
        )}

        {previewUrl && (
            <div className="space-y-4">
                <img src={previewUrl} alt="Crop preview" className="rounded-lg w-full h-48 object-cover" />
                {isLoading ? (
                    <Spinner />
                ) : (
                    <div className="flex gap-2">
                        <Button onClick={handleScan} disabled={isLoading} className="w-full">
                            {isLoading ? 'Scanning...' : 'Scan for Diseases'}
                        </Button>
                        <Button onClick={reset} variant="secondary">Clear</Button>
                    </div>
                )}
            </div>
        )}

        {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
        {result && <div className="mt-4 pt-4 border-t dark:border-gray-700"><ResultDisplay result={result} /></div>}
    </div>
  );
};

export default CropHealthScanner;