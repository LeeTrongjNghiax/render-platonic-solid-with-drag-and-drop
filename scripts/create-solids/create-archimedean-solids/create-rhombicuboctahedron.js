import SILVER_RATIO from "../../constants/silver-ratio.constant.js";
import createRegularSolid from "../create-regular-solid.js";

const createRhombicuboctahedron = ({ scale = .7, colors = [] }) => {
  return createRegularSolid({
    scale,
    colors,

    maximumNumberOfFaces: 62,
    baseVertices: [
      {
        position: { x: SILVER_RATIO, y: 1, z: 1 },
        signed: true,
        permutationType: `even`,
      },
    ],
  });
}

export default createRhombicuboctahedron;
