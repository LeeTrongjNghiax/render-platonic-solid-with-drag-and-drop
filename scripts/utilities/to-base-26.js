import NUMBER_OF_CHARACTER_IN_ENGLISH_ALPHABET from "../constants/number-of-character-in-english-alphabet.js";
import ENGLISH_ALPHABET from "../constants/english-alphabet.js";

const toBase26 = (num) => {
  if (num === 0) return ENGLISH_ALPHABET[0];

  let result = '';

  while (num > 0) {
    const remainder = num % NUMBER_OF_CHARACTER_IN_ENGLISH_ALPHABET;
    result = ENGLISH_ALPHABET[remainder] + result;

    num = Math.floor(num / NUMBER_OF_CHARACTER_IN_ENGLISH_ALPHABET);
  }

  return result;
};

export default toBase26;
