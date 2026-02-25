import EPSILON from "../constants/epsilon.constant.js";

const roundTo = (num) => {
  if (Math.abs(num - 1) < EPSILON) return 1;
  
  if (Math.abs(num - 0) < EPSILON) return 0;

  return num;
};

export default roundTo;
