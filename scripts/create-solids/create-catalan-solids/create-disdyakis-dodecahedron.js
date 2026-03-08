import createRegularSolid from "../create-regular-solid.js";

const createDisdyakisDodecahedron = ({ scale = 7, colors = [] }) => {
  const a = 1 / (1 + 2 * Math.SQRT2);
  const b = 1 / (2 + 3 * Math.SQRT2);
  const c = 1 / (3 + 3 * Math.SQRT2);

  return createRegularSolid({
    scale,
    colors,

    baseVertices: [
      { position: { x: a, y: 0, z: 0 }, signed: true, permutationType: `even` },
      { position: { x: b, y: b, z: 0 }, signed: true, permutationType: `even` },
      { position: { x: c, y: c, z: c }, signed: true },
    ],
  });
}

export default createDisdyakisDodecahedron;
