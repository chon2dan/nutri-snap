"use client";

import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import GrainIcon from "@mui/icons-material/Grain";
import SetMealIcon from "@mui/icons-material/SetMeal";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import { Paper, Stack, TableContainer, TableHead } from "@mui/material";
import { useEffect, useState } from "react";
import { FoodInfoType, MacroInput } from "@/types";

/** 위험도 표시용 아이콘 */
import NutrientRatioBar from "./NutrientRatioBar";
import { FoodCardList } from "./FoodCardList";

export function FoodInfo({ data }: { data: FoodInfoType }) {
  return (
    <>
      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Typography
          variant="subtitle1"
          align="center"
          sx={{ p: 2, bgcolor: "#f5f5f5" }}
        >
          Nutritional Information (per 100g)
        </Typography>
        <Table>
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
        </Table>
      </TableContainer>
    </>
  );
}
