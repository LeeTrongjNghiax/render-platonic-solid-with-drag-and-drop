const createTriakisTetrahedron = ({ scale = 1, colors = [] }) => {
  return createRegularSolid({
    scale,
    colors,

    baseVertices: [
      { position: { x: 0, y: 0, z: 0 }, signed: true },
    ],
  });
}

export default createTriakisTetrahedron;
