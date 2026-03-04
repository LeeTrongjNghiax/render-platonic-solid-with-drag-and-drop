const clamp = ({value = 0.5, min = 0, max = 1}) => {
  if (min === max) return 0;

  const n = (value - min) / (max - min);

  return Math.min(1, Math.max(0, n));
}

export default clamp;
