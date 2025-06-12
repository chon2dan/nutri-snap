"use client";

import { useState } from 'react';
import { Camera } from './components/Camera';
import { FoodInfo } from './components/FoodInfo';

interface FoodInfoType {
  name: string;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
}

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [foodInfo, setFoodInfo] = useState<FoodInfoType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = (imgData: string) => {
    setImage(imgData);
    setFoodInfo(null);
    setError(null);
  };

  const handleCalculate = async () => {
    if (!image) return;

    setIsLoading(true);
    setError(null);
    setFoodInfo(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageData: image }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Server error' }));
        throw new Error(errorData.message || 'Failed to analyze image');
      }

      const data = await response.json();
      setFoodInfo(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const resetState = () => {
    setImage(null);
    setFoodInfo(null);
    setError(null);
    setIsLoading(false);
  };

  return (
    <main className="flex flex-col items-center min-h-screen bg-gray-50 dark:bg-black p-4 font-sans">
      <div className="w-full max-w-md mx-auto flex flex-col h-full pt-8">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 dark:text-white">Calorie</h1>
        </header>

        <div className="flex-grow flex flex-col justify-center space-y-6">
          {foodInfo ? (
            <FoodInfo data={foodInfo} />
          ) : (
            <Camera 
              onImageSelect={handleImageSelect} 
              imagePreview={image} 
              resetImage={() => setImage(null)}
            />
          )}

          {isLoading && (
            <div className="flex flex-col items-center justify-center p-8">
              <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
              <p className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">Calculating...</p>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-100 dark:bg-red-900/50 border border-red-400 dark:border-red-600 rounded-xl text-center">
              <p className="font-semibold text-red-700 dark:text-red-300">Error</p>
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}
        </div>

        <div className="mt-auto pb-8">
          {foodInfo || error ? (
            <button
              onClick={resetState}
              className="w-full px-4 py-4 bg-gray-600 text-white font-semibold rounded-xl hover:bg-gray-700 transition-colors shadow-lg disabled:opacity-50"
            >
              Try Again
            </button>
          ) : (
            <button
              onClick={handleCalculate}
              disabled={!image || isLoading}
              className="w-full px-4 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Calculating...' : 'Calculate'}
            </button>
          )}
           <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
            {foodInfo ? 'Calorie data has been added.' : 'Calorie data will be added.'}
          </p>
        </div>
      </div>
    </main>
  );
}
