import createRegularSolid from "./create-regular-solid.js";

const createRhombicDodecahedron2 = ({
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
    0xff0000ff,
    0xff00ffff,
    0xffff00ff,
    0xffffffff,
  ],
}) => {
  return createRegularSolid({
    scale,
    colors,

    maximumNumberOfFaces: 12,
    maximumNumberOfFacesShareTheSameVertex: 4,
    numberOfVerticesEachFace: [4],
    faceIndicesShiftings: [0, 1, 2, 0, 2, 1, 0, 1, 3, 0, 3, 1],
    baseVertices: [
      {
        position: { x: 1, y: 1, z: 1 },
        signed: true,
        rotateCount: 0,
      },
      {
        position: { x: 0, y: 0, z: 2 },
        signed: true,
        rotateCount: 2,
      },
    ],
  });
}

export default createRhombicDodecahedron2;
