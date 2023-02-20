import { FieldValidator } from "formik";
import { matchIsValidTel } from "mui-tel-input";

// Validations for Report Sick Format Generator
export const checkRank: FieldValidator = (rank: string) => {
  if (!rank) {
    return "Required";
  }
  if (rank === "") {
    return "Please pick a rank";
  }
};

export const checkName: FieldValidator = (name: string) => {
  if (!name) {
    return "Required";
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

export const checkPlatform: FieldValidator = (platform: string) => {
  if (!platform) {
    return "Required";
  }
};

export const checkLocation: FieldValidator = (location: string) => {
  if (!location) {
    return "Required";
  }
};

export const checkReason: FieldValidator = (reason: string) => {
  if (!reason) {
    return "Required";
  }
};

export const checkStatus: FieldValidator = (status: string) => {
  if (!status) {
    return "Required";
  }
};

export const checkStatusDays: FieldValidator = (days: string) => {
  const integerRegex = /^\d+$/;

  if (!days) {
    return "Required";
  }
  if (!integerRegex.test(days)) {
    return "Please input an integer";
  }
};
