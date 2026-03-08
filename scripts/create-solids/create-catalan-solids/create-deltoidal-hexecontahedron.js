const createDeltoidalHexecontahedron = ({ scale = 1, colors = [] }) => {
  return createRegularSolid({
    scale,
    colors,

    maximumNumberOfFacesShareTheSameVertex: 3,
    numberOfVerticesEachFace: [4],
    baseVertices: [
      {
        position: { x: 0, y: 0, z: 0 },
        signed: true,
      },
    ],
  });
}

export default createDeltoidalHexecontahedron;
