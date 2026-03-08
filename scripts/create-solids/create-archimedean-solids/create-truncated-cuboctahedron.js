import createRegularSolid from "../create-regular-solid.js";
import SILVER_RATIO from "../../constants/silver-ratio.constant.js";

const createTruncatedCuboctahedron = ({ scale = .4, colors = [] }) => {
  return createRegularSolid({
    scale,
    colors,

    maximumNumberOfFaces: 26,
    baseVertices: [
      {
        position: { x: 1, y: SILVER_RATIO, z: 1 + 2 * Math.SQRT2 },
        signed: true,
        permutationType: `all`,
      },
    ],
  });
}

export default createTruncatedCuboctahedron;
