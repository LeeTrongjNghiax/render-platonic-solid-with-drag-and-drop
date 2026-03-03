
import createRegularSolid from "./create-regular-solid.js";

const createRegularHexahedron = ({
  scale = 1,
  colors = [
    0xffffffff, // White
    0x008b00ff, // Green
    0xffff00ff, // Yellow
    0xff0000ff, // Red
    0x0000ffff, // Blue
    0xffa800ff, // Orange
  ],
}) => {
  return createRegularSolid({
    scale,
    colors,

    maximumNumberOfFaces: 6,
    maximumNumberOfFacesShareTheSameVertex: 3,
    numberOfVerticesEachFace: [4],
    baseVertices: [
      {
        position: { x: 1, y: 1, z: 1 },
        signed: true,
        rotateCount: 0,
      },
    ],
  });
}

export default createRegularHexahedron;
