"use client";
import React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import { ArrowBack, Home, Search, AddBox, Person } from "@mui/icons-material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

// 테마 설정
const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#101a23",
      paper: "#223649",
    },
    primary: {
      main: "#0b72da",
    },
    text: {
      primary: "#ffffff",
      secondary: "#90adcb",
    },
  },
  typography: {
    fontFamily: ['"Space Grotesk"', '"Noto Sans"', "sans-serif"].join(","),
  },
});

// 상단 앱바
function Header() {
  return (
    <AppBar position="static" elevation={0} color="transparent">
      <Toolbar variant="dense">
        <IconButton edge="start" color="inherit">
          <ArrowBack />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, textAlign: "center" }}
        >
          영양 분석
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

// 배너 이미지
const Banner = styled(Box)(({ theme }) => ({
  backgroundImage:
    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA1AKpTS-MSLRHQ-Ix82SRNUxRYDAT0jnnC_MGem6J5vG0FgZNYR9pj171Eb0niiGhzbOkzeo3EmypD7i5I9V6pfnFhKRR4768AtAS6DRxu1YJq3SeoSckwagjuFgkyiUwZjAyCYm_QAfOWWtQjzvluQZcGD1eB0UP9OdonTDJfQlVLwnmvqLDsjwTCdCtbLYS6fZ_9ZBQUTNIZwSpGiD1J-4tfB510g_L3Op3tUhem8x8Si89svBsRS5AzjhdsiUCdYB4YmAnBpM0")',
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: 218,
  borderRadius: theme.breakpoints.up("sm") ? theme.shape.borderRadius : 0,
}));

// 영양 카드
function NutritionCard({ label, value }) {
  return (
    <Card elevation={0} sx={{ bgcolor: "background.paper", flex: "1 1 158px" }}>
      <CardContent>
        <Typography variant="body1" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="h4" fontWeight="bold">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}

// 주요 영양소 바 차트
function MacroDistribution() {
  return (
    <Box>
      <Typography variant="body1" color="text.primary" mb={1}>
        영양소 분포
      </Typography>
      <Grid container spacing={2} alignItems="flex-end" sx={{ minHeight: 180 }}>
        {[
          { label: "탄수화물", height: 70 },
          { label: "단백질", height: 70 },
          { label: "지방", height: 10 },
        ].map((item) => (
          <Grid key={item.label} size={4}>
            <Box
              sx={{
                bgcolor: "background.paper",
                height: `${item.height}%`,
                borderTop: "2px solid",
                borderColor: "secondary.main",
                width: "100%",
              }}
            />
            <Typography variant="caption" color="text.secondary" align="center">
              {item.label}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

// 100g당 상세 정보
function DetailTable({ items }) {
  return (
    <Grid container>
      {items.map(({ name, value }, idx) => (
        <Grid key={name} size={4}>
          <Box p={2}>
            <Typography variant="body2" color="text.secondary">
              {name}
            </Typography>
            <Typography variant="body2" color="text.primary">
              {value}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}

// 음식 분석 항목
function FoodItem({ name, carbs, protein, fats, score }) {
  const maxVal = 100; // 예시용
  const progress = (score / maxVal) * 100;

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      py={1}
    >
      <Box>
        <Typography variant="body1" noWrap>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          탄수화물: {carbs}g, 단백질: {protein}g, 지방: {fats}g
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" minWidth={88} ml={2}>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            flex: 1,
            bgcolor: "background.default",
            height: 8,
            borderRadius: 1,
          }}
        />
        <Typography variant="body2" ml={1}>
          {score}
        </Typography>
      </Box>
    </Box>
  );
}

// Bottom Navigation
function BottomNav() {
  const [value, setValue] = React.useState(0);
  return (
    <BottomNavigation
      value={value}
      showLabels={false}
      onChange={(e, newVal) => setValue(newVal)}
      sx={{
        bgcolor: "#182634",
        borderTop: "1px solid",
        borderColor: "background.paper",
      }}
    >
      <BottomNavigationAction icon={<Home />} />
      <BottomNavigationAction icon={<Search />} />
      <BottomNavigationAction icon={<AddBox />} />
      <BottomNavigationAction icon={<Person />} />
    </BottomNavigation>
  );
}

function NutritionAnalysis() {
  const details = [
    { name: "탄수화물", value: "20g" },
    { name: "단백질", value: "15g" },
    { name: "지방", value: "10g" },
    { name: "총 탄수화물", value: "40g" },
    { name: "총 단백질", value: "30g" },
    { name: "총 지방", value: "20g" },
  ];

  const foods = [
    { name: "구운 닭가슴살", carbs: 5, protein: 25, fats: 3, score: 25 },
    { name: "찐 브로콜리", carbs: 10, protein: 2, fats: 0.5, score: 10 },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box
        minHeight="100vh"
        display="flex"
        flexDirection="column"
        bgcolor="background.default"
      >
        <Header />
        <Container maxWidth="sm" sx={{ py: 2, flex: 1 }}>
          <Banner />
          <Box mt={2}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              영양 정보
            </Typography>
            <NutritionCard label="칼로리" value="350" />
          </Box>
          <Box mt={4}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              주요 영양소
            </Typography>
            <MacroDistribution />
          </Box>
          <Box mt={4}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              100g 당
            </Typography>
            <DetailTable items={details} />
          </Box>
          <Box mt={4}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              음식 분석
            </Typography>
            {foods.map((f) => (
              <FoodItem key={f.name} {...f} />
            ))}
          </Box>
        </Container>
        <BottomNav />
      </Box>
    </ThemeProvider>
  );
}

export default NutritionAnalysis;
