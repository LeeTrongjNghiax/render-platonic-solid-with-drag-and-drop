import SILVER_RATIO from "../../constants/silver-ratio.constant.js";
import createRegularSolid from "../create-regular-solid.js";

const createRhombicuboctahedron = ({ scale = 0.6, colors = [] }) => {
  return createRegularSolid({
    scale,
    colors,

    maximumNumberOfFacesShareTheSameVertex: 4,
    numberOfVerticesEachFace: [3, 4],
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
