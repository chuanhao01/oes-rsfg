import { FieldValidator, useField } from "formik";
import { MuiTelInput, MuiTelInputProps, MuiTelInputCountry } from "mui-tel-input";

export interface TelInputFieldProps extends MuiTelInputProps {
  name: string;
  validate?: FieldValidator;
  preferredCountries?: MuiTelInputCountry[];
}

export function TelInputField({
  name,
  validate,
  preferredCountries,
  ...props
}: TelInputFieldProps) {
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
    <MuiTelInput
      preferredCountries={preferredCountries || ["SG", "MY"]}
      {...field}
      {...props}
      {...configTextField}
    />
  );
}

export default TelInputField;
