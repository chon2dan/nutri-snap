// components/NutrientRatioBar.tsx

"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  LinearProgress,
  linearProgressClasses,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { NutrientColors } from "@/css";
import { FoodInfoType } from "@/types";
import { useTranslationWithDefault } from "@/utils/hooks/useTranslationWithDefault";

// 기준 비율 (%)
const TARGET_RATIO = {
  carbs: 0.4,
  fat: 0.3,
  protein: 0.3,
};

// Styled LinearProgress for individual nutrient
const NutrientBar = styled(LinearProgress, {
  shouldForwardProp: (prop) => prop !== "colorKey",
})<{ colorKey: "carbs" | "fat" | "protein" }>(({ colorKey }) => ({
  height: 8,
  borderRadius: 5,
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: NutrientColors[colorKey],
  },
  backgroundColor: "#e0e0e0",
}));

const getRatio = (value: number, total: number) =>
  total === 0 ? 0 : value / total;

export default function NutrientRatioBar({
  foodInfo,
  isPer100,
}: {
  foodInfo: FoodInfoType;
  isPer100: "per100g" | "estimated";
}) {
  const t = useTranslationWithDefault();
  const total = foodInfo.carbs + foodInfo.fat + foodInfo.protein;

  const ratios = {
    carbs: getRatio(foodInfo.carbs, total),
    fat: getRatio(foodInfo.fat, total),
    protein: getRatio(foodInfo.protein, total),
  };

  return (
    <Box p={1} borderBottom="1px solid #eee" alignItems="center">
      <Box display="flex" flexDirection="column" gap={1}>
        <Box>
          <Typography variant="caption" align="left" display="block">
            {t("foodinfo.carbs")}{" "}
            {isPer100 === "per100g"
              ? foodInfo.carbs
              : (foodInfo.carbs * foodInfo.estimatedFoodWeight) / 100}
            g
          </Typography>
          <NutrientBar
            variant="determinate"
            value={ratios.carbs * 100}
            colorKey="carbs"
          />
        </Box>
        <Box>
          <Typography variant="caption" align="left" display="block">
            {t("foodinfo.protein")}{" "}
            {isPer100 === "per100g"
              ? foodInfo.protein
              : (foodInfo.protein * foodInfo.estimatedFoodWeight) / 100}
            g
          </Typography>
          <NutrientBar
            variant="determinate"
            value={ratios.protein * 100}
            colorKey="protein"
          />
        </Box>
        <Box>
          <Typography variant="caption" align="left" display="block">
            {t("foodinfo.fat")}{" "}
            {isPer100 === "per100g"
              ? foodInfo.fat
              : (foodInfo.fat * foodInfo.estimatedFoodWeight) / 100}
            g
          </Typography>
          <NutrientBar
            variant="determinate"
            value={ratios.fat * 100}
            colorKey="fat"
          />
        </Box>
      </Box>
    </Box>
  );
}
