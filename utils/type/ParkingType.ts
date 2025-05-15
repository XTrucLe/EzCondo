export type ParkingType = {
  parkingId: string;
  apartment: string;
  name: string;
  numberOfMotorbike: number;
  numberOfCar: number;
  cards?: ParkingCardType[];
};

export type ParkingCardType = {
  id: string;
  price: number;
  status: string;
  checking: string;
  type: string;
};

export type ParkingCardDetailsType = {
  owner: string;
  apartment: string;
  name: string;
} & ParkingCardType;
