import createRegularSolid from "../create-regular-solid.js";

const createSnubDodecahedron = ({ scale = 1, colors = [] }) => {
  return createRegularSolid({
    scale,
    colors,

    baseVertices: [ { position: { x: 1, y: 1, z: 1 }, signed: true } ],
  });
}

export default createSnubDodecahedron;
