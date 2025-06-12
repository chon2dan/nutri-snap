"use client";

import { useState, useRef, ChangeEvent } from 'react';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';

interface CameraProps {
  onImageSelect: (imageData: string) => void;
  imagePreview: string | null;
  resetImage: () => void;
}

export function Camera({ onImageSelect, imagePreview, resetImage }: CameraProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        onImageSelect(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    if (imagePreview) return;
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*, .heic, .heif"
        onChange={handleFileChange}
        className="sr-only"
        id="file-upload"
      />
      <div 
        className={`relative bg-white dark:bg-gray-800/50 rounded-2xl shadow-inner w-full aspect-square flex items-center justify-center text-center cursor-pointer group border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300`}
        onClick={handleUploadClick}
      >
        {imagePreview ? (
          <>
            <img src={imagePreview} alt="Selected food" className="rounded-xl w-full h-full object-cover" />
            <button 
              onClick={(e) => { 
                e.stopPropagation(); 
                resetImage(); 
              }}
              className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1.5 hover:bg-black/75 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center p-4">
            <ArrowUpTrayIcon className="h-12 w-12 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors" />
            <p className="mt-4 text-lg font-semibold text-gray-600 dark:text-gray-300">Upload your food image</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Tap to choose an image from your gallery</p>
          </div>
        )}
      </div>
    </div>
  );
}
