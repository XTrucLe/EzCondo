export type ServiceDetailType = {
  id: string;
  name: string;
  description: string;
  facilities?: Array<{ id: string; name: string; icon: string }>;
  images: Array<{ id: string; image: string }>;
  price: Array<{ name: string; price: number }>;
  status: string;
};
