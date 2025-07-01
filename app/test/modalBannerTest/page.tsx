"use client";

import ModalPopupAd from "@/components/AdComponent/ModalPopupAd";
import { Box, Typography, Card, Button } from "@mui/material";
import { useState } from "react";

export default function TestPage() {
  const [open, setOpen] = useState(false);

  const data = [
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
      {/* 데모용 메인 콘텐츠 */}
      <Box sx={{ minHeight: "100vh", bgcolor: "grey.100", p: 4 }}>
        <Box sx={{ maxWidth: 800, mx: "auto" }}>
          <Typography variant="h3" component="h1" gutterBottom>
            웹사이트 메인 콘텐츠
          </Typography>
          <Card sx={{ p: 3 }}>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              이것은 메인 웹사이트 콘텐츠입니다. 2초 후에 모달 광고가
              나타납니다.
            </Typography>
            <Button
              variant="contained"
              onClick={() => setOpen(true)}
              sx={{ mt: 2 }}
            >
              팝업 다시 보기
            </Button>
          </Card>
        </Box>
      </Box>

      <ModalPopupAd open={open} onClose={() => setOpen(false)} />
    </>
  );
}
