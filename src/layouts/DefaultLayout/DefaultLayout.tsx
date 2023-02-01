import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Unstable_Grid2";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useContext } from "react";

import { ColorModeContext } from "@/App";
import { useTheme } from "@mui/material/styles";

export default function DefaultLayout() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <main>
      <Grid container spacing={0}>
        <Grid sm={12}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ mr: "auto" }}>
                OES-RSFG
              </Typography>
              <IconButton color="inherit" onClick={colorMode.toggleColorMode}>
                {theme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Toolbar>
          </AppBar>
        </Grid>
      </Grid>
    </main>
  );
}
