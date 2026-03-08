import createRegularSolid from "../create-regular-solid.js";
import TRIBONACCI_CONSTANT from "../../constants/tribonacci-constant.constant.js";

const createSnubCube = ({ scale = .9, colors = [] }) => {
  return createRegularSolid({
    scale,
    colors,

    baseVertices: [
      {
        position: { x: 1, y: 1 / TRIBONACCI_CONSTANT, z: TRIBONACCI_CONSTANT },
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
        position: { x: 1, y: 1 / TRIBONACCI_CONSTANT, z: TRIBONACCI_CONSTANT },
        signed: true,
        permutationType: `odd`,
        conditions: [
          (x, y, z) => {
            const numberOfMinusSigns = [x, y, z].filter(value => value < 0).length;

            return numberOfMinusSigns % 2 === 1;
          },
        ],
      },
    ],
  });
}

export default createSnubCube;
