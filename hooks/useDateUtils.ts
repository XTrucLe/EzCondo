// Project: useDateCustome
import { useCallback } from "react";

const padZero = (num: number) => (num < 10 ? `0${num}` : `${num}`);

const useDateUtils = () => {
  const addMonths = useCallback((date: Date, months: number): Date => {
    const day = date.getDate();
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + months);

    // Nếu bị lỗi do ngày tháng không hợp lệ (vd 31 -> 30 hoặc 28)
    if (newDate.getDate() < day) {
      newDate.setDate(0); // chuyển về cuối tháng trước
    } else {
      newDate.setDate(day); // giữ nguyên ngày
    }

    return newDate;
  }, []);

  const formatDate = useCallback(
    (date: Date, pattern: string = "dd/MM/yyyy"): string => {
      const map: Record<string, string> = {
        dd: padZero(date.getDate()),
        MM: padZero(date.getMonth() + 1),
        yyyy: date.getFullYear().toString(),
        HH: padZero(date.getHours()),
        mm: padZero(date.getMinutes()),
        ss: padZero(date.getSeconds()),
      };

      let formatted = pattern;
      Object.entries(map).forEach(([key, value]) => {
        formatted = formatted.replace(key, value);
      });

      return formatted;
    },
    []
  );

  return {
    addMonths,
    formatDate,
  };
};

export default useDateUtils;
