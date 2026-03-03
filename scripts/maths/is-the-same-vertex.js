import roundTo from "../utilities/round-to.js";

const isTheSameVertex = (
  vertexA = { x: 0, y: 0, z: 0 },
  vertexB = { x: 0, y: 0, z: 0 },
) => {
  return roundTo(vertexA.x) === roundTo(vertexB.x) &&
         roundTo(vertexA.y) === roundTo(vertexB.y) &&
         roundTo(vertexA.z) === roundTo(vertexB.z);
}

export default isTheSameVertex;
