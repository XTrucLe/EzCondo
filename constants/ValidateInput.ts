const validateForm = (form: Record<string, any>) => {
  const errors: Record<string, string> = {};

  const rules = {
    name: { required: true },
    email: {
      required: true,
      validate: (value: string) => value.includes("@"),
      message: "Email không hợp lệ",
    },
    phone_number: {
      required: false,
      validate: (value: string) => /^[0-9]{10,11}$/.test(value),
      message: "Số điện thoại không hợp lệ",
    },
    citizen_identity: { required: true },
    date_of_birth: { required: true },
    apartment_number: { required: true },
  };

  Object.entries(rules).forEach(([field, rule]) => {
    const value = form[field]?.trim?.() || "";

    if (rule.required && !value) {
      errors[field] = `Trường ${field.replace(/_/g, " ")} không được để trống`;
    } else if ("validate" in rule && !rule.validate(value)) {
      errors[field] = rule.message;
    }
  });

  return errors;
};
