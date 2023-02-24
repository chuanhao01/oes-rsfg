import { TextField, TextFieldProps } from "@/components/formik-mui";
import { DatePicker } from "@/components/formik-mui/DatePicker";
import { DateTimePicker } from "@/components/formik-mui/DateTimePicker";
import { RadioGroup } from "@/components/formik-mui/RadioGroup";
import { TelInputField } from "@/components/formik-mui/TelInputField";
import { armyRanks } from "@/constants";
import DefaultLayout from "@/layouts/DefaultLayout/DefaultLayout";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Button,
  Divider,
  FormControlLabel,
  Link,
  MenuItem,
  Radio,
  Tab,
  TextField as MuiTextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Box } from "@mui/system";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { FieldArray, Formik, useField, useFormikContext } from "formik";
import { Moment } from "moment";
import moment from "moment-timezone";
import React, { useEffect, useMemo, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  checkContactNumber,
  checkLocation,
  checkMaskedNRIC,
  checkMCNumber,
  checkName,
  checkPlatform,
  checkRank,
  checkReason,
  checkStatus,
  checkStatusDays,
} from "./validations";

const reportSickOptions = { RSI: "RSI", RSO: "RSO", MA: "MA" };

interface FormatGeneratorFieldsI {
  rank: string;
  name: string;
  nric: string;
  contactNumber: string;
  platform: string;
  reportSickType: "RSI" | "RSO" | "MA";
  location: string;
  dateTime: Moment;
  reason: string;
  obtainMedication: "true" | "false";
  obtainStatuses: "true" | "false";
  statuses: { status: string; days: string; startDate: Moment }[];
  mcNumber: string;
  swabTest: "true" | "false";
  swabTestResult: "true" | "false";
  updateESS: "true" | "false" | "N/A";
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

function ReportSickTextArea() {
  const { values } = useFormikContext<FormatGeneratorFieldsI>();

  const copyMessage = useMemo(() => {
    return `
Dear Sirs/Ma'am,

*<< ${values.nric} / ${values.rank} ${values.name} / ${values.contactNumber} >>* from << *${
      values.platform
    }* >> is RSI at << *${values.location}* >> on << *${values.dateTime.format(
      "DDMMYYYY HHmm"
    )}* >> for << *${values.reason}* >>.

For your update and information.
`.trim();
  }, [
    values.nric,
    values.rank,
    values.name,
    values.contactNumber,
    values.platform,
    values.location,
    values.dateTime,
    values.reason,
  ]);

  return (
    <>
      <Typography variant="h5" sx={{ my: 1 }}>
        Output Message:{" "}
      </Typography>
      <MuiTextField disabled multiline value={copyMessage} rows={5} sx={{ width: 1, my: 1 }} />
      <Button
        variant="contained"
        onClick={() => {
          navigator.clipboard.writeText(copyMessage);
          window.alert("Message is copied onto your clipboard.");
        }}
      >
        Copy
      </Button>
    </>
  );
}

function ReportSickTab() {
  const reportSickTypes = [reportSickOptions.RSI, reportSickOptions.RSO, reportSickOptions.MA];

  return (
    <Grid container spacing={1}>
      <Grid xs={12}>
        <Typography variant="h5">Reporting Sick</Typography>
        <Typography variant="caption">Fill this in before you see the doctor</Typography>
        <Divider />
      </Grid>
      <Grid xs={12}>
        <RadioGroup row name="reportSickType" required={true} formLabel="You are going to:">
          {reportSickTypes.map((option) => (
            <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
          ))}
        </RadioGroup>
      </Grid>
      <Grid xs={12} lg={6}>
        <ReportSickLocationField
          required
          fullWidth
          label="Location"
          name="location"
          defaultLocation="KRHH"
          validate={checkLocation}
        />
      </Grid>
      <Grid xs={12} lg={6}>
        <DateTimePicker
          label="Date and Time"
          name="dateTime"
          ampm={false}
          inputProps={{ fullWidth: true }}
          inputFormat="DD/MM/YYYY HH:mm"
          dateAdapter={AdapterMoment}
        />
      </Grid>
      <Grid xs={12}>
        <TextField
          required
          fullWidth
          name="reason"
          label="Reason"
          helperText={`
          If you are reporting sick for fever, include the temperature as well (Example: Fever of 38.2)
          Note that flu is not a symptom.
          If you are going for your MA, state the condition which you are consulting the doctor about.
          `.trim()}
          validate={checkReason}
        />
      </Grid>
      <Grid xs={12}>
        <ReportSickTextArea />
      </Grid>
    </Grid>
  );
}

function StatusesFieldArray() {
  const { values } = useFormikContext<FormatGeneratorFieldsI>();

  if (values.obtainStatuses === "false") {
    return null;
  }

  return (
    <>
      <Typography variant="h6">Statuses</Typography>
      <Typography variant="caption">Note that MC is considered a status.</Typography>
      <FieldArray name="statuses">
        {({ push, remove }) => {
          return (
            <Grid container spacing={1}>
              {values.statuses.map((_, index) => (
                <Grid key={`statuses.${index}.status`} container xs={12} spacing={1}>
                  <Grid xs={12}>
                    <Typography variant="body1">Status {index + 1}:</Typography>
                  </Grid>
                  <Grid lg={6} xs={12}>
                    <TextField
                      required
                      fullWidth
                      name={`statuses.${index}.status`}
                      label="Status"
                      validate={checkStatus}
                    />
                  </Grid>
                  <Grid lg={2} xs={12}>
                    <TextField
                      required
                      fullWidth
                      name={`statuses.${index}.days`}
                      label="No. of days"
                      validate={checkStatusDays}
                    />
                  </Grid>
                  <Grid lg={2} xs={12}>
                    <DatePicker
                      label="Start Date"
                      name={`statuses.${index}.startDate`}
                      inputProps={{ fullWidth: true }}
                      inputFormat="DD/MM/YYYY"
                      dateAdapter={AdapterMoment}
                    />
                  </Grid>
                  <Grid lg={2} xs={12}>
                    <Button color="error" variant="outlined" onClick={() => remove(index)}>
                      Remove Status
                    </Button>
                  </Grid>
                </Grid>
              ))}
              <Grid xs={12}>
                <Button
                  variant="outlined"
                  onClick={() =>
                    push({ status: "", days: "", startDate: moment().tz("Asia/Singapore") })
                  }
                >
                  Add Additional Statuses
                </Button>
              </Grid>
              <Grid xs={12} sx={{ my: 2 }}>
                <TextField
                  required
                  fullWidth
                  name="mcNumber"
                  label="MC Number"
                  helperText={`Excuses have MC Numbers as well. If you did not get any MC or status, put "NIL".`}
                  validate={checkMCNumber}
                />
              </Grid>
            </Grid>
          );
        }}
      </FieldArray>
    </>
  );
}

function SwabTestResultRadioGroup({ children }: React.PropsWithChildren) {
  const { values } = useFormikContext<FormatGeneratorFieldsI>();

  if (values.swabTest === "false") {
    return null;
  }

  return <>{children}</>;
}

function UpdateESSRadioGroup() {
  const { values } = useFormikContext<FormatGeneratorFieldsI>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, _1, helper] = useField("updateESS");

