"use client";

import React, { useState, useRef, useEffect } from "react";
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
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import LanguageIcon from "@mui/icons-material/Language";
import { KR, US } from "country-flag-icons/react/3x2";
import IconButton from "@mui/material/IconButton";
import { usePathname } from "next/navigation";
import getLocaleFromCookie from "@/utils/util/cookieUtil";

export default function MainPage() {
  const t = useTranslationWithDefault();
  const [image, setImage] = useState<string | null>(null);
  const foodInfoRef = useRef<FoodInfoType[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [locale, setLocale] = useState<string>("ko");
  //const locale = getLocaleFromCookie();

  const localeMenuOpen = Boolean(anchorEl);

  const router = useNutriRouter();
  const pathname = usePathname();
  const setLanguage = (locale: string) => {
    // 1. 쿠키 설정
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000`;

    // 2. 라우팅 변경 (현재 경로 유지하면서 locale prefix 변경)
    const segments = pathname.split("/");
    segments[1] = locale;
    const newPath = segments.join("/");
    router.push(newPath);
  };

  /** Locale 설정 */
  const localeHandleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const localeHandleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeLanguage = (locale: string) => {
    setLanguage(locale);
  };
  /** Locale 설정 */

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

  useEffect(() => {
    const locale = getLocaleFromCookie();
    setLocale(locale);
  }, []);

  useBackHandler(resetState);

  return (
    <>
      <NavigationBar onBack={image ? resetState : undefined} />
      <Divider sx={{ borderBottomWidth: 0 }} />
      {/* Language Switch */}
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton
          size="large"
          color="default"
          onClick={localeHandleClick}
          aria-controls={localeMenuOpen ? "language-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={localeMenuOpen ? "true" : undefined}
        >
          <LanguageIcon fontSize="small" />
          <Typography variant="body2">{locale.toUpperCase()}</Typography>
        </IconButton>
      </Box>
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
      {/* 언어 변경 메뉴리스트 */}
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        open={localeMenuOpen}
        onClose={localeHandleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={() => handleChangeLanguage("ko")}>
          <KR
            title="South Korea"
            style={{ width: "20px", marginRight: "5px" }}
          />
          <Typography variant="overline">KO</Typography>
        </MenuItem>
        <MenuItem onClick={() => handleChangeLanguage("en")}>
          <US
            title="United States"
            style={{ width: "20px", marginRight: "5px" }}
          />
          <Typography variant="overline">EN</Typography>
        </MenuItem>
      </Menu>
    </>
  );
}
