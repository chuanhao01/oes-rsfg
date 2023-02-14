import {
  DateTimePicker as MuiDateTimePicker,
  DateTimePickerProps as MuiDateTimePickerProps,
} from "@mui/x-date-pickers";
import { TextField as MuiTextField, TextFieldProps } from "@mui/material";
import { useField } from "formik";

export interface DateTimePickerProps
  extends Omit<MuiDateTimePickerProps<string, string>, "renderInput" | "value" | "onChange"> {
  name: string;
  inputProps?: TextFieldProps;
}

export function DateTimePicker({ name, inputProps, ...props }: DateTimePickerProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [field, _, helper] = useField({ name });

  return (
    <MuiDateTimePicker
      {...props}
      renderInput={(props) => {
        const textFieldProps = inputProps || {};
        return <MuiTextField {...textFieldProps} {...props} />;
      }}
      value={field.value}
      onChange={(newValue) => {
        helper.setValue(newValue);
      }}
    />
  );
}
