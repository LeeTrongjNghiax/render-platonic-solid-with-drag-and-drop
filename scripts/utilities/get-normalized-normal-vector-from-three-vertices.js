const getNormalizedNormalVectorFromThreeVertices = ({
  vertexA = { x: 1, y: 0, z: 0 },
  vertexB = { x: 0, y: 1, z: 0 },
  vertexC = { x: 0, y: 0, z: 1 },
}) => {
  const vectorA = {
    x: vertexB.x - vertexA.x,
    y: vertexB.y - vertexA.y,
    z: vertexB.z - vertexA.z,
  }

  const vectorB = {
    x: vertexC.x - vertexA.x,
    y: vertexC.y - vertexA.y,
    z: vertexC.z - vertexA.z,
  }

  const normal = {
    x: vectorA.y * vectorB.z - vectorA.z * vectorB.y,
    y: vectorA.z * vectorB.x - vectorA.x * vectorB.z,
    z: vectorA.x * vectorB.y - vectorA.y * vectorB.x,
  }

  const normalizedNormal = {
    x: normal.x / Math.sqrt(normal.x * normal.x + normal.y * normal.y + normal.z * normal.z),
    y: normal.y / Math.sqrt(normal.x * normal.x + normal.y * normal.y + normal.z * normal.z),
    z: normal.z / Math.sqrt(normal.x * normal.x + normal.y * normal.y + normal.z * normal.z),
  };

  return normalizedNormal;
}

export default getNormalizedNormalVectorFromThreeVertices;
