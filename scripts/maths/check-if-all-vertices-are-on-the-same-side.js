import dot from "./dot.js";

const checkIfAllVerticesAreOnTheSameSide = ({
  vertices = [],
  normal = { x: 0, y: 0, z: 0 },
  d = 0,
}) => {
  const isOnTheSameSide = vertices.every(vertex => {
    const side = dot(
      [normal.x, normal.y, normal.z],
      [vertex.position.x, vertex.position.y, vertex.position.z],
    ) + d;

    return side > 0;
  });

  const isOnTheOppositeSide = vertices.every(vertex => {
    const side = dot(
      [normal.x, normal.y, normal.z],
      [vertex.position.x, vertex.position.y, vertex.position.z],
    ) + d;

    return side < 0;
  });

  return isOnTheSameSide || isOnTheOppositeSide;
}

export default checkIfAllVerticesAreOnTheSameSide;
