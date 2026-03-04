import createRegularSolid from "./create-regular-solid.js";

const createRegularOctahedron = ({
  scale = 1.8,
  colors = [
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

    maximumNumberOfFaces: 8,
    maximumNumberOfFacesShareTheSameVertex: 4,
    numberOfVerticesEachFace: [3],
    baseVertices: [
      {
        position: { x: 0, y: 0, z: 1 },
        signed: true,
        rotateCount: 2,
      },
    ],
  });
}

export default createRegularOctahedron;
