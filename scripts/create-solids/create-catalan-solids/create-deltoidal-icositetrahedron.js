const createDeltoidalIcositetrahedron = ({ scale = 1, colors = [] }) => {
  return createRegularSolid({
    scale,
    colors,

    maximumNumberOfFacesShareTheSameVertex: 5,
    numberOfVerticesEachFace: [4],
    baseVertices: [
      { position: { x: 1, y: 1, z: 1 }, signed: true },
    ],
  });
}

export default createDeltoidalIcositetrahedron;
