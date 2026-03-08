import GOLDEN_RATIO from "../../constants/golden-ratio.constant.js";
import createRegularSolid from "../create-regular-solid.js";

const createRegularIcosahedron = ({ scale = 1, colors = [] }) => {
  return createRegularSolid({
    scale,
    colors,

    baseVertices: [
      {
        position: { x: 0, y: 1, z: GOLDEN_RATIO },
        signed: true,
        permutationType: `even`,
      },
    ],
  });
}

export default createRegularIcosahedron;
