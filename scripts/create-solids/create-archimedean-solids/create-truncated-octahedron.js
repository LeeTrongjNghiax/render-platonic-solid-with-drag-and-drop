import createRegularSolid from "../create-regular-solid.js";

const createTruncatedOctahedron = ({ scale = 1, colors = [] }) => {
  return createRegularSolid({
    scale,
    colors,

    baseVertices: [
      {
        position: { x: Math.SQRT2, y: Math.SQRT2 / 2, z: 0 },
        signed: true,
        permutationType: `all`,
      },
    ],
  });
}

export default createTruncatedOctahedron;
