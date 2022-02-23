export const isRound = (number: number) => {
  if (number % 1 != 0) {
    return false;
  }
  return true;
};

export const parseNum = (number: number) => {
  if (isRound(number)) {
    return number;
  }
  return number.toFixed(2);
};
