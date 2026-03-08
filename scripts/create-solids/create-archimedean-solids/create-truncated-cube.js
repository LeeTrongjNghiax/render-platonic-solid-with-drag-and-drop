import SILVER_RATIO from "../../constants/silver-ratio.constant.js";
import createRegularSolid from "../create-regular-solid.js";

const createTruncatedCube = ({ scale = 1.3, colors = [] }) => {
  return createRegularSolid({
    scale,
    colors,

    baseVertices: [
      {
        position: { x: 1 / SILVER_RATIO, y: 1, z: 1 },
        signed: true,
        permutationType: `even`,
      },
    ],
  });
}

export default createTruncatedCube;
