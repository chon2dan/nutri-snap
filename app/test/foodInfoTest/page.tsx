"use client";

import { FoodInfoPage } from "@/app/foodinfo/FoodInfoPage";
import { Box } from "@mui/material";
import ddd from "@/pics/ddd.jpg";
import { useState } from "react";
import { useEffect } from "react";

export default function TestPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handle = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  const maxShift = 100; // 최대 이동량(px)
  const shift = Math.min(scrollY, maxShift);

  const data = [
    {
      calories: 50,
      carbs: 5,
      estimatedFoodWeight: 300,
      fat: 1,
      name: "닭고기 온면",
      protein: 5,
    },
    {
      calories: 50,
      carbs: 5,
      estimatedFoodWeight: 300,
      fat: 1,
      name: "닭고기 온면",
      protein: 5,
    },
    {
      calories: 50,
      carbs: 5,
      estimatedFoodWeight: 300,
      fat: 1,
      name: "닭고기 온면",
      protein: 5,
    },
    {
      calories: 50,
      carbs: 5,
      estimatedFoodWeight: 300,
      fat: 1,
      name: "닭고기 온면",
      protein: 5,
    },
    {
      calories: 50,
      carbs: 5,
      estimatedFoodWeight: 300,
      fat: 1,
      name: "닭고기 온면",
      protein: 5,
    },
  ];
  return (
    <>
      {/* 스크롤에 따라 이동하는 상단 이미지 */}
      <Box
        component="img"
        src={ddd.src}
        alt="Banner"
        sx={{
          width: "100%",
          height: 300,
          objectFit: "cover",
          borderRadius: 2,
          mt: 1,
        }}
      />
      <FoodInfoPage />
    </>
  );
}
