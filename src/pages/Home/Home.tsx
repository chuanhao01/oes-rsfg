import DefaultLayout from "@/layouts/DefaultLayout/DefaultLayout";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Divider, FormControlLabel, MenuItem, Radio, Tab, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useEffect, useState } from "react";
import { Formik, useField, useFormikContext } from "formik";
import { TextField, TextFieldProps } from "@/components/formik-mui";
import {
  checkContactNumber,
  checkLocation,
  checkMaskedNRIC,
  checkName,
  checkPlatform,
  checkRank,
} from "./validations";
import { armyRanks } from "@/constants";
import { TelInputField } from "@/components/formik-mui/TelInputField";
import { RadioGroup } from "@/components/formik-mui/RadioGroup";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

const reportSickOptions = { RSI: "RSI", RSO: "RSO", MA: "MA" };

interface FormatGeneratorFieldsI {
  rank: string;
  name: string;
  nric: string;
  contactNumber: string;
  platform: string;
  reportSickType: string;
  location: string;
}
type ReportSickLocationFieldProps = { defaultLocation?: string } & TextFieldProps;

function ReportSickLocationField({
  name,
  validate,
  defaultLocation,
  ...props
}: ReportSickLocationFieldProps) {
  const [customLocation, setCustomLocation] = useState("");

  const { values } = useFormikContext<FormatGeneratorFieldsI>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [field, _, helper] = useField({ name, validate });

  useEffect(() => {
    if (values.reportSickType === reportSickOptions.RSI) {
      helper.setValue(defaultLocation);
    } else {
      helper.setValue(customLocation);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.reportSickType]);

  return (
    <TextField
      name={name}
      disabled={values.reportSickType === reportSickOptions.RSI}
      onChange={(e) => {
        if (values.reportSickType !== reportSickOptions.RSI) {
          setCustomLocation(e.target.value);
        }
        field.onChange(e);
      }}
      {...props}
    />
  );
}

function ReportSickTab() {
  const reportSickTypes = [reportSickOptions.RSI, reportSickOptions.RSO, reportSickOptions.MA];

  return (
    <Grid container spacing={1}>
      <Grid xs={12}>
        <Typography variant="h5">Incident Details</Typography>
        <Divider />
      </Grid>
      <Grid xs={12}>
        <RadioGroup name="reportSickType" required={true} formLabel="You are going to:">
          {reportSickTypes.map((option) => (
            <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
          ))}
        </RadioGroup>
      </Grid>
      <Grid xs={12} lg={6}>
        <ReportSickLocationField
          required
          label="Location"
          fullWidth={true}
          name="location"
          defaultLocation="KRHH"
          validate={checkLocation}
        />
      </Grid>
      <Grid xs={12} lg={6}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          {/* TODO: Stopped at adding in dateTimer Picker */}
        </LocalizationProvider>
      </Grid>
    </Grid>
  );
}

function FormatGenerator() {
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

  const formatGeneratorFieldsInitalValues: FormatGeneratorFieldsI = {
    rank: "",
    name: "",
    nric: "",
    contactNumber: "+65",
    platform: "",
    reportSickType: reportSickOptions.RSI,
    location: "",
  };

  return (
    <Formik
      initialValues={formatGeneratorFieldsInitalValues}
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
              <ReportSickTab />
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
      <FormatGenerator />
    </DefaultLayout>
  );
}
