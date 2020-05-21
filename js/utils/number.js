export const isInAP = (a, d, x) => {
  if (d === 0) {
    return x === a;
  } else {
    const difference = x - a;
    if (isFloat(difference) || isFloat(d)) {
      let count = isFloat(difference) ? getDecimalValuesCount(difference) : 0;
      if (isFloat(d) && getDecimalValuesCount(d) > count) {
        count = getDecimalValuesCount(d);
      }
      const multiplier = Math.pow(10, count);
      return (
        (difference * multiplier) % (d * multiplier) === 0 &&
        (difference * multiplier) / (d * multiplier) >= 0
      );
    } else {
      return difference % d === 0 && difference / d >= 0;
    }
  }
};

const isFloat = n => {
  return Number(n) === n && n % 1 !== 0;
};

const getDecimalValuesCount = n => {
  return n.toString().length - (n.toString().indexOf('.') + 1);
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
