"use client";

import { ChangeEvent, useRef } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Box, Typography } from '@mui/material';

interface CameraProps {
  onImageSelect: (base64: string) => void;
  imagePreview: string | null;
}

export function Camera({ onImageSelect, imagePreview }: CameraProps) {
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

  const triggerFileSelect = () => fileInputRef.current?.click();

  return (
    <Card
      variant="outlined"
      sx={{
        width: '100%',
        maxWidth: '500px',
        border: '2px grey' + (imagePreview ? 'dashed' : 'solid'),
        '&:hover': {
          borderColor: 'primary.main',
          cursor: 'pointer',
        },
        p: 2,
      }}
      onClick={triggerFileSelect}
    >
      <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 200 }}>
        {imagePreview ? (
          <Box sx={{ position: 'relative', width: '100%' }}>
            <img
              src={imagePreview}
              alt="Selected preview"
              style={{ width: '100%', height: '300px', borderRadius: '8px', objectFit: 'cover' }}
            />
          </Box>
        ) : (
          <Box sx={{ textAlign: 'center' }}>
            <PhotoCamera sx={{ fontSize: 60, color: 'text.secondary' }} />
            <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
              Click to upload an image
            </Typography>
          </Box>
        )}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*, .heic, .heif"
          style={{ display: 'none' }}
        />
      </CardContent>
    </Card>
  );
}
