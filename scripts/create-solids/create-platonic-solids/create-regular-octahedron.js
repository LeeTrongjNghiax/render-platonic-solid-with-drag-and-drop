import createRegularSolid from "../create-regular-solid.js";

const createRegularOctahedron = ({ scale = 1.8, colors = [] }) => {
  return createRegularSolid({
    scale,
    colors,

    maximumNumberOfFacesShareTheSameVertex: 4,
    numberOfVerticesEachFace: [3],
    baseVertices: [
      {
        position: { x: 0, y: 0, z: 1 },
        signed: true,
        permutationType: `even`,
      },
    ],
  });
}

export default createRegularOctahedron;
