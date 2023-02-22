import {
  FormLabel,
  RadioGroup as MuiRadioGroup,
  RadioGroupProps as MuiRadioGroupProps,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { useField, FieldValidator } from "formik";

export interface RadioGroupProps extends MuiRadioGroupProps {
  name: string;
  required?: boolean;
  formLabel?: string;
  validate?: FieldValidator;
}

export function RadioGroup({
  name,
  required,
  validate,
  formLabel,
  children,
  ...props
}: RadioGroupProps) {
  const [field, meta] = useField({ name, validate });

  let errorConfig = {
    error: false,
    helperText: "",
  };

  if (meta && meta.touched && meta.error) {
    errorConfig = {
      ...errorConfig,
      error: true,
      helperText: meta.error,
    };
  }

  return (
    <FormControl variant="standard" error={errorConfig.error}>
      {formLabel && (
        <FormLabel>
          {formLabel}
          {required && " *"}
        </FormLabel>
      )}
      <MuiRadioGroup
        name={name}
        value={field.value}
        onChange={field.onChange}
        onBlur={field.onBlur}
        {...props}
      >
        {children}
      </MuiRadioGroup>
      {errorConfig.error && <FormHelperText>{errorConfig.helperText}</FormHelperText>}
    </FormControl>
  );
}
