"use client";

import { FoodInfoType } from "@/types";
import { useBackHandler } from "@/utils/hooks/useBackHandler";
import {
  Divider,
  Box,
  Typography,
  Stack,
  Button,
  CircularProgress,
  Alert,
  AlertTitle,
} from "@mui/material";
import Link from "@mui/material/Link";
import { useState } from "react";
import { Camera } from "@/app/components/CameraComponent/Camera";
import { FoodInfo } from "@/app/components/FoodComponent/FoodInfo";
import NavigationBar from "@/app/components/CommonComponent/NavigationBar";
import KakaoAdFitAd from "@/app/components/AdComponent/KakaoAdFitAd";

export default function MainComponent() {
  const [image, setImage] = useState<string | null>(null);
  const [foodInfo, setFoodInfo] = useState<FoodInfoType[] | null>(null);
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
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to analyze image");
      }

      const data = await response.json();
      setFoodInfo(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useBackHandler(resetState);

  return (
    <>
      <NavigationBar foodInfo={foodInfo} onBack={resetState} />
      <Divider sx={{ my: 2, borderBottomWidth: 0 }} />
      <Box sx={{ pb: "64px" }}>
        {!image && (
          <Typography
            variant="subtitle1"
            align="center"
            fontWeight="bold"
            mb={2}
          >
            음식 이미지를 업로드하여
            <br /> 사진 속 음식의 영양 정보를 확인해보세요!
          </Typography>
        )}
        <Stack alignItems="center">
          {
            <Box sx={{ ml: 5, mr: 5, width: "90%" }}>
              <Camera onImageSelect={handleImageSelect} imagePreview={image} />
            </Box>
          }

          {image && !foodInfo && !isLoading && (
            <Stack direction="column" spacing={2} sx={{ mt: 2 }}>
              <Button
                onClick={analyzeImage}
                disabled={isLoading}
                variant="contained"
                size="small"
                sx={{ width: "100%", fontSize: "1rem" }}
              >
                분석하기
              </Button>
              <Link fontSize="small" align="center" onClick={resetState}>
                이미지 다시 선택
              </Link>
            </Stack>
          )}

          {isLoading && (
            <Stack direction="row" alignItems={"center"} mt={2}>
              <CircularProgress size={20} />
              <Typography variant="body2" sx={{ ml: 2 }}>
                이미지의 음식을 분석하고 있어요...
              </Typography>
            </Stack>
          )}

          {error && (
            <Alert severity="error" sx={{ width: "100%" }}>
              <AlertTitle>Error</AlertTitle>
              {error}
            </Alert>
          )}
        </Stack>
        {foodInfo && <FoodInfo data={foodInfo} />}
      </Box>
      {!foodInfo && (
        <Box sx={{ width: "100%", position: "fixed", bottom: 100 }}>
          <Typography variant="body2" align="center" color="text.secondary">
            문의 / Contact us
          </Typography>
          <Typography variant="body2" align="center" color="primary">
            nutri.snap.contact@gmail.com
          </Typography>
        </Box>
      )}
      <Box sx={{ width: "100%", position: "fixed", bottom: 0 }}>
        <KakaoAdFitAd />
      </Box>
    </>
  );
}
