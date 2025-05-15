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

[
  {
    apartmentNumber: "204",
    consumption: 1000,
    current_water_number: 1000,
    email: "trucle050503@gmail.com",
    fullName: "Trúc Lê",
    meterNumber: "WT05",
    paymentTerm: "2025-03-16T15:19:02.41",
    phoneNumber: "0766760621",
    pre_water_number: 0,
    price: 5000000,
    readingCurrentDate: "2025-05-14T07:40:52.72",
    readingPreDate: "2025-05-14T07:40:52.72",
    status: "overdue",
    waterBillId: "6365295d-64eb-45d2-9318-8a2943b0deb7",
  },
];

[
  {
    apartmentNumber: "204",
    consumption: 500,
    current_electric_number: 500,
    electricBillId: "498c64f6-15ff-4b63-9515-078e6ccf075b",
    email: "trucle050503@gmail.com",
    fullName: "Trúc Lê",
    meterNumber: "MT05",
    paymentTerm: "2025-03-25T09:40:20.773",
    phoneNumber: "0766760621",
    pre_electric_number: 0,
    price: 2092000,
    readingCurrentDate: "2025-05-10T09:40:20.747",
    readingPreDate: "2025-05-10T09:40:20.747",
    status: "overdue",
  },
  {
    apartmentNumber: "204",
    consumption: 1500,
    current_electric_number: 2000,
    electricBillId: "e1539e1b-94af-498e-8f2e-3ae6139c813c",
    email: "trucle050503@gmail.com",
    fullName: "Trúc Lê",
    meterNumber: "MT05",
    paymentTerm: "2025-05-29T10:36:07.5",
    phoneNumber: "0766760621",
    pre_electric_number: 500,
    price: 3513000,
    readingCurrentDate: "2025-05-14T10:36:07.447",
    readingPreDate: "2025-05-10T09:40:20.747",
    status: "pending",
  },
];

[
  {
    amount: 5000,
    apartmentNumber: "204",
    bookingId: "487d20b1-2cde-43e1-9b1f-fddc31899f55",
    createDate: "2025-05-10T08:22:35.567",
    electricId: null,
    fullName: "Trúc Lê",
    parkingId: null,
    paymentId: "67c40c7e-4b95-47ab-9bcd-1dade03ca80d",
    status: "completed",
    type: "Booking",
    waterId: null,
  },
];

[
  {
    amount: 30000,
    apartmentNumber: "204",
    bookingId: null,
    createDate: "2025-05-15T16:39:35.47",
    electricId: null,
    fullName: "Trúc Lê",
    parkingId: "04a4786e-f938-41ad-b048-067dc72f60dd",
    paymentId: "f7b90a26-027f-4466-b7c5-7405b08e45fe",
    status: "pending",
    type: "Parking",
    waterId: null,
  },
  {
    amount: 30000,
    apartmentNumber: "204",
    bookingId: null,
    createDate: "2025-05-15T16:36:32.7",
    electricId: null,
    fullName: "Trúc Lê",
    parkingId: "04a4786e-f938-41ad-b048-067dc72f60dd",
    paymentId: "f9d6b4cb-d5a7-4e01-945c-8ad552f42690",
    status: "pending",
    type: "Parking",
    waterId: null,
  },
  {
    amount: 60000,
    apartmentNumber: "204",
    bookingId: null,
    createDate: "2025-05-15T16:33:28.593",
    electricId: null,
    fullName: "Trúc Lê",
    parkingId: "04a4786e-f938-41ad-b048-067dc72f60dd",
    paymentId: "41cab9c6-7375-42cd-a83f-da417991a51a",
    status: "pending",
    type: "Parking",
    waterId: null,
  },
  {
    amount: 3513000,
    apartmentNumber: "204",
    bookingId: null,
    createDate: "2025-05-15T16:15:45.727",
    electricId: "fd125624-0beb-46f0-977d-eb3acd2efcfe",
    fullName: "Trúc Lê",
    parkingId: null,
    paymentId: "e1d39e1d-e21a-4c35-9e2d-6cdc28cf01b6",
    status: "pending",
    type: "Electric",
    waterId: null,
  },
  {
    amount: 5000,
    apartmentNumber: "204",
    bookingId: "7783aefb-962c-483f-943a-599fe6b6ce93",
    createDate: "2025-05-15T15:50:00.993",
    electricId: null,
    fullName: "Trúc Lê",
    parkingId: null,
    paymentId: "4ec549b3-c4fb-4444-8fec-9e2ac9f0a494",
    status: "pending",
    type: "Booking",
    waterId: null,
  },
  {
    amount: 30000,
    apartmentNumber: "204",
    bookingId: null,
    createDate: "2025-05-15T05:50:53.38",
    electricId: null,
    fullName: "Trúc Lê",
    parkingId: "c778c5db-a87c-447b-9806-f6901890bd32",
    paymentId: "b1f86527-753d-4067-888a-2030cb4d4787",
    status: "pending",
    type: "Parking",
    waterId: null,
  },
];
