import GOLDEN_RATIO from "../constants/golden-ratio.constant.js";
import createRegularSolid from "./create-regular-solid.js";

const createDisdyakisTriacontahedron = ({ scale = 1.8, colors = [] }) => {
  const r = Math.sqrt(25 - 10 * Math.sqrt(5)) / 3;
  const s = ( (2 * Math.sqrt(5) - 3) * Math.sqrt(25 + 10 * Math.sqrt(5)) ) / 11;

  return createRegularSolid({
    scale,
    colors,

    maximumNumberOfFaces: 120,
    maximumNumberOfFacesShareTheSameVertex: 10,
    numberOfVerticesEachFace: [3],
    baseVertices: [
      {
        position: {
          x: 0,
          y: 1 / Math.sqrt(GOLDEN_RATIO + 2),
          z: GOLDEN_RATIO / Math.sqrt(GOLDEN_RATIO + 2),
        },
        signed: true,
        rotateCount: 2,
      },
      {
        position: { x: r, y: r, z: r },
        signed: true,
        rotateCount: 0,
      },
      {
        position: { x: 0, y: r * GOLDEN_RATIO, z: r / GOLDEN_RATIO },
        signed: true,
        rotateCount: 2,
      },
      {
        position: { x: s, y: 0, z: 0 },
        signed: true,
        rotateCount: 2,
      },
      {
        position: {
          x: s * GOLDEN_RATIO / 2,
          y: s / 2,
          z: s / (2 * GOLDEN_RATIO),
        },
        signed: true,
        rotateCount: 2,
      },
    ],
  });
}

export default createDisdyakisTriacontahedron;
