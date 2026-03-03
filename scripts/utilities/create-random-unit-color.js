const createRandomUnitColor = () => {
  const r = Math.random();
  const g = Math.random();
  const b = Math.random();

  return [r, g, b, 1];
}

export default createRandomUnitColor;