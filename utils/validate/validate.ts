import { useLanguage } from "@/hooks/useLanguage";

type ValidationRules = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | undefined;
  ageLimit?: number;
};

export const patterns = {
  phone: /^(?:0|\+84)[1-9]\d{8,9}$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
};

export const formatMessage = (
  message: string,
  replacements: Record<string, string | number>
) => {
  return message?.replace(
    /{(\w+)}/g,
    (_, key) => replacements[key]?.toString() || `{${key}}`
  );
};

export const validateField = (
  value: string,
  fieldName: string,
  rules: ValidationRules,
  translation: any
): string => {
  if (rules.required) {
    if (typeof value !== "string" || !value.trim()) {
      return formatMessage(translation.required, { fieldName });
    }
  }

  if (rules.minLength && (value?.length ?? 0) < rules.minLength) {
    return formatMessage(translation.minLength, {
      fieldName,
      min: rules.minLength,
    });
  }

  if (rules.maxLength && (value?.length ?? 0) > rules.maxLength) {
    return formatMessage(translation.maxLength, {
      fieldName,
      max: rules.maxLength,
    });
  }

  if (rules.pattern && !rules.pattern.test(value)) {
    return formatMessage(translation.invalid, { fieldName });
  }

  if (rules.custom) {
    const customError = rules.custom(value);
    if (customError)
      return formatMessage(translation[customError] || customError, {
        fieldName,
      });
  }

  if (fieldName === "dateOfBirth" && rules.ageLimit) {
    const age = calculateAge(value);
    if (age < rules.ageLimit) {
      return formatMessage(translation.ageLimit, { age: rules.ageLimit });
    }
  }

  return "";
};

// Hàm tính tuổi
const calculateAge = (birthDate: string): number => {
  const dob = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
};

export const validatePassword = (value: string): string => {
  const { translation } = useLanguage();
  if (!/[A-Z]/.test(value)) return translation.upperCase;
  if (!/[a-z]/.test(value)) return translation.lowerCase;
  if (!/[0-9]/.test(value)) return translation.number;
  if (!/[!@#$%^&*]/.test(value)) return translation.specialCharacter;
  return "";
};

export const validateConfirmPassword = (
  value: string,
  values: string,
  translation: any
): string => {
  if (value !== values)
    return formatMessage(translation.notMatch, {
      fieldName: translation.password,
    });
  return "";
};

export const validateNewPassword = (value: string): string => {
  const errors: Array<string> = [];

  if (value.length < 8) errors.push("minLength");
  if (!/[A-Z]/.test(value)) errors.push("upperCase");
  if (!/[a-z]/.test(value)) errors.push("lowerCase");
  if (!/[0-9]/.test(value)) errors.push("number");
  if (!/[!@#$%^&*]/.test(value)) errors.push("specialCharacter");
  if (errors.length > 0) errors.unshift("passwordError");

  return errors.join(", ");
};

export const handleErrorPassword = (
  text: string,
  translation: any
): Array<{ key: string; message: string; hasError: boolean }> => {
  const errorArray = text ? text.split(", ") : [];
  const defaultParams = { fieldName: translation.password };

  // Danh sách tất cả lỗi có thể có
  const allErrors = [
    {
      key: "minLength",
      message: formatMessage(translation.minLength, {
        ...defaultParams,
        min: 8,
      }),
    },
    {
      key: "upperCase",
      message: formatMessage(translation.upperCase, defaultParams),
    },
    {
      key: "lowerCase",
      message: formatMessage(translation.lowerCase, defaultParams),
    },
    {
      key: "number",
      message: formatMessage(translation.number, defaultParams),
    },
    {
      key: "specialCharacter",
      message: formatMessage(translation.specialCharacter, defaultParams),
    },
  ];

  return allErrors.map((error) => ({
    key: error.key,
    message: error.message,
    hasError: errorArray.includes(error.key),
  }));
};
