import createRegularSolid from "../create-regular-solid.js";

const createTetrakisHexahedron = ({ scale = 1, colors = [] }) => {
  return createRegularSolid({
    scale,
    colors,

    baseVertices: [
      { position: { x: 1, y: 1, z: 1 }, signed: true },
      {
        position: { x: 0, y: 0, z: 3 / 2 },
        signed: true,
        permutationType: `even`,
      },
    ],
  });
}

export default createTetrakisHexahedron;
