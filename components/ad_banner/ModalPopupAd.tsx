"use client";

import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton,
  Checkbox,
  FormControlLabel,
  Card,
  CardContent,
  Chip,
  Stack,
  Fade,
  Backdrop,
} from "@mui/material";
import {
  Close as CloseIcon,
  CardGiftcard as GiftIcon,
  Star as StarIcon,
  ArrowForward as ArrowForwardIcon,
} from "@mui/icons-material";
import { styled, keyframes } from "@mui/material/styles";

// 애니메이션 정의
const bounce = keyframes`
  0%, 20%, 53%, 80%, 100% {
    transform: translateY(0);
  }
  40%, 43% {
    transform: translateY(-15px);
  }
  70% {
    transform: translateY(-7px);
  }
  90% {
    transform: translateY(-3px);
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// 스타일드 컴포넌트
const StyledModal = styled(Modal)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(2),
}));

const ModalCard = styled(Card)(({ theme }) => ({
  position: "relative",
  maxWidth: 400,
  width: "100%",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  borderRadius: theme.spacing(3),
  overflow: "visible",
  boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
}));

const AnimatedGiftIcon = styled(GiftIcon)({
  animation: `${bounce} 2s infinite`,
  fontSize: "4rem",
  color: "#FFD700",
});

const AnimatedStarIcon = styled(StarIcon)({
  animation: `${rotate} 2s linear infinite`,
  fontSize: "1.5rem",
  color: "#FFE55C",
  position: "absolute",
  top: -8,
  right: -8,
});

const GradientBox = styled(Box)({
  background: "rgba(255,255,255,0.2)",
  backdropFilter: "blur(10px)",
  borderRadius: "12px",
  padding: "16px",
});

const ModalPopupAd = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [dontShowToday, setDontShowToday] = useState(false);

  const handleClose = () => {
    onClose();

    if (dontShowToday) {
      // 실제 환경에서는 localStorage 사용
      // const today = new Date().toDateString();
      // localStorage.setItem('hideAdToday', today);
    }
  };

  const handleCTAClick = () => {
    alert("광고 클릭! - 실제 환경에서는 링크 이동");
    handleClose();
  };

  return (
    <>
      {/* 모달 팝업 */}
      <StyledModal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          sx: { backgroundColor: "rgba(0,0,0,0.7)" },
        }}
      >
        <Fade in={open}>
          <ModalCard>
            {/* 닫기 버튼 */}
            <IconButton
              onClick={handleClose}
              sx={{
                position: "absolute",
                top: 16,
                right: 16,
                zIndex: 1,
                bgcolor: "rgba(255,255,255,0.2)",
                color: "white",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.3)",
                },
              }}
            >
              <CloseIcon />
            </IconButton>

            <CardContent sx={{ p: 4, textAlign: "center", color: "white" }}>
              {/* 아이콘 섹션 */}
              <Box
                sx={{ position: "relative", display: "inline-block", mb: 3 }}
              >
                <AnimatedGiftIcon />
                <AnimatedStarIcon />
              </Box>

              {/* 제목 */}
              <Typography
                variant="h4"
                component="h2"
                gutterBottom
                sx={{ fontWeight: "bold" }}
              >
                🎉 특별 할인 이벤트!
              </Typography>

              <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
                지금 가입하면{" "}
                <Box
                  component="span"
                  sx={{ fontWeight: "bold", color: "#FFD700" }}
                >
                  50% 할인
                </Box>
              </Typography>

              {/* 혜택 리스트 */}
              <GradientBox sx={{ mb: 3 }}>
                <Stack spacing={1}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 1,
                    }}
                  >
                    <Typography sx={{ color: "#4CAF50", fontWeight: "bold" }}>
                      ✓
                    </Typography>
                    <Typography variant="body2">무료 배송</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 1,
                    }}
                  >
                    <Typography sx={{ color: "#4CAF50", fontWeight: "bold" }}>
                      ✓
                    </Typography>
                    <Typography variant="body2">30일 무료 체험</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 1,
                    }}
                  >
                    <Typography sx={{ color: "#4CAF50", fontWeight: "bold" }}>
                      ✓
                    </Typography>
                    <Typography variant="body2">24시간 고객지원</Typography>
                  </Box>
                </Stack>
              </GradientBox>

              {/* CTA 버튼 */}
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={handleCTAClick}
                endIcon={<ArrowForwardIcon />}
                sx={{
                  mb: 2,
                  bgcolor: "white",
                  color: "primary.main",
                  fontWeight: "bold",
                  py: 1.5,
                  "&:hover": {
                    bgcolor: "grey.100",
                    transform: "scale(1.02)",
                  },
                  transition: "all 0.2s ease-in-out",
                }}
              >
                지금 시작하기
              </Button>

              {/* 하단 옵션들 */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={dontShowToday}
                      onChange={(e) => setDontShowToday(e.target.checked)}
                      sx={{
                        color: "white",
                        "&.Mui-checked": { color: "white" },
                      }}
                    />
                  }
                  label={
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>
                      오늘 하루 보지 않기
                    </Typography>
                  }
                />

                <Button
                  onClick={handleClose}
                  sx={{
                    color: "white",
                    opacity: 0.8,
                    textDecoration: "underline",
                    fontSize: "0.75rem",
                    "&:hover": {
                      backgroundColor: "transparent",
                      opacity: 1,
                    },
                  }}
                >
                  다음에 보기
                </Button>
              </Box>
            </CardContent>

            {/* 진행 표시줄 */}
            <Box sx={{ height: 4, bgcolor: "rgba(255,255,255,0.3)" }}>
              <Box
                sx={{
                  height: "100%",
                  width: "75%",
                  bgcolor: "#FFD700",
                  animation: "pulse 2s infinite",
                }}
              />
            </Box>
          </ModalCard>
        </Fade>
      </StyledModal>
    </>
  );
};

export default ModalPopupAd;
