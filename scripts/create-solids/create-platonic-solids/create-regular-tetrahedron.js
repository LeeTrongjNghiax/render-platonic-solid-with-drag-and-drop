import createRegularSolid from "../create-regular-solid.js";

const createRegularTetrahedron = ({
  scale = 1,
  colors = [
    0x008b00ff, // Green
    0xffff00ff, // Yellow
    0xff0000ff, // Red
    0x0000ffff, // Blue
  ],
}) => {
  return createRegularSolid({
    scale,
    colors,

    maximumNumberOfFaces: 4,
    maximumNumberOfFacesShareTheSameVertex: 3,
    numberOfVerticesEachFace: [3],
    baseVertices: [
      {
        position: { x: 1, y: 1, z: 1 },
        signed: false,
      },
      {
        position: { x: 1, y: -1, z: -1 },
        signed: false,
        permutationType: `even`,
      },
    ],
  });
}

export default createRegularTetrahedron;
