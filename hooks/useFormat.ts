export const formatVND = (amount: string | number): string => {
  const number = typeof amount === "string" ? parseFloat(amount) : amount;
  if (isNaN(number)) {
    return "Invalid amount";
  }
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(number);
};