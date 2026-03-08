import createRegularSolid from "../create-regular-solid.js";
import GOLDEN_RATIO from "../../constants/golden-ratio.constant.js";

const createTruncatedDodecahedron = ({ scale = .5, colors = [] }) => {
  return createRegularSolid({
    scale,
    colors,

    maximumNumberOfFaces: 32,
    baseVertices: [
      {
        position: { x: 0, y: 1 / GOLDEN_RATIO, z: 2 + GOLDEN_RATIO },
        signed: true,
        permutationType: `even`,
      },
      {
        position: { x: 1 / GOLDEN_RATIO, y: GOLDEN_RATIO, z: 2 * GOLDEN_RATIO },
        signed: true,
        permutationType: `even`,
      },
      {
        position: { x: GOLDEN_RATIO, y: 2, z: GOLDEN_RATIO + 1 },
        signed: true,
        permutationType: `even`,
      },
    ],
  });
}

export default createTruncatedDodecahedron;
