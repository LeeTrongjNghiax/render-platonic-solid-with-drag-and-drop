const cross = (a, b) => {
  const ax = a[0];
  const ay = a[1];
  const az = a[2];

  const bx = b[0];
  const by = b[1];
  const bz = b[2];

  const out = new Float32Array(3);

  out[0] = ay * bz - az * by;
  out[1] = az * bx - ax * bz;
  out[2] = ax * by - ay * bx;

  return out;
}

export default cross;
