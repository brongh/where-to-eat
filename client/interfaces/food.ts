import { Ratings } from "../enums/ratings";

export interface Food {
  _id?: string;
  name: string;
  price: string;
  description: string;
  available: boolean;
  ratingRecord: number[] | null;
  rating: null | Ratings;
  numberOfRatings: null | number;
}
