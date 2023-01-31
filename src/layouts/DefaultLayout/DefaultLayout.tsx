import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Unstable_Grid2";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function DefaultLayout() {
  return (
    <main>
      <Grid container spacing={0}>
        <Grid sm={12}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ mr: "auto" }}>
                OES-RSFG
              </Typography>
              <Button color="inherit">Login</Button>
            </Toolbar>
          </AppBar>
        </Grid>
      </Grid>
    </main>
  );
}
