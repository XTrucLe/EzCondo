import {
  patterns,
  validateConfirmPassword,
  validateNewPassword,
  validatePassword,
} from "./validate";

export const validateLogin = {
  email: {
    required: true,
    pattern: patterns.email,
  },
  password: {
    required: true,
    minLength: 8,
  },
};

export const validateChangePassword = {
  oldPassword: {
    required: true,
  },
  newPassword: {
    required: true,
    custom: validateNewPassword,
  },
  confirmPassword: {
    required: true,
  },
};

export const validateEmail = {
  email: {
    required: true,
    pattern: patterns.email,
  },
};

export const validateForgotPassword = {
  email: {
    required: true,
    pattern: patterns.email,
  },
  newPassword: {
    required: true,
    custom: validatePassword,
  },
  confirmPassword: {
    required: true,
  },
};

export const validateUserInfo = {
  fullname: {
    required: true,
  },
  phone: {
    required: true,
    pattern: patterns.phone,
  },
  dateOfBirth: {
    required: true,
  },
};
