import createRegularSolid from "../create-regular-solid.js";

const createRegularTetrahedron = ({ scale = 1, colors = [] }) => {
  return createRegularSolid({
    scale,
    colors,

    maximumNumberOfFacesShareTheSameVertex: 3,
    numberOfVerticesEachFace: [3],
    baseVertices: [
      { position: { x: 1, y: 1, z: 1 }, signed: false },
      {
        position: { x: 1, y: -1, z: -1 },
        signed: false,
        permutationType: `even`,
      },
    ],
  });
}

export default createRegularTetrahedron;
