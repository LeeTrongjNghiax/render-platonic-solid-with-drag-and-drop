import GOLDEN_RATIO from "../../constants/golden-ratio.constant.js";
import createRegularSolid from "../create-regular-solid.js";

const createIcosidodecahedron = ({ scale = 1.9, colors = [] }) => {
  return createRegularSolid({
    scale,
    colors,

    maximumNumberOfFaces: 32,
    maximumNumberOfFacesShareTheSameVertex: 4,
    numberOfVerticesEachFace: [3, 5],
    baseVertices: [
      {
        position: { x: 1, y: 0, z: 0 },
        signed: true,
        permutationType: `even`,
      },
      {
        position: {
          x: GOLDEN_RATIO / 2,
          y: 1 / (GOLDEN_RATIO * 2),
          z: 1 / 2,
        },
        signed: true,
        permutationType: `even`,
      },
    ],
  });
}

export default createIcosidodecahedron;
