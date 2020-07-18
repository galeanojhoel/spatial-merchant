function isRomanNumber(letter) {
  const romanNumbers = process.env.VUE_APP_ROMAN_NUMBERS.split(',');
  return romanNumbers.indexOf(letter) !== -1;
}

function romanNumbersToDecimal(numerals) {
  const romanNumbers = process.env.VUE_APP_ROMAN_NUMBERS.split(',');
  const romanNumberValues = process.env.VUE_APP_ROMAN_NUMBERS_VALUE.split(',');

  return numerals.map(numeral => {
    if (isRomanNumber(numeral)) {
      const i = romanNumbers.indexOf(numeral);
      return Number(romanNumberValues[i]);
    } else {
      return -1;
    }
  });
}

export function resolveNumber(numberAsArray) {
  const numbers = romanNumbersToDecimal(numberAsArray);
  const numbersQty = numbers.length;

  const toSum = numbers.reduce((acc, value, i) => {
    if (i !== 0) { // if not first
      if (acc[i -1] < value) {
        acc[i -1] *= -1;
      }
    }

    acc.push(value)
    return acc;
  }, []);

  return toSum.reduce((acc, value) => acc + value, 0);
}
