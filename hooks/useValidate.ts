import { useLanguage } from "@/hooks/useLanguage";
import { validateField } from "@/utils/validate/validate";
import { useState } from "react";

// Định nghĩa kiểu dữ liệu cho rules
type ValidationRule = {
  required?: boolean;
  pattern?: RegExp;
  minLength?: number;
  maxLength?: number;
};

interface ValidationRules {
  [key: string]: ValidationRule;
}

export const useValidate = (
  initialState: { [key: string]: string },
  validateRules: ValidationRules
) => {
  const { translation } = useLanguage(); // Lấy bản dịch theo ngôn ngữ hiện tại
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});

  const handleRemoveError = (field: string) => {
    if (validateRules[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };
  // Hàm xử lý thay đổi input và kiểm tra lỗi
  const handleChange = (field: string, value: string) => {
    const trimmedValue = value.trim();

    setValues((prev) => {
      const newValues = { ...prev, [field]: trimmedValue };
      if (!trimmedValue) delete newValues[field]; // Xóa key nếu rỗng
      return newValues;
    });

    if (validateRules[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]:
          validateField(
            trimmedValue,
            field,
            validateRules[field],
            translation
          ) || "",
      }));
    }
  };

  // Hàm kiểm tra toàn bộ form trước khi submit
  const validateAll = () => {
    let newErrors: { [key: string]: string | null } = {};
    let filteredValues: { [key: string]: string } = {}; // Object chứa dữ liệu hợp lệ

    Object.keys(validateRules).forEach((field) => {
      const value = values[field]?.trim();
      if (value) filteredValues[field] = value; // Chỉ giữ lại giá trị hợp lệ
      newErrors[field] = validateField(
        value || "",
        field,
        validateRules[field],
        translation
      );
    });

    // Cập nhật lại state, tránh cập nhật dư thừa
    setValues((prev) =>
      JSON.stringify(prev) !== JSON.stringify(filteredValues)
        ? filteredValues
        : prev
    );
    setErrors(newErrors);

    return !Object.values(newErrors).some(Boolean);
  };

  return {
    values,
    errors,
    handleChange,
    handleRemoveError,
    validateAll,
  };
};
