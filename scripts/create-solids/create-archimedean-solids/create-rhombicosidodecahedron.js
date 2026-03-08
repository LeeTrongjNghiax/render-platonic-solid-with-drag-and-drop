import GOLDEN_RATIO from "../../constants/golden-ratio.constant.js";
import createRegularSolid from "../create-regular-solid.js";

const createRhombicosidodecahedron = ({ scale = .4, colors = [] }) => {
  return createRegularSolid({
    scale,
    colors,

    baseVertices: [
      {
        position: { x: 1, y: 1, z: GOLDEN_RATIO ** 3 },
        signed: true,
        permutationType: `even`,
      },
      {
        position: {
          x: GOLDEN_RATIO ** 2,
          y: GOLDEN_RATIO,
          z: 2 * GOLDEN_RATIO,
        },
        signed: true,
        permutationType: `even`,
      },
      {
        position: { x: 2 + GOLDEN_RATIO, y: 0, z: GOLDEN_RATIO ** 2 },
        signed: true,
        permutationType: `even`,
      },
    ],
  });
}

export default createRhombicosidodecahedron;
