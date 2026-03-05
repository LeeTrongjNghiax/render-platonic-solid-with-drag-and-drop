const normalize = (a) => {
  let len = Math.hypot(a[0], a[1], a[2]);

  if (len > 0) len = 1 / len;

  const out = new Float32Array(3);

  out[0] = a[0] * len;
  out[1] = a[1] * len;
  out[2] = a[2] * len;

  return out;
}

export default normalize;
