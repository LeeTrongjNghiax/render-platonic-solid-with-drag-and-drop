import GOLDEN_RATIO from "../constants/golden-ratio.constant.js";
import RECIPROCAL_OF_GOLDEN_RATION from "../constants/reciprocal-of-golden-ratio.constant.js";
import createRegularSolid from "./create-regular-solid.js";

const createPentakisDodecahedron = ({
  scale = 1,
  colors = [
    0x000000ff,
    0x0000ffff,
    0x00ff00ff,
    0x00ffffff,
    0xff0000ff,
    0xff00ffff,
    0xffff00ff,
    0xffffffff,
    0x000000ff,
    0x0000ffff,
    0x00ff00ff,
    0x00ffffff,
    0xff0000ff,
    0xff00ffff,
    0xffff00ff,
    0xffffffff,
    0x000000ff,
    0x0000ffff,
    0x00ff00ff,
    0x00ffffff,
    0xff0000ff,
    0xff00ffff,
    0xffff00ff,
    0xffffffff,
  ],
}) => {
  const a = ( 3 * GOLDEN_RATIO + 12 ) / 19;

  return createRegularSolid({
    scale,
    colors,

    maximumNumberOfFaces: 60,
    maximumNumberOfFacesShareTheSameVertex: 5,
    numberOfVerticesEachFace: [3],
    baseVertices: [
      {
        position: { x: 0, y: a, z: GOLDEN_RATIO * a },
        signed: true,
        permutationType: `even`,
      },
      {
        position: { x: 1, y: 1, z: 1 },
        signed: true,
        permutationType: `none`,
      },
      {
        position: { x: 0, y: GOLDEN_RATIO, z: RECIPROCAL_OF_GOLDEN_RATION },
        signed: true,
        permutationType: `even`,
      },
    ],
  });
}

export default createPentakisDodecahedron;
