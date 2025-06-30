"use client";

import { Box, Typography, IconButton, Stack } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline"; // Kakao 대체 아이콘
import { useEffect } from "react";

const ShareButton = ({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) => (
  <Box display="flex" flexDirection="column" alignItems="center">
    <IconButton
      onClick={onClick}
      sx={{
        width: 64,
        height: 64,
        borderRadius: "50%",
        backgroundColor: "#4A90E2",
        color: "#FFFFFF",
        transition: "background-color 0.3s",
        "&:hover": {
          backgroundColor: "#6C8EBF",
        },
      }}
    >
      {icon}
    </IconButton>
    <Typography variant="caption" mt={1}>
      {label}
    </Typography>
  </Box>
);

export default function ShareButtonsBox({ sx }: { sx?: any }) {
  const handleShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    switch (platform) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${url}`,
          "_blank"
        );
        break;
      case "instagram":
        alert("Instagram은 링크 공유를 직접 지원하지 않습니다.");
        break;
      case "kakao":
        alert("KakaoTalk 공유는 Kakao SDK 연동이 필요합니다.");
        break;
    }
  };

  return (
    <Box textAlign="center" sx={{ ...sx }}>
      <Typography variant="subtitle1" mb={2}>
        공유하기
      </Typography>
      <Stack direction="row" justifyContent="center" spacing={4}>
        <ShareButton
          icon={<ChatBubbleOutlineIcon />}
          label="KakaoTalk"
          onClick={() => handleShare("kakao")}
        />
        <ShareButton
          icon={<InstagramIcon />}
          label="Instagram"
          onClick={() => handleShare("instagram")}
        />
        <ShareButton
          icon={<FacebookIcon />}
          label="Facebook"
          onClick={() => handleShare("facebook")}
        />
      </Stack>
    </Box>
  );
}
