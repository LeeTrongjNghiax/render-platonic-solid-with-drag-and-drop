import createRegularSolid from "../create-regular-solid.js";

const createCuboctahedron = ({ scale = 1.3, colors = [] }) => {
  return createRegularSolid({
    scale,
    colors,

    maximumNumberOfFacesShareTheSameVertex: 4,
    baseVertices: [
      { position: { x: 0, y: 1, z: 1 }, signed: true, permutationType: `even` }
    ],
  });
}

export default createCuboctahedron;
