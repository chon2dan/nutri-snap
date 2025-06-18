"use client";

import Typography from "@mui/material/Typography";
import {
  Avatar,
  Box,
  Button,
  Collapse,
  Grid,
  Paper,
  Slide,
  Stack,
  TableContainer,
  Tooltip,
} from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import InfoIcon from "@mui/icons-material/Info";
import { useEffect, useState } from "react";
import { FoodInfoType } from "@/types";
import { NutrientColors } from "@/css";

/** 위험도 표시용 아이콘 */
import NutrientRatioBar from "./NutrientRatioBar";
import { useResizeDetector } from "react-resize-detector";

export function FoodInfo({ data }: { data: FoodInfoType[] }) {
  const [open, setOpen] = useState(false);
  const [totalNutrient, setTotalNutrient] = useState({
    totalCarb: 0,
    totalProtein: 0,
    totalFat: 0,
    totalCalories: 0,
    totalEstimatedFoodWeight: 0,
  });

  const { width, ref } = useResizeDetector();

  const calculateTotalNutrientByEstimatedFoodWeight = (
    food: FoodInfoType[]
  ) => {
    return {
      totalCarb: Math.floor(
        Number(
          food.reduce(
            (total, item) =>
              total + (item.carbs * item.estimatedFoodWeight) / 100,
            0
          )
        )
      ),
      totalProtein: Math.floor(
        Number(
          food.reduce(
            (total, item) =>
              total + (item.protein * item.estimatedFoodWeight) / 100,
            0
          )
        )
      ),
      totalFat: Math.floor(
        Number(
          food.reduce(
            (total, item) =>
              total + (item.fat * item.estimatedFoodWeight) / 100,
            0
          )
        )
      ),
      totalCalories: Math.floor(
        Number(
          food.reduce(
            (total, item) =>
              total + (item.calories * item.estimatedFoodWeight) / 100,
            0
          )
        )
      ),
      totalEstimatedFoodWeight: Math.floor(
        Number(
          food.reduce((total, item) => total + item.estimatedFoodWeight, 0)
        )
      ),
    };
  };

  useEffect(() => {
    setTotalNutrient(calculateTotalNutrientByEstimatedFoodWeight(data));
  }, [data]);

  return (
    <>
      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Box sx={{ p: 2, bgcolor: "#f5f5f5" }}>
          {/* 아래로 슬라이드 오픈 버튼 */}
          {/* 🔘 토글 버튼 */}
          <Box textAlign="center">
            {/* 툴팁 아이콘과 문구 */}
            <Tooltip title="사진을 통해 분석한 음식의 무게, 열량 등의 영양정보를 보여줍니다.">
              <InfoIcon fontSize="small" color="primary" />
            </Tooltip>
          </Box>
          <Box textAlign="center" mb={2}>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setOpen((prev) => !prev)}
            >
              {open ? "총 영양 정보 접기" : "총 영양 정보 보기"}
            </Button>
          </Box>
          <Collapse in={open}>
            {/* 총 칼로리 그리드 */}
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                mb: 2,
                bgcolor: "#f9f9f9",
                border: "1px solid #d0d0d0",
                borderRadius: 2,
                boxShadow: 1, // 약한 그림자
              }}
            >
              {/* 사진으로 분석한 예상 음식 무게와 총 칼로리 확인하기 */}
              {/* <Typography variant="subtitle2" fontWeight="bold">
                사진으로 분석한 음식 무게에 대한 총 칼로리
              </Typography> */}
              <Typography variant="subtitle2" align="center" mb={1}>
                사진 속 음식의 예상 중량:{" "}
                {totalNutrient.totalEstimatedFoodWeight}g
              </Typography>
              {data.map((item) => (
                <Stack key={item.name} direction="row" justifyContent="center">
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
                      data: ["탄수화물", "단백질", "지방"],
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
                  height={300}
                  margin={{ top: 30, bottom: 30, left: 10, right: 10 }}
                  barLabel={(v) => `${v.value} g`}
                />
              </Box>
              <Typography
                variant="subtitle2"
                align="center"
                fontWeight="bold"
                color="#e65100"
              >
                🔥 총 예상 열량 : {totalNutrient.totalCalories}
                kcal
              </Typography>

              {/* <Stack direction="row" justifyContent="space-between" mb={1}>
                <Box textAlign="center" flex={1}>
                  <Typography
                    variant="body2"
                    color={NutrientColors.carbs}
                    fontWeight="medium"
                  >
                    탄
                  </Typography>
                  <Typography variant="body2">
                    {totalNutrient.totalCarb}g
                  </Typography>
                </Box>
                <Box textAlign="center" flex={1}>
                  <Typography
                    variant="body2"
                    color={NutrientColors.protein}
                    fontWeight="medium"
                  >
                    단
                  </Typography>
                  <Typography variant="body2">
                    {totalNutrient.totalProtein}g
                  </Typography>
                </Box>
                <Box textAlign="center" flex={1}>
                  <Typography
                    variant="body2"
                    color={NutrientColors.fat}
                    fontWeight="medium"
                  >
                    지
                  </Typography>
                  <Typography variant="body2">
                    {totalNutrient.totalFat}g
                  </Typography>
                </Box>
              </Stack> */}
              <Box textAlign={"center"} color="text.secondary">
                <Typography variant="caption">
                  * 사진으로 분석한 음식의 무게에 따른 영양정보입니다.
                  <br />
                  실제 음식의 무게와는 다를 수 있습니다.
                </Typography>
              </Box>
            </Paper>
          </Collapse>
          <Typography
            variant="subtitle1"
            align="center"
            sx={{ bgcolor: "#f5f5f5" }}
          >
            영양 정보 (per 100g)
          </Typography>
        </Box>
        <Stack spacing={2}>
          {data.map((item, index) => (
            <Box
              sx={{
                p: 2,
                border: "1px solid #e0e0e0",
                borderRadius: 2,
                bgcolor: "background.paper",
              }}
            >
              {/* 음식 이름 중앙정렬
              <Box textAlign="center" mb={1}>
                <Typography variant="subtitle2" fontWeight="bold">
                  {item.name}
                </Typography>
              </Box> */}
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
                    color="#e65100"
                    align="center"
                  >
                    🔥 {item.calories} kcal
                    <br />{" "}
                    <span
                      style={{
                        color: "grey",
                        fontSize: "small",
                        fontWeight: "normal",
                      }}
                    >
                      (per 100g)
                    </span>
                  </Typography>
                </Grid>
                <Grid size={8} alignItems="center" justifyContent="center">
                  <NutrientRatioBar
                    carbs={item.carbs}
                    fat={item.fat}
                    protein={item.protein}
                  />
                </Grid>
              </Grid>
              {/* 비율 그래프 */}
              {/* <Box mt={1}>
                <NutrientRatioBar
                  carbs={item.carbs}
                  fat={item.fat}
                  protein={item.protein}
                />
              </Box> */}
            </Box>
          ))}
        </Stack>
      </TableContainer>
    </>
  );
}

{
  /* <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="body2" align="center">
                  Name
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Stack alignItems="center" spacing={0.5}>
                  <LocalFireDepartmentIcon fontSize="small" color="error" />
                  <Typography variant="caption">Calories (kcal)</Typography>
                </Stack>
              </TableCell>
              <TableCell align="center">
                <Stack alignItems="center" spacing={0.5}>
                  <GrainIcon fontSize="small" color="secondary" />
                  <Typography variant="caption">Carbs (g)</Typography>
                </Stack>
              </TableCell>
              <TableCell align="center">
                <Stack alignItems="center" spacing={0.5}>
                  <SetMealIcon fontSize="small" color="success" />
                  <Typography variant="caption">Protein (g)</Typography>
                </Stack>
              </TableCell>
              <TableCell align="center">
                <Stack alignItems="center" spacing={0.5}>
                  <FastfoodIcon fontSize="small" color="warning" />
                  <Typography variant="caption">Fat (g)</Typography>
                </Stack>
              </TableCell>
              <TableCell align="center">
                <Typography variant="caption">Ratio</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.name} hover>
                <TableCell component="th" scope="row">
                  <Typography variant="body2">{item.name}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2">{item.calories}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2">{item.carbs}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2">{item.protein}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2">{item.fat}</Typography>
                </TableCell>
                <TableCell align="center">
                  <NutrientRatioBar
                    carbs={item.carbs}
                    fat={item.fat}
                    protein={item.protein}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table> */
}
