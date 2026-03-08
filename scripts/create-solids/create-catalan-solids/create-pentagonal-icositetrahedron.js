import TRIBONACCI_CONSTANT from "../../constants/tribonacci-constant.constant.js";
import createRegularSolid from "../create-regular-solid.js";

const createPentagonalIcositetrahedron = ({ scale = .3, colors = [] }) => {
  return createRegularSolid({
    scale,
    colors,

    baseVertices: [
      {
        position: {
          x: 1,
          y: 2 * TRIBONACCI_CONSTANT + 1,
          z: TRIBONACCI_CONSTANT * TRIBONACCI_CONSTANT,
        },
        signed: true,
        permutationType: `even`,
        conditions: [
          (x, y, z) => {
            const numberOfMinusSigns = [x, y, z].filter(value => value < 0).length;

            return numberOfMinusSigns % 2 === 0;
          },
        ],
      },
      {
        position: {
          x: 1,
          y: 2 * TRIBONACCI_CONSTANT + 1,
          z: TRIBONACCI_CONSTANT * TRIBONACCI_CONSTANT,
        },
        signed: true,
        permutationType: `odd`,
        conditions: [
          (x, y, z) => {
            const numberOfMinusSigns = [x, y, z].filter(value => value < 0).length;

            return numberOfMinusSigns % 2 === 1;
          },
        ],
      },
      {
        position: { x: TRIBONACCI_CONSTANT ** 3, y: 0, z: 0 },
        signed: true,
        permutationType: `even`,
      },
      {
        position: {
          x: TRIBONACCI_CONSTANT ** 2,
          y: TRIBONACCI_CONSTANT ** 2,
          z: TRIBONACCI_CONSTANT ** 2,
        },
        signed: true,
      },
    ],
  });
}

export default createPentagonalIcositetrahedron;
