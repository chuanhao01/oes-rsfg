import { TextFieldProps, FormHelperText, TextField } from "@mui/material";
import { useField, FieldValidator } from "formik";

export type InstantTextFieldProps =
  | {
      name: string;
      helperText?: string;
      validate?: FieldValidator;
    } & TextFieldProps;

export function InstantTextField({
  name,
  validate,
  helperText,
  variant,
  ...props
}: InstantTextFieldProps) {
  const [field, meta] = useField({ name, validate });

  let configTextField = {
    error: false,
    helperText: "",
  };

  if (meta && meta.touched && meta.error) {
    configTextField = {
      ...configTextField,
      error: true,
      helperText: meta.error,
    };
  }
  return (
    <>
      <TextField variant={variant || "outlined"} {...field} {...props} {...configTextField} />
      {helperText && <FormHelperText sx={{ mx: 1 }}>{helperText}</FormHelperText>}
    </>
  );
}

export default InstantTextField;
