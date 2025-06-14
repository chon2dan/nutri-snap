'use client';

import { useState } from 'react';
import { Camera } from './components/Camera';
import { FoodInfo } from './components/FoodInfo';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { FoodInfoType } from '@/types';

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [foodInfo, setFoodInfo] = useState<FoodInfoType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = (base64: string) => {
    setImage(base64);
    setFoodInfo(null);
    setError(null);
  };

  const resetState = () => {
    setImage(null);
    setFoodInfo(null);
    setError(null);
    setIsLoading(false);
  };

  const analyzeImage = async () => {
    if (!image) return;

    setIsLoading(true);
    setError(null);
    setFoodInfo(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze image');
      }

      const data = await response.json();
      setFoodInfo(data);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4,
        }}
      >
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          NutriSnap
        </Typography>

        <Stack spacing={4} sx={{ width: '100%', alignItems: 'center' }}>
          { <Camera onImageSelect={handleImageSelect} imagePreview={image} />}

          {image && !foodInfo && !isLoading && (
            <Button
              onClick={analyzeImage}
              disabled={isLoading}
              variant="contained"
              size="small"
              sx={{ width: '100%', fontSize: '1rem' }}
            >
              Analyze Image
            </Button>
          )}

          {isLoading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <CircularProgress size={60} />
            </Box>
          )}

          {error && (
            <Alert severity="error" sx={{ width: '100%' }}>
              <AlertTitle>Error</AlertTitle>
              {error}
            </Alert>
          )}
          
          {foodInfo && <FoodInfo data={foodInfo} />}

          {(foodInfo || error) && (
            <Button
              onClick={resetState}
              variant="outlined"
              size="large"
              sx={{ width: '100%' }}
            >
              RESTART
            </Button>
          )}
        </Stack>
      </Box>
    </Container>
  );
}
