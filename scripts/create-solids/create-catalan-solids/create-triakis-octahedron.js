import RECIPROCAL_OF_SILVER_RATIO from "../../constants/reciprocal-of-silver-ratio.constant.js";
import createRegularSolid from "../create-regular-solid.js";

const createTriakisOctahedron = ({ scale = 2, colors = [] }) => {
  return createRegularSolid({
    scale,
    colors,

    baseVertices: [
      {
        position: {
          x: RECIPROCAL_OF_SILVER_RATIO,
          y: RECIPROCAL_OF_SILVER_RATIO,
          z: RECIPROCAL_OF_SILVER_RATIO,
        },
        signed: true,
      },
      {
        position: { x: 0, y: 0, z: 1 },
        signed: true,
        permutationType: `even`,
      },
    ],
  });
}

export default createTriakisOctahedron;
