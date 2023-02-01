import DefaultLayout from "@/layouts/DefaultLayout/DefaultLayout";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Box } from "@mui/system";
import { useState } from "react";

export default function Home() {
  const [tabFormValue, setTabFormValue] = useState<"report-sick" | "outcome">("report-sick");
  return (
    <DefaultLayout>
      <Grid container sx={{ my: 2 }}>
        <Grid xs={12}>
          <Typography variant="h4" textAlign="center">
            OES Report Sick Format Generator (OES-RSFG)
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid xs={12}>
          <TabContext value={tabFormValue}>
            <Box sx={{ mx: { sm: 0, md: 2 } }}>
              <TabList
                onChange={(_, value) => {
                  setTabFormValue(value);
                }}
              >
                <Tab label="Report Sick" value="report-sick" />
                <Tab label="Outcome" value="Outcome" />
              </TabList>
              <TabPanel value="report-sick">Report Sick</TabPanel>
              <TabPanel value="outcome"></TabPanel>
            </Box>
          </TabContext>
        </Grid>
      </Grid>
    </DefaultLayout>
  );
}
