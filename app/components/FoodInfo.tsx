"use client";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import GrainIcon from '@mui/icons-material/Grain';
import SetMealIcon from '@mui/icons-material/SetMeal';
import OpacityIcon from '@mui/icons-material/Opacity';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';

/** 위험도 표시용 아이콘 */
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';


interface FoodInfoType {
  name: string;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  description: string;
}

type MacroInput = {
  carb: number;    // 탄수화물 (g)
  protein: number; // 단백질 (g)
  fat: number;     // 지방 (g)
};

export function FoodInfo({ data }: { data: FoodInfoType }) {
  const stats = [
    { icon: <LocalFireDepartmentIcon sx={{ color: 'gray' }} />, name: 'Calories', value: `${data.calories} kcal` },
    { icon: <GrainIcon sx={{ color: 'gray' }} />, name: 'Carbohydrates', value: `${data.carbs} g` },
    { icon: <SetMealIcon sx={{ color: 'gray' }} />, name: 'Protein', value: `${data.protein} g` },
    { icon: <OpacityIcon sx={{ color: 'gray' }} />, name: 'Fat', value: `${data.fat} g` },
  ];
  const [score, setScore] = useState<number>(0);

  //탄단지 비율 평가
  function evaluateMacroScore({ carb, protein, fat }: MacroInput): {
    ratio: { carb: number; protein: number; fat: number };
    distance: number;
    score: number;
  } {
    const carbKcal = carb * 4;
    const proteinKcal = protein * 4;
    const fatKcal = fat * 9;
  
    const totalKcal = carbKcal + proteinKcal + fatKcal;
  
    if (totalKcal === 0) return {
      ratio: { carb: 0, protein: 0, fat: 0 },
      distance: 100,
      score: 0,
    };
  
    const ratio = {
      carb: (carbKcal / totalKcal) * 100,
      protein: (proteinKcal / totalKcal) * 100,
      fat: (fatKcal / totalKcal) * 100,
    };
  
    const target = { carb: 55, protein: 15, fat: 30 };
  
    // 유클리드 거리 계산
    const distance = Math.sqrt(
      Math.pow(ratio.carb - target.carb, 2) +
      Math.pow(ratio.protein - target.protein, 2) +
      Math.pow(ratio.fat - target.fat, 2)
    );
  
    // 최대 거리 (최악의 경우: 한쪽만 100%) → 대략 √((100-55)² + (0-15)² + (0-30)²) ≈ 55.9
    const maxDistance = Math.sqrt(45 ** 2 + 15 ** 2 + 30 ** 2); // ≈ 55.9
  
    // 점수화: 0점 ~ 100점
    const score = Math.max(0, Math.round((1 - distance / maxDistance) * 100));
  
    return {
      ratio,
      distance,
      score,
    };
  }

  function getHealthIcon(score: number) {
    if (score >= 80) return <CheckCircleIcon color="success" />;
    if (score >= 60) return <InfoIcon color="info" />;
    if (score >= 40) return <WarningIcon color="warning" />;
    return <ErrorIcon color="error" />;
  }
  
  useEffect(() => {
    const { ratio, score } = evaluateMacroScore({ carb: data.carbs, protein: data.protein, fat: data.fat });
    console.log('Macro ratio:', ratio);
    console.log('Macro score:', score);
    setScore(score);
  }, [data]);

  return (
    <Card>
      <CardHeader
        title={<Typography variant="h5" component="div" align="center">{data.name}</Typography>}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 2 }}>
          Nutritional information per 100g
        </Typography>
        <Table>
          <TableBody>
            {stats.map((stat) => (
              <TableRow key={stat.name}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {stat.icon}
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography sx={{ ml: 1 }}>{stat.name}</Typography>
                </TableCell>
                <TableCell align="right">{stat.value}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={3}>
                <Typography variant="body2" color="text.secondary" align="center">
                  Score : 
                  {score}
                  <br/>{getHealthIcon(score)}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
