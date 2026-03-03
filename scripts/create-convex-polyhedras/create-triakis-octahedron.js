import RECIPROCAL_OF_SILVER_RATIO from "../constants/reciprocal-of-silver-ratio.constant.js";
import createRegularSolid from "./create-regular-solid.js";

const createTriakisOctahedron = ({ scale = 1, colors = [] }) => {
  return createRegularSolid({
    scale,
    colors,

    maximumNumberOfFaces: 24,
    maximumNumberOfFacesShareTheSameVertex: 8,
    numberOfVerticesEachFace: [3],
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
