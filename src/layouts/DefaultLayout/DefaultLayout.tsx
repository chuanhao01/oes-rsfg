import AppBar from "@mui/material/AppBar";
import faviconUrl from "@/assets/favicon.png";
import Grid from "@mui/material/Unstable_Grid2";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useContext } from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";

import { ColorModeContext } from "@/App";
import { useTheme } from "@mui/material/styles";
import { Avatar } from "@mui/material";

export interface DefaultLayoutProps {
  children?: React.ReactNode;
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <main>
      <Grid container spacing={0}>
        <Grid xs={12}>
          <AppBar position="static">
            <Toolbar>
              <Link component={RouterLink} to="/">
                <Avatar sx={{ mr: 1 }} alt="MES Icon" src={faviconUrl} variant="square" />
              </Link>
              <Box sx={{ mr: "auto" }}>
                <Link component={RouterLink} to="/" color="inherit" underline="none">
                  <Typography variant="h6" component="div">
                    OES-RSFG
                  </Typography>
                </Link>
              </Box>
              <IconButton color="inherit" onClick={colorMode.toggleColorMode}>
                {theme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Toolbar>
          </AppBar>
        </Grid>
      </Grid>
      {children}
    </main>
  );
}
