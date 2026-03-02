
import createRegularSolid from "./create-regular-solid.js";

const createRegularTetrahedron2 = ({
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
    faceIndicesShiftings: [0, 1, 2, 0, 2, 1],
    baseVertices: [
      {
        position: { x: 1, y: 1, z: 1 },
        signed: false,
        rotateCount: 0,
      },
      {
        position: { x: 1, y: -1, z: -1 },
        signed: false,
        rotateCount: 2,
      },
    ],
  });
}

export default createRegularTetrahedron2;
