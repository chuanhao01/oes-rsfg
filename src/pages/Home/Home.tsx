import DefaultLayout from "@/layouts/DefaultLayout/DefaultLayout";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Divider,
  FormControlLabel,
  MenuItem,
  Radio,
  Tab,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Box } from "@mui/system";
import { useState } from "react";
import { useFormik, Formik, Form, useField, useFormikContext } from "formik";
import { TextField } from "@/components/formik-mui";
import {
  checkContactNumber,
  checkMaskedNRIC,
  checkName,
  checkPlatform,
  checkRank,
} from "./validations";
import { armyRanks } from "@/constants";
import { TelInputField } from "@/components/formik-mui/TelInputField";
import { RadioGroup } from "@/components/formik-mui/RadioGroup";

function ReportSickFormatGenerator() {
  const reportSickOptions = ["RSI", "RSO", "MA"];
  const selectRankValues = [
    { value: "", label: "" },
    ...[
      armyRanks.REC,
      armyRanks.PTE,
      armyRanks.LCP,
      armyRanks.CPL,
      armyRanks.CFC,
      armyRanks._3SG,
      armyRanks.ME1T,
      armyRanks.ME1,
      armyRanks.ME2,
      armyRanks.ME3,
    ].map((armyRank) => ({
      value: armyRank.abbreviation,
      label: `${armyRank.word} (${armyRank.abbreviation})`,
    })),
  ];

  const [tabFormValue, setTabFormValue] = useState<"report-sick" | "outcome">("report-sick");

  return (
    <Formik
      initialValues={{
        rank: "",
        name: "",
        nric: "",
        contactNumber: "+65",
        platform: "",
        reportSickType: "RSI",
      }}
      onSubmit={() => {
        // Does nothing, no submit for this
      }}
    >
      <Grid container sx={{ mx: { sm: 0, lg: 2 } }} spacing={1}>
        <Grid xs={12}>
          <Typography variant="h5">Personal Particulars</Typography>
          <Divider />
        </Grid>
        <Grid xs={12} lg={3}>
          <TextField select required name="rank" validate={checkRank} label="Rank" fullWidth={true}>
            {selectRankValues.map((rank) => (
              <MenuItem key={rank.value} value={rank.value}>
                {rank.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid xs={12} lg={6}>
          <TextField required name="name" validate={checkName} label="Name" fullWidth={true} />
        </Grid>
        <Grid xs={12} lg={3}>
          <TextField
            required
            name="nric"
            validate={checkMaskedNRIC}
            label="Masked NRIC"
            fullWidth={true}
            helperText={"In the format of TXXXX123A"}
          />
        </Grid>
        <Grid xs={12} lg={6}>
          <TelInputField
            required
            name="contactNumber"
            validate={checkContactNumber}
            fullWidth={true}
          />
        </Grid>
        <Grid xs={12} lg={6}>
          <TextField
            required
            name="platform"
            validate={checkPlatform}
            label="Platform"
            fullWidth={true}
          />
        </Grid>
        <Grid xs={12}>
          <TabContext value={tabFormValue}>
            <TabList
              onChange={(_, value) => {
                setTabFormValue(value);
              }}
            >
              <Tab label="Report Sick" value="report-sick" />
              <Tab label="Outcome" value="outcome" />
            </TabList>
            <TabPanel value="report-sick">
              <Grid container spacing={1}>
                <Grid xs={12}>
                  <Typography variant="h5">Incident Details</Typography>
                  <Divider />
                </Grid>
                <Grid xs={12}>
                  <RadioGroup name="reportSickType" required={true} formLabel="You are going to:">
                    {reportSickOptions.map((option) => (
                      <FormControlLabel
                        key={option}
                        value={option}
                        control={<Radio />}
                        label={option}
                      />
                    ))}
                  </RadioGroup>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value="outcome"></TabPanel>
          </TabContext>
        </Grid>
      </Grid>
    </Formik>
  );
}

export default function Home() {
  return (
    <DefaultLayout>
      <Grid container sx={{ my: 2 }}>
        <Grid xs={12}>
          <Typography variant="h4" textAlign="center">
            OES Report Sick Format Generator (OES-RSFG)
          </Typography>
        </Grid>
      </Grid>
      <ReportSickFormatGenerator />
    </DefaultLayout>
  );
}
