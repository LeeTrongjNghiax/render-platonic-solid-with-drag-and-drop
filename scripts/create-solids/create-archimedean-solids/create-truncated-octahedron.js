import createRegularSolid from "../create-regular-solid.js";

const createRegularHexahedron = ({ scale = 1, colors = [] }) => {
  return createRegularSolid({
    scale,
    colors,

    maximumNumberOfFacesShareTheSameVertex: 3,
    baseVertices: [
      { position: { x: 1, y: 1, z: 1 }, signed: true },
    ],
  });
}

export default createRegularHexahedron;
