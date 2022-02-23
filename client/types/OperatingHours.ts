import { Days } from "../enums/operatingHours";
import { hoursADay, hoursHoliday } from "../interfaces/operatingHours";

export type OperatingHours = {
  [key in Days]: hoursADay | hoursHoliday;
};
