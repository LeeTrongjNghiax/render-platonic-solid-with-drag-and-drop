import createRegularSolid from "../create-regular-solid.js";

const createTruncatedTetrahedron = ({ scale = 1.5, colors = [] }) => {
  return createRegularSolid({
    scale,
    colors,

    maximumNumberOfFacesShareTheSameVertex: 3,
    baseVertices: [
      {
        position: {
          x: 3 * Math.SQRT2 / 4,
          y: Math.SQRT2 / 4,
          z: Math.SQRT2 / 4,
        },
        signed: true,
        permutationType: `even`,
        conditions: [
          (x, y, z) => {
            const numberOfMinusSigns = [x, y, z].filter(value => value < 0).length;

            return numberOfMinusSigns % 2 === 0;
          },
        ],
      },
    ],
  });
}

export default createTruncatedTetrahedron;
