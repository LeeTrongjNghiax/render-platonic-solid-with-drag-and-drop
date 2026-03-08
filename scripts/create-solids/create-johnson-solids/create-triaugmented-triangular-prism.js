import createRegularSolid from "../create-regular-solid.js";

const createTriaugmentedTriangularPrism = ({ scale = .9, colors = [] }) => {
  return createRegularSolid({
    scale,
    colors,

    maximumNumberOfFacesShareTheSameVertex: 5,
    baseVertices: [
      { position: { x: 0, y: 2 / Math.sqrt(3), z: 1 }, signed: false },
      { position: { x: 0, y: 2 / Math.sqrt(3), z: -1 }, signed: false },
      { position: { x: 1, y: -1 / Math.sqrt(3), z: 1 }, signed: false },
      { position: { x: 1, y: -1 / Math.sqrt(3), z: -1 }, signed: false },
      { position: { x: -1, y: -1 / Math.sqrt(3), z: 1 }, signed: false },
      { position: { x: -1, y: -1 / Math.sqrt(3), z: -1 }, signed: false },
      {
        position: { x: 0, y: -( (1 + Math.sqrt(6)) / Math.sqrt(3) ), z: 0 },
        signed: false,
      },
      {
        position: {
          x: ( ( 1 + Math.sqrt(6) ) / 2 ),
          y: ( 1 + Math.sqrt(6) ) / ( 2 * Math.sqrt(3) ),
          z: 0,
        },
        signed: false,
      },
      {
        position: {
          x: -( ( 1 + Math.sqrt(6) ) / 2 ),
          y: ( 1 + Math.sqrt(6) ) / ( 2 * Math.sqrt(3) ),
          z: 0,
        },
        signed: false,
      },
    ],
  });
}

export default createTriaugmentedTriangularPrism;
