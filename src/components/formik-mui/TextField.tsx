import {
  TextFieldProps as MuiTextFieldProps,
  FormHelperText,
  TextField as MuiTextField,
} from "@mui/material";
import { useField, FieldValidator } from "formik";

export type TextFieldProps =
  | {
      name: string;
      helperText?: string;
      validate?: FieldValidator;
    } & MuiTextFieldProps;

export function TextField({
  name,
  validate,
  helperText,
  variant,
  children,
  ...props
}: TextFieldProps) {
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
      <MuiTextField
        variant={variant || "outlined"}
        {...props}
        {...configTextField}
        // Attaching formik methods
        name={name}
        value={field.value}
        onChange={field.onChange}
        onBlur={field.onBlur}
      >
        {children}
      </MuiTextField>
      {helperText && <FormHelperText sx={{ mx: 1 }}>{helperText}</FormHelperText>}
    </>
  );
}

export default TextField;
