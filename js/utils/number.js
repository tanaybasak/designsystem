export const isInAP = (a, d, x) => {
  if (d === 0) {
    return x === a;
  } else {
    return (x - a) % d === 0 && (x - a) / d >= 0;
  }
};

export const findMinMax = (a, d, x) => {
  const number = x / d + 1;
  const minV = Math.floor(number);
  const maxV = Math.ceil(number);

  return [a + (minV - 1) * d, a + (maxV - 1) * d];
};

export const getNumberFromString = stringValue => {
  let isNegative = false;
  if (stringValue[0] === '-') {
    isNegative = true;
  }
  const value = (isNegative ? stringValue.substr(1) : stringValue).replace(
    /[^0-9.]/g,
    ''
  );
  return isNegative ? '-' + value : value;
};
