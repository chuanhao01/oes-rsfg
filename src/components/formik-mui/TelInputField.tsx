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
  const [field, meta, helper] = useField({ name, validate });

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
      {...props}
      {...configTextField}
      name={name}
      value={field.value}
      onChange={(telValue) => {
        helper.setValue(telValue);
      }}
      onBlur={field.onBlur}
    />
  );
}

export default TelInputField;
