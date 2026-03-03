import SILVER_RATIO from "../constants/silver-ratio.constant.js";
import createRegularSolid from "./create-regular-solid.js";

const createRhombicuboctahedron = ({ scale = 1, colors = [] }) => {
  return createRegularSolid({
    scale,
    colors,

    maximumNumberOfFaces: 26,
    maximumNumberOfFacesShareTheSameVertex: 4,
    numberOfVerticesEachFace: [3, 4],
    baseVertices: [
      {
        position: { x: SILVER_RATIO, y: 1, z: 1 },
        signed: true,
        rotateCount: 2,
      },
    ],
  });
}

export default createRhombicuboctahedron;
