
import GOLDEN_RATIO from "../constants/golden-ratio.constant.js";
import createRegularSolid from "./create-regular-solid.js";

const createRegularIcosahedron = ({
  scale = 1,
  colors = [
    0x0000ffff,
    0x00ff00ff,
    0x00ffffff,
    0xff0000ff,
    0xff00ffff,
    0xffff00ff,
    0xffffffff,
    0x000080ff,
    0x008000ff,
    0x008080ff,
    0x800000ff,
    0x800080ff,
    0x808000ff,
    0x808080ff,
    0x00ff80ff,
    0x0080ffff,
    0xff0080ff,
    0x8000ffff,
    0xff8000ff,
    0x80ff00ff,
  ],
}) => {
  return createRegularSolid({
    scale,
    colors,

    maximumNumberOfFaces: 20,
    maximumNumberOfFacesShareTheSameVertex: 5,
    numberOfVerticesEachFace: [3],
    faceIndicesShiftings: [0, 1, 2, 0, 2, 1],
    baseVertices: [
      {
        position: { x: 0, y: 1, z: GOLDEN_RATIO },
        signed: true,
        rotateCount: 2,
      },
    ],
  });
}

export default createRegularIcosahedron;
