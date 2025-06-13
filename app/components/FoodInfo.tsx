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

interface FoodInfoType {
  name: string;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  description: string;
}

export function FoodInfo({ data }: { data: FoodInfoType }) {
  const stats = [
    { icon: <LocalFireDepartmentIcon sx={{ color: 'red' }} />, name: 'Calories', value: `${data.calories} kcal` },
    { icon: <GrainIcon sx={{ color: 'orange' }} />, name: 'Carbohydrates', value: `${data.carbs} g` },
    { icon: <SetMealIcon sx={{ color: 'green' }} />, name: 'Protein', value: `${data.protein} g` },
    { icon: <OpacityIcon sx={{ color: 'blue' }} />, name: 'Fat', value: `${data.fat} g` },
  ];

  return (
    <Card variant="outlined">
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
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
