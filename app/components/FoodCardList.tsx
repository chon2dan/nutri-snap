import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Divider,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import GrainIcon from "@mui/icons-material/Grain";
import SetMealIcon from "@mui/icons-material/SetMeal";
import OilBarrelIcon from "@mui/icons-material/OilBarrel";
import { FoodInfoType } from "@/types";

export function FoodCardList({ data }: { data: FoodInfoType[] }) {
  return (
    <Box sx={{ flexGrow: 1, mt: 2 }}>
      <Grid container spacing={2}>
        {data.map((item) => (
          <Grid item xs={6} sm={4} md={4} key={item.name}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: 2,
                "&:hover": {
                  boxShadow: 6,
                  transform: "translateY(-4px)",
                  transition: "all 0.2s ease-in-out",
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  variant="h6"
                  component="h2"
                  gutterBottom
                  noWrap
                  sx={{
                    fontWeight: "bold",
                    fontSize: { xs: "1rem", sm: "1.25rem" },
                  }}
                >
                  {item.name}
                </Typography>

                <Stack spacing={1.5} mt={2}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box display="flex" alignItems="center" gap={1}>
                      <LocalFireDepartmentIcon color="error" />
                      <Typography variant="body2" color="text.secondary">
                        칼로리
                      </Typography>
                    </Box>
                    <Typography variant="body1" fontWeight="medium">
                      {item.calories}kcal
                    </Typography>
                  </Box>

                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box display="flex" alignItems="center" gap={1}>
                      <GrainIcon color="secondary" />
                      <Typography variant="body2" color="text.secondary">
                        탄수화물
                      </Typography>
                    </Box>
                    <Typography variant="body1" fontWeight="medium">
                      {item.carbs}g
                    </Typography>
                  </Box>

                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box display="flex" alignItems="center" gap={1}>
                      <SetMealIcon color="success" />
                      <Typography variant="body2" color="text.secondary">
                        단백질
                      </Typography>
                    </Box>
                    <Typography variant="body1" fontWeight="medium">
                      {item.protein}g
                    </Typography>
                  </Box>

                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box display="flex" alignItems="center" gap={1}>
                      <OilBarrelIcon color="warning" />
                      <Typography variant="body2" color="text.secondary">
                        지방
                      </Typography>
                    </Box>
                    <Typography variant="body1" fontWeight="medium">
                      {item.fat}g
                    </Typography>
                    {item.estimatedFoodWeight && (
                      <Typography variant="body2" color="text.secondary">
                        (추정 음식 무게: {item.estimatedFoodWeight}g)
                      </Typography>
                    )}
                    {/** 가로줄 추가 */}
                    <Divider sx={{ my: 1 }} />
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
