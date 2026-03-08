import createRegularSolid from "../create-regular-solid.js";

const createGyroelongatedSquareBipyramid = ({ scale = 1, colors = [] }) => {
  return createRegularSolid({
    scale,
    colors,

    maximumNumberOfFacesShareTheSameVertex: 5,
    numberOfVerticesEachFace: [3],
    baseVertices: [
      { position: { x: 1, y: 1, z: 2 ** (-1 / 4) }, signed: false },
      { position: { x: 1, y: -1, z: 2 ** (-1 / 4) }, signed: false },
      { position: { x: -1, y: 1, z: 2 ** (-1 / 4) }, signed: false },
      { position: { x: -1, y: -1, z: 2 ** (-1 / 4) }, signed: false },
      {
        position: { x: Math.SQRT2, y: 0, z: -(2 ** (-1 / 4)) },
        signed: false,
      },
      {
        position: { x: -Math.SQRT2, y: 0, z: -(2 ** (-1 / 4)) },
        signed: false,
      },
      {
        position: { x: 0, y: Math.SQRT2, z: -(2 ** (-1 / 4)) },
        signed: false,
      },
      {
        position: { x: 0, y: -Math.SQRT2, z: -(2 ** (-1 / 4)) },
        signed: false,
      },
      {
        position: { x: 0, y: 0, z: ( 2 ** (-1 / 4) + Math.SQRT2 ) },
        signed: false,
      },
      {
        position: { x: 0, y: 0, z: -( 2 ** (-1 / 4) + Math.SQRT2 ) },
        signed: false,
      },
    ],
  });
}

export default createGyroelongatedSquareBipyramid;
