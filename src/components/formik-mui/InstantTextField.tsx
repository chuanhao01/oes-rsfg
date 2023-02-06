import { TextFieldProps, FormHelperText, TextField } from "@mui/material";
import { useField } from "formik";
import { simpleErrorT } from "./utils";

export type InstantTextFieldProps =
  | {
      name: string;
      helperText?: string;
      checkErr: (name: string) => simpleErrorT;
    } & TextFieldProps;

export function InstantTextField({ name, helperText, checkErr, ...props }: InstantTextFieldProps) {
  const [field, meta] = useField(name);

  let configTextField = {
    error: false,
    helperText: "",
  };

  const errMsg = checkErr(field.value);
  if (meta && meta.touched && errMsg) {
    configTextField = { ...configTextField, error: true, helperText: errMsg };
  }
  return (
    <TextField variant="outlined" {...field} {...props} {...configTextField}>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </TextField>
  );
}

export default InstantTextField;
