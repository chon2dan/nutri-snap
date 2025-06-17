"use client";

import Typography from "@mui/material/Typography";
import {
  Avatar,
  Box,
  Button,
  Collapse,
  Paper,
  Slide,
  Stack,
  TableContainer,
  Tooltip,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useEffect, useState } from "react";
import { FoodInfoType } from "@/types";

/** 위험도 표시용 아이콘 */
import NutrientRatioBar from "./NutrientRatioBar";

export function FoodInfo({ data }: { data: FoodInfoType[] }) {
  const [open, setOpen] = useState(false);
  const nutrientColors = {
    carbs: "purple",
    protein: "green",
    fat: "red",
  };

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
    };
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Typography
          variant="subtitle1"
          align="center"
          sx={{ p: 2, bgcolor: "#f5f5f5" }}
        >
          영양 정보 (per 100g)
        </Typography>
        <Typography
          variant="subtitle1"
          align="left"
          sx={{ p: 2, bgcolor: "#f5f5f5" }}
        >
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
              <Typography variant="subtitle2" align="center">
                사진 속 음식의 예상 중량:{" "}
                {data.reduce(
                  (total, item) => total + item.estimatedFoodWeight,
                  0
                )}
                g
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
              <Typography
                variant="subtitle2"
                align="center"
                fontWeight="bold"
                color="#e65100"
                mb={1}
              >
                🔥 총 예상 열량 :{" "}
                {
                  calculateTotalNutrientByEstimatedFoodWeight(data)
                    .totalCalories
                }
                kcal
              </Typography>
              {/* 총 탄수화물, 단백질, 지방 그리드 */}
              <Stack direction="row" justifyContent="space-between" mb={1}>
                <Box textAlign="center" flex={1}>
                  <Typography
                    variant="body2"
                    color="purple"
                    fontWeight="medium"
                  >
                    탄
                  </Typography>
                  <Typography variant="body2">
                    {
                      calculateTotalNutrientByEstimatedFoodWeight(data)
                        .totalCarb
                    }
                    g
                  </Typography>
                </Box>
                <Box textAlign="center" flex={1}>
                  <Typography variant="body2" color="green" fontWeight="medium">
                    단
                  </Typography>
                  <Typography variant="body2">
                    {
                      calculateTotalNutrientByEstimatedFoodWeight(data)
                        .totalProtein
                    }
                    g
                  </Typography>
                </Box>
                <Box textAlign="center" flex={1}>
                  <Typography variant="body2" color="red" fontWeight="medium">
                    지
                  </Typography>
                  <Typography variant="body2">
                    {calculateTotalNutrientByEstimatedFoodWeight(data).totalFat}
                    g
                  </Typography>
                </Box>
              </Stack>
              <Box textAlign={"center"} color="text.secondary" mt={2}>
                <Typography variant="caption">
                  * 사진으로 분석한 음식의 무게에 따른 영양정보입니다.
                  <br />
                  실제 음식의 무게와는 다를 수 있습니다.
                </Typography>
              </Box>
            </Paper>
          </Collapse>
        </Typography>
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
              {/* 음식 이름 중앙정렬*/}
              <Box textAlign="center" mb={1}>
                <Typography variant="subtitle2" fontWeight="bold">
                  {item.name}
                </Typography>
              </Box>
              {/* 칼로리 중앙 정렬 */}
              <Box textAlign="center" mb={1}>
                <Typography
                  variant="subtitle2"
                  fontWeight="bold"
                  color="#e65100"
                >
                  {item.calories} kcal
                </Typography>
              </Box>

              {/* 탄/단/지 그리드 */}
              <Stack direction="row" justifyContent="space-between" mb={1}>
                <Box textAlign="center" flex={1}>
                  <Typography
                    variant="body2"
                    color="purple"
                    fontWeight="medium"
                  >
                    탄
                  </Typography>
                  <Typography variant="body2">{item.carbs}g</Typography>
                </Box>
                <Box textAlign="center" flex={1}>
                  <Typography variant="body2" color="green" fontWeight="medium">
                    단
                  </Typography>
                  <Typography variant="body2">{item.protein}g</Typography>
                </Box>
                <Box textAlign="center" flex={1}>
                  <Typography variant="body2" color="red" fontWeight="medium">
                    지
                  </Typography>
                  <Typography variant="body2">{item.fat}g</Typography>
                </Box>
              </Stack>

              {/* 비율 그래프 */}
              <Box mt={1}>
                <NutrientRatioBar
                  carbs={item.carbs}
                  fat={item.fat}
                  protein={item.protein}
                />
              </Box>
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
