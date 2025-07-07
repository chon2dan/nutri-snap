"use client";

import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  Collapse,
  Fab,
  Grid,
  IconButton,
  Paper,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { useEffect, useRef, useState } from "react";
import { FoodInfoType } from "@/types";
import { NutrientColors } from "@/css";
import NutrientRatioBar from "@/components/FoodComponent/NutrientRatioBar";
import { useResizeDetector } from "react-resize-detector";
import { calculateTotalNutrientByEstimatedFoodWeight } from "@/utils/util/foodUtil";
import KakaoAdFitAd from "@/components/AdComponent/KakaoAdFitAd";
import { useNutriRouter } from "@/utils/hooks/useNutriRouter";
import NavigationBar from "@/components/CommonComponent/NavigationBar";
import ShareButtonsBox from "@/components/ShareButtonComponent/ShareBox";
import { useScreenshotShare } from "@/utils/hooks/useScreenshotShare";
import ShareIcon from "@mui/icons-material/Share";
import ModalPopupAd from "@/components/AdComponent/ModalPopupAd";
import KakaoAdFitAdModal from "@/components/AdComponent/KakaoAdFitAdModal";
import { useTranslationWithDefault } from "@/utils/hooks/useTranslationWithDefault";

export function FoodInfoPage() {
  const { router, routeData } = useNutriRouter();
  const t = useTranslationWithDefault();

  const [nutriCollapseOpen, setNutriCollapseOpen] = useState(true);
  const [totalNutrient, setTotalNutrient] = useState({
    totalCarb: 0,
    totalProtein: 0,
    totalFat: 0,
    totalCalories: 0,
    totalEstimatedFoodWeight: 0,
  });
  const [foodInfoData, setFoodInfoData] = useState<FoodInfoType[]>([]);

  const [per100ToggleAlign, setPer100ToggleAlign] = useState<string | null>(
    "estimated"
  );

  const [isPer100, setIsPer100] = useState<"per100g" | "estimated">(
    "estimated"
  );

  const [modalOpen, setModalOpen] = useState(true);

  const handlePer100ToggleAlign = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    if (newAlignment !== null) {
      setPer100ToggleAlign(newAlignment);
      newAlignment === "per100g"
        ? setIsPer100("per100g")
        : setIsPer100("estimated");
    }
  };

  const { width, ref } = useResizeDetector();

  const totalNutritionRef = useRef<HTMLDivElement>(null);
  const foodImageRef = useRef<HTMLDivElement>(null);
  const { shareScreenshot } = useScreenshotShare();

  useEffect(() => {
    if (routeData) {
      setFoodInfoData(routeData.foodInfo);
      setTotalNutrient(
        calculateTotalNutrientByEstimatedFoodWeight(routeData.foodInfo)
      );
    }
  }, [routeData]);

  return (
    <>
      <ModalPopupAd
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        AdComponent={<KakaoAdFitAdModal />}
      />
      <NavigationBar onBack={() => router.back()} />
      <Box sx={{ pb: "64px" }}>
        {routeData?.image && (
          <Box
            sx={{
              pt: 2,
              pl: 2,
              pr: 2,
              mt: 1,
              width: "100%",
            }}
          >
            <Box ref={foodImageRef}>
              <img
                src={routeData.image}
                alt="Preview"
                style={{
                  width: "100%",
                  maxHeight: "300px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </Box>
          </Box>
        )}
        <Box
          ref={totalNutritionRef}
          sx={{ border: 5, borderColor: "transparent" }}
        >
          {/* 총 칼로리 그리드 */}
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              m: 1,
              mb: 2,
              bgcolor: "#f9f9f9",
              border: "1px solid #d0d0d0",
              borderRadius: 2,
              boxShadow: 1, // 약한 그림자
            }}
          >
            {/* 사진으로 분석한 예상 음식 무게와 총 칼로리 확인하기 */}
            <Typography
              variant="subtitle2"
              align="center"
              fontWeight="bold"
              color={NutrientColors.calories}
            >
              🔥 {t("foodinfo.total_calories")} : {totalNutrient.totalCalories}
              kcal
            </Typography>
            <Typography variant="subtitle2" align="center" mb={1} mt={1}>
              {t("foodinfo.total_weight")}:{" "}
              {totalNutrient.totalEstimatedFoodWeight}g
            </Typography>
            {foodInfoData?.map((item, index) => (
              <Stack key={index} direction="row" justifyContent="center">
                <Typography
                  variant="caption"
                  align="center"
                  color="text.secondary"
                >
                  {item.name} : {item.estimatedFoodWeight}g
                </Typography>
              </Stack>
            ))}

            {/* 총 탄수화물, 단백질, 지방 그리드 */}
            <Box sx={{ display: "flex", justifyContent: "center" }} ref={ref}>
              <BarChart
                resolveSizeBeforeRender
                xAxis={[
                  {
                    scaleType: "band",
                    data: [
                      t("foodinfo.carbs"),
                      t("foodinfo.protein"),
                      t("foodinfo.fat"),
                    ],
                    // @ts-ignore
                    categoryGapRatio: 0.4,
                    disableLine: true,
                    disableTicks: true,
                    colorMap: {
                      type: "ordinal",
                      colors: [
                        NutrientColors.carbs,
                        NutrientColors.protein,
                        NutrientColors.fat,
                      ],
                    },
                  },
                ]}
                yAxis={[
                  {
                    disableLine: true,
                    disableTicks: true,
                    tickLabelStyle: { display: "none" },
                  },
                ]}
                series={[
                  {
                    data: [
                      totalNutrient.totalCarb,
                      totalNutrient.totalProtein,
                      totalNutrient.totalFat,
                    ],
                  },
                ]}
                //화면 총 가로길이 * 30%
                width={width}
                height={200}
                margin={{ top: 10, bottom: 30, left: 10, right: 10 }}
                barLabel={(v) => `${v.value} g`}
                slotProps={{
                  barLabel: {
                    style: {
                      fill: "#e0e0e0", // 🌟 MUI 다크테마에 어울리는 밝은 텍스트 색상
                      fontSize: 14,
                      fontWeight: "bold",
                    },
                  },
                }}
              />
            </Box>
            <Box textAlign={"center"} color="text.secondary">
              <Typography variant="caption">
                * {t("foodinfo.total_weight_note1")}
                <br />
                {t("foodinfo.total_weight_note2")}
              </Typography>
            </Box>
          </Paper>
        </Box>
        {/* <ShareButtonsBox sx={{ mb: 2 }} /> */}
        <Box textAlign={"center"} mb={2}>
          <Fab
            size="large"
            color="primary"
            onClick={() => shareScreenshot([foodImageRef, totalNutritionRef])}
            sx={{ zIndex: 0 }}
          >
            <ShareIcon />
          </Fab>
        </Box>
        <Box textAlign={"center"} mb={2}>
          {t("foodinfo.share_message")}
        </Box>
        <Box textAlign={"center"} mb={1}>
          <Button
            variant="outlined"
            size="small"
            onClick={() => setNutriCollapseOpen((prev) => !prev)}
          >
            {nutriCollapseOpen
              ? t("foodinfo.collapse_open")
              : t("foodinfo.collapse_close")}
          </Button>
        </Box>
        <Collapse in={nutriCollapseOpen}>
          <ToggleButtonGroup
            value={per100ToggleAlign}
            exclusive
            onChange={handlePer100ToggleAlign}
            aria-label="text alignment"
            size="small"
            sx={{
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <ToggleButton value="estimated" aria-label="right">
              {t("foodinfo.expected_weight_info")}
            </ToggleButton>
            <ToggleButton value="per100g" aria-label="left">
              {t("foodinfo.per100g_info")}
            </ToggleButton>
          </ToggleButtonGroup>

          {foodInfoData?.map((item, index) => (
            <Box
              key={index}
              sx={{
                p: 2,
                m: 1,
                border: "1px solid #e0e0e0",
                borderRadius: 2,
                bgcolor: "background.paper",
              }}
            >
              {/* 칼로리 중앙 정렬 */}
              <Grid container spacing={2}>
                <Grid size={4} alignContent="center">
                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    align="center"
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    color={NutrientColors.calories}
                    align="center"
                  >
                    {isPer100 === "per100g"
                      ? `🔥 ${item.calories} kcal`
                      : `🔥 ${
                          (item.calories * item.estimatedFoodWeight) / 100
                        } kcal`}
                    <br />{" "}
                    <span
                      style={{
                        color: "grey",
                        fontSize: "small",
                        fontWeight: "normal",
                      }}
                    >
                      {isPer100 === "per100g"
                        ? "(per 100g)"
                        : `(${t("foodinfo.expected_weight")} ${
                            item.estimatedFoodWeight
                          }g)`}
                    </span>
                  </Typography>
                </Grid>
                <Grid size={8} alignItems="center" justifyContent="center">
                  <NutrientRatioBar foodInfo={item} isPer100={isPer100} />
                </Grid>
              </Grid>
            </Box>
          ))}
        </Collapse>
      </Box>
      {/* <Box sx={{ position: "fixed", bottom: 100 }}>
        <DraggableFab />
      </Box> */}

      <Box sx={{ width: "100%", position: "fixed", bottom: 0 }}>
        <KakaoAdFitAd />
      </Box>
    </>
  );
}
