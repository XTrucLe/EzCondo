import React from "react";
import { Ionicons, FontAwesome5, FontAwesome6 } from "@expo/vector-icons";

export const ICON_SIZE = 36;

export const COLORS = {
  icon: "#3674B5",
  services: [
    "#75B4F3",
    "#FF8888",
    "#72DAD4",
    "#FFC04D",
    "#BB8FCE",
    "#EF736B",
    "#7DDC84",
    "#7FBCE9",
  ],
};

export const UTILITIES_LIST = [
  { id: "1", name: "parking", icon: "car", color: "#FFA94D", page: "parking" },
  {
    id: "2",
    name: "electricity",
    icon: "flash",
    color: "#FECA57",
    page: "seviceFees",
  },
  { id: "3", name: "water", icon: "water", color: "#54A0FF", page: "water" },
  {
    id: "4",
    name: "apartmentMember",
    icon: "person",
    color: "#5F27CD",
    page: "apartmentMember",
  },
];

export const SERVICES_LIST = [
  {
    id: "Pool",
    name: "swimming",
    icon: (
      <FontAwesome6 name="person-swimming" size={ICON_SIZE} color="white" />
    ),
    page: "pool",
  },
  {
    id: "Steam",
    name: "sauna",
    icon: <FontAwesome5 name="hot-tub" size={ICON_SIZE} color="white" />,
    page: "steamRoom",
  },
  {
    id: "Fitness",
    name: "gym",
    icon: <Ionicons name="barbell" size={ICON_SIZE} color="white" />,
    page: "fitnessCenter",
  },
  {
    id: "Children",
    name: "childrenPlayArea",
    icon: <FontAwesome6 name="children" size={ICON_SIZE} color="white" />,
    page: "childrenPlayground",
  },
  {
    id: "Laundry",
    name: "laundry",
    icon: <Ionicons name="shirt-outline" size={ICON_SIZE} color="white" />,
    page: "laundry",
  },
  {
    id: "5",
    name: "incident",
    icon: <Ionicons name="alert-circle" size={ICON_SIZE} color="white" />,
    page: "incident",
  },
  {
    id: "6",
    name: "paymentFee",
    icon: <Ionicons name="cash" size={ICON_SIZE} color="white" />,
    page: "detail_fee",
  },
  {
    id: "support",
    name: "support",
    icon: <Ionicons name="help-circle" size={ICON_SIZE} color="white" />,
    page: "support",
  },
];
