import { Ratings } from "../enums/ratings";
import { OperatingHours } from "../types/OperatingHours";
import { Menus } from "./menus";

export interface IRestaurants {
  _id?: string;
  id?: string;
  contactNumber: string;
  menu: null | Menus;
  name: string;
  numberOfRatings: number;
  operatingHours: null | OperatingHours;
  address: Address;
  rating: null | Ratings;
  ratingRecord: null | number[];
  __v?: any;
}

export interface Address {
  street: string;
  postalCode: string;
  block: string;
  location: {
    type: string;
    coordinates: number[];
  };
}
