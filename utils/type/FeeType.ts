export type BaseBill = {
  apartmentNumber: string;
  consumption: number;
  email: string;
  fullName: string;
  meterNumber: string;
  paymentTerm: string;
  phoneNumber: string;
  price: number;
  readingCurrentDate: string;
  readingPreDate: string;
  status: string;
};

export type ElectricFee = BaseBill & {
  electricBillId: string;
  current_electric_number: number;
  pre_electric_number: number;
};

export type WaterFee = BaseBill & {
  waterBillId: string;
  current_water_number: number;
  pre_water_number: number;
};


{"serviceId":"687f8d02-7252-491b-b602-41f8b8295763","startDate":"17/5/2025","forMonthOrYear":"month","totalMonth":1}