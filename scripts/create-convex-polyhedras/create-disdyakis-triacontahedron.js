import GOLDEN_RATIO from "../constants/golden-ratio.constant.js";
import RECIPROCAL_OF_GOLDEN_RATIO from "../constants/reciprocal-of-golden-ratio.constant.js";
import createRegularSolid from "./create-regular-solid.js";

const createDisdyakisTriacontahedron = ({ scale = 1, colors = [] }) => {
  const r = Math.sqrt(25 - 10 * Math.sqrt(5)) / 3;
  const s =

  return createRegularSolid({
    scale,
    colors,

    maximumNumberOfFaces: 32,
    maximumNumberOfFacesShareTheSameVertex: 4,
    numberOfVerticesEachFace: [3, 5],
    baseVertices: [
      {
        position: {
          x: GOLDEN_RATIO / 2,
          y: RECIPROCAL_OF_GOLDEN_RATIO / 2,
          z: 1 / 2,
        },
        signed: true,
        rotateCount: 0,
      },
      {
        position: { x: 1, y: 0, z: 0 },
        signed: true,
        rotateCount: 2,
      },
    ],
  });
}

export default createDisdyakisTriacontahedron;
