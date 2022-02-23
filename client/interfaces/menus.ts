import { Food } from "./food";

export interface Menus {
  _id?: string;
  restaurant: string;
  item: Food[];
}
