import createRegularSolid from "../create-regular-solid.js";

const createTruncatedIcosahedron = ({ scale = 1, colors = [] }) => {
  return createRegularSolid({
    scale,
    colors,

    baseVertices: [ { position: { x: 1, y: 1, z: 1 }, signed: true } ],
  });
}

export default createTruncatedIcosahedron;
