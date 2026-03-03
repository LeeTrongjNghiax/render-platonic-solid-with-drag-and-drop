const createRandomHexColor = (isOpaque = true) => {
  if (isOpaque) {
    // Generate 24-bit random number (6 hex digits)
    const rgb = Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');
    return `0x${rgb}ff`;
  } else {
    // Generate 32-bit random number (8 hex digits)
    const rgba = (Math.random() * 0xffffffff >>> 0).toString(16).padStart(8, '0');
    return `0x${rgba}`;
  }
};

export default createRandomHexColor;
