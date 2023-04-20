import { isValidPhoneNumber } from "libphonenumber-js";

const emailRegex = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
const alphabetRegex = /^[A-Za-z]+$/;

export const validateEmail = (email: string): boolean => {
  return emailRegex.test(email);
};

export const validateEnglishLetters = (text: string): boolean => {
  return alphabetRegex.test(text);
};

export const validatePhoneNumber = (phoneNo: string): boolean => {
  return isValidPhoneNumber(phoneNo, "LK");
};
