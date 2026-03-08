import createRegularSolid from "../create-regular-solid.js";

const createRhombicDodecahedron = ({
  scale = 2 * Math.SQRT2 / 3,
  colors = [],
}) => {
  return createRegularSolid({
    scale,
    colors,

    maximumNumberOfFacesShareTheSameVertex: 4,
    baseVertices: [
      {
        position: { x: 1, y: 1, z: 1 },
        signed: true,
      },
      {
        position: { x: 0, y: 0, z: 2 },
        signed: true,
        permutationType: `even`,
      },
    ],
  });
}

export default createRhombicDodecahedron;
