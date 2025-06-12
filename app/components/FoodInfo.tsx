"use client";

import { FireIcon, ChartBarIcon, BoltIcon, CircleStackIcon } from '@heroicons/react/24/outline';

interface FoodInfoType {
  name: string;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
}

const StatRow = ({ icon, label, value, unit }: { icon: React.ReactNode, label: string, value: number, unit: string }) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
    <div className="flex items-center">
      {icon}
      <span className="ml-3 text-base text-gray-700 dark:text-gray-300">{label}</span>
    </div>
    <p className="text-base font-semibold text-gray-800 dark:text-white">{value}<span className="text-sm font-normal ml-1 text-gray-500 dark:text-gray-400">{unit}</span></p>
  </div>
);

export function FoodInfo({ data }: { data: FoodInfoType }) {
  const stats = [
    { icon: <FireIcon className="h-6 w-6 text-red-500" />, label: 'Calories', value: data.calories, unit: 'kcal' },
    { icon: <ChartBarIcon className="h-6 w-6 text-yellow-500" />, label: 'Carbs', value: data.carbs, unit: 'g' },
    { icon: <BoltIcon className="h-6 w-6 text-green-500" />, label: 'Protein', value: data.protein, unit: 'g' },
    { icon: <CircleStackIcon className="h-6 w-6 text-blue-500" />, label: 'Fat', value: data.fat, unit: 'g' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg p-6 w-full max-w-md animate-fade-in border border-gray-200 dark:border-gray-700">
      <h2 className="text-3xl font-bold text-center mb-2 text-gray-800 dark:text-white">{data.name}</h2>
      <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">Nutritional information per 100g</p>
      <div className="space-y-2">
        {stats.map((stat) => (
          <StatRow key={stat.label} {...stat} />
        ))}
      </div>
    </div>
  );
}
