import { ServiceDetailType } from "@/utils/type/serviceDetailType";
import { useState, useCallback } from "react";
import useDateUtils from "./useDateUtils";

export const useSubscription = (serviceInfo: ServiceDetailType) => {
  const { addMonths } = useDateUtils();
  const [selectedDuration, setSelectedDuration] = useState(1);
  const durationOptions = [1, 3, 6, 12];

  const [subscriptionData, setSubscriptionData] = useState(() => {
    const now = new Date();
    return {
      ...serviceInfo,
      registerDate: now,
      expireDate: addMonths(now, 1),
      price: serviceInfo.priceOfMonth,
    };
  });

  const calculatePrice = useCallback(
    (duration: number) => {
      if (duration === 12) {
        return serviceInfo.typeOfYear == true || serviceInfo.priceOfYear > 0
          ? serviceInfo.priceOfYear
          : serviceInfo.priceOfMonth * 12;
      }
      return duration * serviceInfo.priceOfMonth;
    },
    [serviceInfo]
  );

  const handleDateChange = (selectedDate?: Date) => {
    const date = selectedDate || subscriptionData.registerDate;
    setSubscriptionData((prev) => ({
      ...prev,
      registerDate: date,
      expireDate: addMonths(date, selectedDuration),
      price: calculatePrice(selectedDuration),
    }));
  };

  const handleDurationChange = (duration: number) => {
    setSelectedDuration(duration);
    setSubscriptionData((prev) => ({
      ...prev,
      expireDate: addMonths(prev.registerDate, duration),
      price: calculatePrice(duration),
    }));
  };

  const getBookingPayload = () => ({
    serviceId: subscriptionData.id,
    startDate: subscriptionData.registerDate,
    forMonthOrYear:
      selectedDuration === 12 && serviceInfo.priceOfYear ? "year" : "month",
    totalMonth: selectedDuration,
  });

  return {
    durationOptions,
    selectedDuration,
    subscriptionData,
    handleDateChange,
    handleDurationChange,
    getBookingPayload,
  };
};
