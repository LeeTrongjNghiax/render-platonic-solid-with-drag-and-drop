import GOLDEN_RATIO from "../../constants/golden-ratio.constant.js";
import createRegularSolid from "../create-regular-solid.js";

const createPentagonalPyramid = ({ scale = 1, colors = [] }) => {
  return createRegularSolid({
    scale,
    colors,

    baseVertices: [
      { position: { x: 1, y: 0, z: GOLDEN_RATIO }, signed: false },
      { position: { x: -1, y: 0, z: GOLDEN_RATIO }, signed: false },
      { position: { x: 0, y: GOLDEN_RATIO, z: 1 }, signed: false },
      { position: { x: 0, y: -GOLDEN_RATIO, z: 1 }, signed: false },
      { position: { x: GOLDEN_RATIO, y: 1, z: 0 }, signed: false },
      { position: { x: GOLDEN_RATIO, y: -1, z: 0 }, signed: false },
    ],
  });
}

export default createPentagonalPyramid;
