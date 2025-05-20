import { SlideType } from "@/components/ui/SlideShow";

export type ServiceDetailType = {
  id: string;
  serviceName: string;
  description: string;
  images?: SlideType[];
  typeOfMonth: boolean;
  typeOfYear: boolean;
  priceOfMonth: number;
  priceOfYear: number;
  status: "active" | "inactive";
};

export type OtherServiceType = {
  id: string;
  name: string;
  description: string;
  price: number;
};
