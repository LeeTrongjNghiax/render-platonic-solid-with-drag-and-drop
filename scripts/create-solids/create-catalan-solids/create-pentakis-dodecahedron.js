import GOLDEN_RATIO from "../../constants/golden-ratio.constant.js";
import RECIPROCAL_OF_GOLDEN_RATION from "../../constants/reciprocal-of-golden-ratio.constant.js";
import createRegularSolid from "../create-regular-solid.js";

const createPentakisDodecahedron = ({ scale = 1, colors = [] }) => {
  const a = ( 3 * GOLDEN_RATIO + 12 ) / 19;

  return createRegularSolid({
    scale,
    colors,

    maximumNumberOfFaces: 60,
    maximumNumberOfFacesShareTheSameVertex: 5,
    numberOfVerticesEachFace: [3],
    baseVertices: [
      {
        position: { x: 0, y: a, z: GOLDEN_RATIO * a },
        signed: true,
        permutationType: `even`,
      },
      {
        position: { x: 1, y: 1, z: 1 },
        signed: true,
      },
      {
        position: { x: 0, y: GOLDEN_RATIO, z: RECIPROCAL_OF_GOLDEN_RATION },
        signed: true,
        permutationType: `even`,
      },
    ],
  });
}

export default createPentakisDodecahedron;
