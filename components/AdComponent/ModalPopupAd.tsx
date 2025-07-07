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
  background: "linear-gradient(135deg, #5ac8fa 0%, #007aff 100%)",
  borderRadius: theme.spacing(3),
  overflow: "visible",
  boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
}));

const ModalPopupAd = ({
  isOpen,
  onClose,
  AdComponent,
}: {
  isOpen: boolean;
  onClose: () => void;
  AdComponent: React.ReactNode;
}) => {
  const [adCount, setAdCount] = useState(5);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") setAdCount(0);

    if (adCount <= 0) return;

    const interval = setInterval(() => {
      setAdCount((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [adCount]);

  return (
    <>
      {/* 모달 팝업 */}
      <StyledModal
        open={isOpen}
        onClose={() => {
          if (adCount <= 0) onClose();
        }}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          sx: { backgroundColor: "rgba(0,0,0,0.7)" },
        }}
      >
        <Fade in={isOpen}>
          <ModalCard>
            {adCount > 0 ? (
              <IconButton
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  zIndex: 1,
                  color: "white",
                }}
              >
                {adCount}
              </IconButton>
            ) : (
              <IconButton
                onClick={onClose}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
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
            )}
            <CardContent sx={{ p: 4, textAlign: "center", color: "white" }}>
              {/* 아이콘 섹션 */}
              <Box
                sx={{ position: "relative", display: "inline-block", mt: 2 }}
              >
                {AdComponent}
              </Box>
            </CardContent>
          </ModalCard>
        </Fade>
      </StyledModal>
    </>
  );
};

export default ModalPopupAd;
