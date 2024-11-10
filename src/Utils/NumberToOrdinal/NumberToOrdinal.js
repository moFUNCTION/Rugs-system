export function numberToOrdinal(num) {
  const specialCases = {
    1: "first",
    2: "second",
    3: "third",
    4: "fourth",
    5: "fifth",
    6: "sixth",
    7: "seventh",
    8: "eighth",
    9: "ninth",
    10: "tenth",
    11: "eleventh",
    12: "twelfth",
    13: "thirteenth",
    14: "fourteenth",
    15: "fifteenth",
    16: "sixteenth",
    17: "seventeenth",
    18: "eighteenth",
    19: "nineteenth",
  };

  const tensCases = {
    20: "twentieth",
    30: "thirtieth",
    40: "fortieth",
    50: "fiftieth",
    60: "sixtieth",
    70: "seventieth",
    80: "eightieth",
    90: "ninetieth",
  };

  // Handle special cases
  if (specialCases[num]) {
    return specialCases[num];
  }

  // Handle tens cases
  if (tensCases[num]) {
    return tensCases[num];
  }

  // Calculate the last digit and the tens
  const lastDigit = num % 10;
  const tens = num - lastDigit;

  // English suffixes for last digits
  const suffixes = {
    1: "first",
    2: "second",
    3: "third",
    4: "fourth",
    5: "fifth",
    6: "sixth",
    7: "seventh",
    8: "eighth",
    9: "ninth",
  };

  // Combine tens and last digit if applicable
  if (suffixes[lastDigit]) {
    return tensCases[tens]
      ? tensCases[tens] + "-" + suffixes[lastDigit] // Combine tens and last digit
      : suffixes[lastDigit]; // Just return the suffix if no tens case
  }

  return num + "th"; // Default case for other numbers, using "th" for general ordinal
}
