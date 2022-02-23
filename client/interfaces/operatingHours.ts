export interface hoursADay {
  openingTime: string;
  closingTime: string;
  isOpen: boolean;
}

export interface hoursHoliday extends hoursADay {
  date: string;
}
