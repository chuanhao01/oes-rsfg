import { FieldValidator } from "formik";
import { matchIsValidTel } from "mui-tel-input";

// Validations for Report Sick Format Generator
export const checkRank: FieldValidator = (rank: string) => {
  if (!rank) {
    return "Required";
  }
  if (rank == "") {
    return "Please pick a rank";
  }
};

export const checkName: FieldValidator = (name: string) => {
  if (!name) {
    return "Required";
  }
  if (name.length < 1) {
    return "Name needs to be longer than 1 character";
  }
};

export const checkMaskedNRIC: FieldValidator = (maskedNRIC: string) => {
  const maskedNRICRegex = /^[SFTG]XXXX\d{3}[A-Z]$/;

  if (!maskedNRIC) {
    return "Required";
  }
  if (!maskedNRICRegex.test(maskedNRIC)) {
    return "Your NRIC is in the wrong format";
  }
};

export const checkContactNumber: FieldValidator = (contactNumber: string) => {
  if (!contactNumber) {
    return "Required";
  }
  if (!matchIsValidTel(contactNumber)) {
    return "Please input a valid phone number";
  }
};
