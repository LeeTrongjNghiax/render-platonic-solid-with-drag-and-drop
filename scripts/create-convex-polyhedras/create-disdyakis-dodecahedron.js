import createRegularSolid from "./create-regular-solid.js";

const createDisdyakisDodecahedron = ({ scale = 7, colors = [] }) => {
  const a = 1 / (1 + 2 * Math.sqrt(2));
  const b = 1 / (2 + 3 * Math.sqrt(2));
  const c = 1 / (3 + 3 * Math.sqrt(2));

  return createRegularSolid({
    scale,
    colors,

    maximumNumberOfFaces: 48,
    maximumNumberOfFacesShareTheSameVertex: 8,
    numberOfVerticesEachFace: [3],
    baseVertices: [
      {
        position: { x: a, y: 0, z: 0 },
        signed: true,
        permutationType: `even`,
      },
      {
        position: { x: b, y: b, z: 0 },
        signed: true,
        permutationType: `even`,
      },
      {
        position: { x: c, y: c, z: c },
        signed: true,
        permutationType: `none`,
      },
    ],
  });
}

export default createDisdyakisDodecahedron;
