import { TextFieldProps, FormHelperText, TextField as MuiTextField } from "@mui/material";
import { useField, FieldValidator } from "formik";

export type InstantTextFieldProps =
  | {
      name: string;
      helperText?: string;
      validate?: FieldValidator;
    } & TextFieldProps;

export function TextField({
  name,
  validate,
  helperText,
  variant,
  children,
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
      <MuiTextField variant={variant || "outlined"} {...field} {...props} {...configTextField}>
        {children}
      </MuiTextField>
      {helperText && <FormHelperText sx={{ mx: 1 }}>{helperText}</FormHelperText>}
    </>
  );
}

export default TextField;
