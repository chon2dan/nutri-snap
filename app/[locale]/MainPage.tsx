"use client";

import React, { useState, useRef } from "react";
import { FoodInfoType } from "../../types";
import { useBackHandler } from "../../utils/hooks/useBackHandler";
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
import { Camera } from "../../components/CameraComponent/Camera";
import NavigationBar from "../../components/CommonComponent/NavigationBar";
import KakaoAdFitAd from "../../components/AdComponent/KakaoAdFitAd";
import { useNutriRouter } from "../../utils/hooks/useNutriRouter";
import { useTranslationWithDefault } from "@/utils/hooks/useTranslationWithDefault";

export default function MainPage() {
  const t = useTranslationWithDefault();
  const [image, setImage] = useState<string | null>(null);
  const foodInfoRef = useRef<FoodInfoType[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useNutriRouter();

  const handleImageSelect = (base64: string) => {
    setImage(base64);
    setError(null);
  };

  const resetState = () => {
    setImage(null);
    setError(null);
    setIsLoading(false);
  };

  const analyzeImage = async () => {
    if (!image) return;

    setIsLoading(true);
    setError(null);

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

      foodInfoRef.current = data;

      router.push("/foodinfo", {
        routeData: { foodInfo: data, image: image },
      });
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  useBackHandler(resetState);

  return (
    <>
      <NavigationBar onBack={image ? resetState : undefined} />
      <Divider sx={{ my: 2, borderBottomWidth: 0 }} />
      <Box sx={{ pb: "64px" }}>
        {!image && (
          <Typography
            variant="subtitle1"
            align="center"
            fontWeight="bold"
            mb={2}
            mt={1}
          >
            {t("mainpage.title.line1", "asdfasdf")}
            <br />
            {t("mainpage.title.line2", "asdfadsf")}
          </Typography>
        )}
        <Stack alignItems="center">
          {
            <Box sx={{ ml: 5, mr: 5, width: "90%" }}>
              <Camera onImageSelect={handleImageSelect} imagePreview={image} />
            </Box>
          }

          {image && !isLoading && (
            <Stack direction="column" spacing={2} sx={{ mt: 2 }}>
              <Button
                onClick={analyzeImage}
                disabled={isLoading}
                variant="contained"
                size="small"
                sx={{ width: "100%", fontSize: "1rem" }}
              >
                {t("mainpage.analyze_button", "")}
              </Button>
              <Link fontSize="small" align="center" onClick={resetState}>
                {t("mainpage.reselect_image", "")}
              </Link>
            </Stack>
          )}

          {isLoading && (
            <Stack direction="row" alignItems={"center"} mt={2}>
              <CircularProgress size={20} />
              <Typography variant="body2" sx={{ ml: 2 }}>
                {t("mainpage.analyzing_message", "")}
              </Typography>
            </Stack>
          )}

          {error && (
            <Alert severity="error" sx={{ width: "100%" }}>
              <AlertTitle>{t("mainpage.error_title", "")}</AlertTitle>
              {error}
            </Alert>
          )}
        </Stack>
      </Box>
      <Box sx={{ width: "100%", position: "fixed", bottom: 100 }}>
        <Typography variant="body2" align="center" color="text.secondary">
          {t("mainpage.contact_us", "")}
        </Typography>
        <Typography variant="body2" align="center" color="primary">
          nutri.snap.contact@gmail.com
        </Typography>
      </Box>
      <Box sx={{ width: "100%", position: "fixed", bottom: 0 }}>
        <KakaoAdFitAd />
      </Box>
    </>
  );
}
