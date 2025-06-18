import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
// import MenuIcon from "@mui/icons-material/Menu";

interface NavigationBarProps {
  foodInfo: any;
  onBack: () => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ foodInfo, onBack }) => (
  <AppBar position="sticky">
    <Toolbar variant="dense" sx={{ px: 1 }}>
      <Grid container sx={{ width: "100%" }}>
        <Grid size={4} sx={{ display: "flex", justifyContent: "flex-start" }}>
          {foodInfo && (
            <IconButton
              color="inherit"
              aria-label="back"
              onClick={onBack}
            >
              <ArrowBackIosIcon fontSize="small" />
            </IconButton>
          )}
        </Grid>
        <Grid size={4} sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h6" color="inherit" noWrap>
            NutriSnap
          </Typography>
        </Grid>
        <Grid size={4} sx={{ display: "flex", justifyContent: "flex-end" }}>
          {/* <IconButton color="inherit" aria-label="next">
            <MenuIcon fontSize="small" />
          </IconButton> */}
        </Grid>
      </Grid>
    </Toolbar>
  </AppBar>
);

export default NavigationBar;