  useEffect(() => {
    if (values.reportSickType === reportSickOptions.RSI) {
      helper.setValue("N/A");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.reportSickType]);

  if (values.reportSickType === reportSickOptions.RSI) {
    return null;
  }

  return (
    <>
      <Box sx={{ width: 1 }}>
        <RadioGroup row required formLabel="Did you update ESS?" name="updateESS">
          <FormControlLabel value="true" control={<Radio />} label="Yes" />
          <FormControlLabel value="false" control={<Radio />} label="No" />
          <FormControlLabel value="N/A" control={<Radio />} label="N/A" />
        </RadioGroup>
      </Box>
      <Typography variant="caption" sx={{ display: "block" }}>
        You need to update ESS if you are given an MC when you RSO or go for MA.
      </Typography>
      <Typography variant="caption" sx={{ display: "block" }}>
        To access/download ESS go{" "}
        <Link
          component={RouterLink}
          to="https://play.google.com/store/apps/details?id=sg.mindef.emp.ess&hl=en_SG&gl=US"
        >
          here
        </Link>
        .
      </Typography>
    </>
  );
}

function OutcomeTextArea() {
  const { values } = useFormikContext<FormatGeneratorFieldsI>();

  const statusesMsg =
    values.obtainStatuses === "true"
      ? values.statuses
          .map(
            (status) =>
              `${status.status} for ${status.days} days from ${status.startDate.format(
                "DDMMYYYY"
              )} to ${status.startDate.add(Number(status.days), "d").format("DDMMYYYY")}`
          )
          .join(", ")
      : "NIL";
  const swabTestMsg =
    values.swabTest === "true"
      ? `Yes (${values.swabTestResult === "true" ? "Positive (+)" : "Negative (-)"})`
      : "No";

  const copyMessage = useMemo(() => {
    return `
Dear Sirs/Ma'am,

*<< ${values.nric} / ${values.rank} ${values.name} / ${values.contactNumber} >>* from << *${
      values.platform
    }* >> is RSI at << *${values.location}* >> on << *${values.dateTime.format(
      "DDMMYYYY HHmm"
    )}* >> for << *${values.reason}* >>.

*${values.rank} ${values.name}* has been prescribed with << *${
      values.obtainMedication === "true" ? "Medication" : "NIL"
    }* >> and given << *${statusesMsg}* >>.
MC Number: ${values.mcNumber === "" ? "NIL" : values.mcNumber}
Swab Test: ${swabTestMsg}
Updated ESS: ${
      values.updateESS === "true" ? "Yes" : values.updateESS === "false" ? "No" : values.updateESS
    }

For your update and information.
`.trim();
  }, [
    values.nric,
    values.rank,
    values.name,
    values.contactNumber,
    values.platform,
    values.location,
    values.dateTime,
    values.reason,
    values.obtainMedication,
    values.mcNumber,
    values.updateESS,
    statusesMsg,
    swabTestMsg,
  ]);

  return (
    <>
      <Typography variant="h5" sx={{ my: 1 }}>
        Output Message:{" "}
      </Typography>
      <MuiTextField disabled multiline value={copyMessage} rows={10} sx={{ width: 1, my: 1 }} />
      <Button
        variant="contained"
        onClick={() => {
          navigator.clipboard.writeText(copyMessage);
          window.alert("Message is copied onto your clipboard.");
        }}
      >
        Copy
      </Button>
    </>
  );
}

function OutcomeTab() {
  return (
    <Grid container spacing={1}>
      <Grid xs={12}>
        <Typography variant="h5">Outcome</Typography>
        <Typography variant="caption">Fill this in after you have seen the doctor</Typography>
        <Divider />
      </Grid>
      <Grid xs={12}>
        <RadioGroup
          row
          required
          name="obtainMedication"
          formLabel="Did you obtain any medications from the doctor?"
        >
          <FormControlLabel value="true" control={<Radio />} label="Yes" />
          <FormControlLabel value="false" control={<Radio />} label="no" />
        </RadioGroup>
      </Grid>
      <Grid xs={12}>
        <RadioGroup
          row
          required
          name="obtainStatuses"
          formLabel="Did you obtain any MC or status from the doctor?"
        >
          <FormControlLabel value="true" control={<Radio />} label="Yes" />
          <FormControlLabel value="false" control={<Radio />} label="no" />
        </RadioGroup>
      </Grid>
      <Grid xs={12}>
        <StatusesFieldArray />
      </Grid>
      <Grid xs={12}>
        <RadioGroup row required name="swabTest" formLabel="Did you go through a swab test?">
          <FormControlLabel value="true" control={<Radio />} label="Yes" />
          <FormControlLabel value="false" control={<Radio />} label="no" />
        </RadioGroup>
      </Grid>
      <Grid xs={12}>
        <SwabTestResultRadioGroup>
          <RadioGroup
            row
            required
            name="swabTestResult"
            formLabel="What was the result of your swab test?"
          >
            <FormControlLabel value="true" control={<Radio />} label="Positive (+)" />
            <FormControlLabel value="false" control={<Radio />} label="Negative (-)" />
          </RadioGroup>
        </SwabTestResultRadioGroup>
      </Grid>
      <Grid xs={12}>
        <UpdateESSRadioGroup />
      </Grid>
      <Grid xs={12}>
        <OutcomeTextArea />
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
    reportSickType: "RSI",
    location: "",
    dateTime: moment().tz("Asia/Singapore"),
    reason: "",
    obtainMedication: "false",
    obtainStatuses: "false",
    statuses: [{ status: "", days: "", startDate: moment().tz("Asia/Singapore") }],
    mcNumber: "",
    swabTest: "false",
    swabTestResult: "false",
    updateESS: "N/A",
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
          <TextField select required fullWidth name="rank" validate={checkRank} label="Rank">
            {selectRankValues.map((rank) => (
              <MenuItem key={rank.value} value={rank.value}>
                {rank.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid xs={12} lg={6}>
          <TextField required fullWidth name="name" validate={checkName} label="Name" />
        </Grid>
        <Grid xs={12} lg={3}>
          <TextField
            required
            fullWidth
            name="nric"
            validate={checkMaskedNRIC}
            label="Masked NRIC"
            helperText={"In the format of TXXXX123A"}
          />
        </Grid>
        <Grid xs={12} lg={6}>
          <TelInputField required fullWidth name="contactNumber" validate={checkContactNumber} />
        </Grid>
        <Grid xs={12} lg={6}>
          <TextField required fullWidth name="platform" validate={checkPlatform} label="Platform" />
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
            <TabPanel value="outcome">
              <OutcomeTab />
            </TabPanel>
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
