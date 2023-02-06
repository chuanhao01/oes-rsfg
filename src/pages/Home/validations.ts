import { simpleErrorT } from "@/components/formik-mui";

// Validations for Report Sick Format Generator
export function checkName(name: string): simpleErrorT {
  if (!name) {
    return "Required";
  }
  if (name.length < 1) {
    return "Name needs to be longer than 1 character";
  }
  return null;
}

export function checkMaskedNRIC(maskedNRIC: string): simpleErrorT {
  const maskedNRICRegex = /^[SFTG]XXXX\d{3}[A-Z]$/;

  if (!maskedNRIC) {
    return "Required";
  }
  if (!maskedNRICRegex.test(maskedNRIC)) {
    return "Your NRIC is in the wrong format";
  }
  return null;
}
