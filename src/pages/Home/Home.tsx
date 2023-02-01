import DefaultLayout from "@/layouts/DefaultLayout/DefaultLayout";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Divider, Tab, Typography, useMediaQuery, useTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Box } from "@mui/system";
import { useMemo, useState } from "react";

function ReportSickForm() {
  return (
    <Grid container>
      <Grid sm={12}>
        <Typography variant="h5">Personal Particulars</Typography>
        <Divider />
      </Grid>
    </Grid>
  );
}

function OutcomeForm() {
  return null;
}

declare interface FormTabPanelProps {
  children?: React.ReactNode;
  value: string;
}

function FormTabPanel({ children, value }: FormTabPanelProps) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  if (matches) {
    return (
      <TabPanel value={value} sx={{ px: 0 }}>
        {children}
      </TabPanel>
    );
  }
  return <TabPanel value={value}>{children}</TabPanel>;
}

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
                <Tab label="Outcome" value="outcome" />
              </TabList>
              <FormTabPanel value="report-sick">
                <ReportSickForm />
              </FormTabPanel>
              <FormTabPanel value="outcome">Hello</FormTabPanel>
            </Box>
          </TabContext>
        </Grid>
      </Grid>
    </DefaultLayout>
  );
}
