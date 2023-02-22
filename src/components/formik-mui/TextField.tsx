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
        {...configTextField}
        // Attaching formik methods
        name={name}
        value={field.value}
        onChange={field.onChange}
        onBlur={field.onBlur}
        {...props}
      >
        {children}
      </MuiTextField>
      {helperText &&
        helperText.split("\n").map((line) => (
          <FormHelperText key={line.replace(" ", "_")} sx={{ mx: 1 }}>
            {line}
          </FormHelperText>
        ))}
    </>
  );
}

export default TextField;
