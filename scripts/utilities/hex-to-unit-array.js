const hexToUnitArray = (hex = 0x00000000) => {
  // Extracting 8-bit components
  const r = (hex >> 24) & 0xff;
  const g = (hex >> 16) & 0xff;
  const b = (hex >> 8) & 0xff;
  const a = hex & 0xff;

  // Returning normalized values [0.0 - 1.0]
  return [r / 255, g / 255, b / 255, a / 255];
};

export default hexToUnitArray;
