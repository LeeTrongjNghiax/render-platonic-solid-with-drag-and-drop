import GOLDEN_RATIO from "../../constants/golden-ratio.constant.js";
import RECIPROCAL_OF_GOLDEN_RATION from "../../constants/reciprocal-of-golden-ratio.constant.js";
import createRegularSolid from "../create-regular-solid.js";

const createRegularDodecahedron = ({
  scale = 1,
  colors = [
    0xffffffff, // White
    0x800080ff, // Purple
    0x006400ff, // Dark Green
    0xffff00ff, // Yellow
    0x00008bff, // Dark Blue
    0xffa800ff, // Orange
    0x87ceebff, // Sky Blue
    0x32cd32ff, // Lime Green
    0xff0000ff, // Red
    0xf5f5dcff, // Beige
    0xff00ffff, // Pink
    0x808080ff, // Gray
  ],
}) => {
  return createRegularSolid({
    scale,
    colors,

    maximumNumberOfFacesShareTheSameVertex: 3,
    baseVertices: [
      { position: { x: 1, y: 1, z: 1 }, signed: true },
      {
        position: { x: 0, y: GOLDEN_RATIO, z: RECIPROCAL_OF_GOLDEN_RATION },
        signed: true,
        permutationType: `even`,
      }
    ],
  });
}

export default createRegularDodecahedron;
