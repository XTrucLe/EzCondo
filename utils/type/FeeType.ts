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
