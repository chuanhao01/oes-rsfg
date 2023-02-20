import {
  DateTimePicker as MuiDateTimePicker,
  DateTimePickerProps as MuiDateTimePickerProps,
  LocalizationProvider,
  LocalizationProviderProps,
} from "@mui/x-date-pickers";
import { TextField as MuiTextField, TextFieldProps } from "@mui/material";
import { useField } from "formik";

export interface DateTimePickerProps
  extends Omit<MuiDateTimePickerProps<string, string>, "renderInput" | "value" | "onChange"> {
  name: string;
  inputProps?: TextFieldProps;
  dateAdapter: LocalizationProviderProps["dateAdapter"];
}

export function DateTimePicker({ name, dateAdapter, inputProps, ...props }: DateTimePickerProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [field, _, helper] = useField({ name });

  return (
    <LocalizationProvider dateAdapter={dateAdapter}>
      <MuiDateTimePicker
        {...props}
        renderInput={(props) => {
          // Adding on additional inputProps passed in
          const textFieldProps = inputProps || {};
          return <MuiTextField {...textFieldProps} {...props} />;
        }}
        value={field.value}
        onChange={(newValue) => {
          helper.setValue(newValue);
        }}
      />
    </LocalizationProvider>
  );
}
