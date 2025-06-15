import {
  Card,
  CardContent,
  Typography,
  Stack,
  Divider,
  Box,
} from "@mui/material";
import NutrientRatioBar from "./NutrientRatioBar";
import { FoodInfoType } from "@/types";

export function FoodCard({ item }: { item: FoodInfoType[0] }) {
  return (
    <Card
      variant="outlined"
      sx={{
        height: "100%", // 부모 그리드에 맞춤
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          {item.name}
        </Typography>

        <Stack spacing={0.5}>
          <Typography variant="body2">
            Calories: {item.calories} kcal
          </Typography>
          <Typography variant="body2">Carbs: {item.carbs} g</Typography>
          <Typography variant="body2">Protein: {item.protein} g</Typography>
          <Typography variant="body2">Fat: {item.fat} g</Typography>
        </Stack>
      </CardContent>

      <Box sx={{ px: 2, pb: 2 }}>
        <Divider sx={{ mb: 1 }} />
        <NutrientRatioBar
          carbs={item.carbs}
          fat={item.fat}
          protein={item.protein}
        />
      </Box>
    </Card>
  );
}
