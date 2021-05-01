import validator from "validator";

export const validateEmail = (email) => {
  return validator.isEmail(email);
};

export const validatePassword = (password) => {
  return validator.matches(password, /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/);
};

export const validateName = (name) => {
  return validator.matches(name, /^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$/);
};

export const comparePassword = (password, confirmPassword) => {
  return password === confirmPassword;
};
