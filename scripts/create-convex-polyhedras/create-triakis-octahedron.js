import RECIPROCAL_OF_SILVER_RATIO from "../constants/reciprocal-of-silver-ratio.constant.js";
import createRegularSolid from "./create-regular-solid.js";

const createTriakisOctahedron = ({
  scale = 1,
  colors = [
    0x000000ff,
    0x0000ffff,
    0x00ff00ff,
    0x00ffffff,
    0xff0000ff,
    0xff00ffff,
    0xffff00ff,
    0xffffffff,
    0x000000ff,
    0x0000ffff,
    0x00ff00ff,
    0x00ffffff,
    0xff0000ff,
    0xff00ffff,
    0xffff00ff,
    0xffffffff,
    0x000000ff,
    0x0000ffff,
    0x00ff00ff,
    0x00ffffff,
    0xff0000ff,
    0xff00ffff,
    0xffff00ff,
    0xffffffff,
  ],
}) => {
  return createRegularSolid({
    scale,
    colors,

    maximumNumberOfFaces: 24,
    maximumNumberOfFacesShareTheSameVertex: 8,
    numberOfVerticesEachFace: [3],
    faceIndicesShiftings: [0, 1, 2, 0, 2, 1],
    baseVertices: [
      {
        position: {
          x: RECIPROCAL_OF_SILVER_RATIO,
          y: RECIPROCAL_OF_SILVER_RATIO,
          z: RECIPROCAL_OF_SILVER_RATIO,
        },
        signed: true,
        rotateCount: 0,
      },
      {
        position: { x: 0, y: 0, z: 1 },
        signed: true,
        rotateCount: 2,
      },
    ],
  });
}

export default createTriakisOctahedron;
