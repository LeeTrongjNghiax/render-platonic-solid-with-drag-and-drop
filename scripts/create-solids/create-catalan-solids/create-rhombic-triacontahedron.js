import GOLDEN_RATIO from "../../constants/golden-ratio.constant.js";
import RECIPROCAL_OF_GOLDEN_RATION from "../../constants/reciprocal-of-golden-ratio.constant.js";
import createRegularSolid from "../create-regular-solid.js";

const createRhombicTriacontahedron = ({ scale = 1, colors = [] }) => {
  return createRegularSolid({
    scale,
    colors,

    maximumNumberOfFacesShareTheSameVertex: 5,
    baseVertices: [
      {
        position: { x: 1, y: 1, z: 1 },
        signed: true,
      },
      {
        position: { x: 0, y: 1, z: GOLDEN_RATIO },
        signed: true,
        permutationType: `even`,
      },
      {
        position: { x: 0, y: GOLDEN_RATIO, z: RECIPROCAL_OF_GOLDEN_RATION },
        signed: true,
        permutationType: `even`,
      },
    ],
  });
}

export default createRhombicTriacontahedron;
