import GOLDEN_RATIO from "../constants/golden-ratio.constant.js";
import RECIPROCAL_OF_GOLDEN_RATION from "../constants/reciprocal-of-golden-ratio.constant.js";
import createRegularSolid from "./create-regular-solid.js";

const createTriakisIcosahedron = ({ scale = 1, colors = [] }) => {
  const a = Math.sqrt(GOLDEN_RATIO ** GOLDEN_RATIO + 1);
  const b = Math.sqrt(25 + 2 * Math.sqrt(5)) / 11;

  return createRegularSolid({
    scale,
    colors,

    maximumNumberOfFaces: 60,
    maximumNumberOfFacesShareTheSameVertex: 10,
    numberOfVerticesEachFace: [3],
    baseVertices: [
      {
        position: { x: 0, y: 1 / a, z: GOLDEN_RATIO / a },
        signed: true,
        rotateCount: 2,
      },
      {
        position: { x: b, y: b, z: b },
        signed: true,
        rotateCount: 0,
      },
      {
        position: {
          x: 0,
          y: GOLDEN_RATIO * b,
          z: RECIPROCAL_OF_GOLDEN_RATION * b
        },
        signed: true,
        rotateCount: 2,
      },
    ],
  });
}

export default createTriakisIcosahedron;
