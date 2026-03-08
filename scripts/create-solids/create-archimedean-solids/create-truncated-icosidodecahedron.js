import createRegularSolid from "../create-regular-solid.js";
import GOLDEN_RATIO from "../../constants/golden-ratio.constant.js";

const createTruncatedIcosaidodecahedron = ({ scale = .4, colors = [] }) => {
  return createRegularSolid({
    scale,
    colors,

    maximumNumberOfFaces: 62,
    baseVertices: [
      {
        position: {
          x: 1 / GOLDEN_RATIO,
          y: 1 / GOLDEN_RATIO,
          z: 3 + GOLDEN_RATIO,
        },
        signed: true,
        permutationType: `even`,
      },
      {
        position: {
          x: 2 / GOLDEN_RATIO,
          y: GOLDEN_RATIO,
          z: 1 + 2 * GOLDEN_RATIO,
        },
        signed: true,
        permutationType: `even`,
      },
      {
        position: {
          x: 1 / GOLDEN_RATIO,
          y: GOLDEN_RATIO ** 2,
          z: -1 + 3 * GOLDEN_RATIO,
        },
        signed: true,
        permutationType: `even`,
      },
      {
        position: {
          x: 2 * GOLDEN_RATIO - 1,
          y: 2,
          z: 2 + GOLDEN_RATIO,
        },
        signed: true,
        permutationType: `even`,
      },
      {
        position: {
          x: GOLDEN_RATIO,
          y: 3,
          z: 2 * GOLDEN_RATIO,
        },
        signed: true,
        permutationType: `even`,
      },
    ],
  });
}

export default createTruncatedIcosaidodecahedron;
