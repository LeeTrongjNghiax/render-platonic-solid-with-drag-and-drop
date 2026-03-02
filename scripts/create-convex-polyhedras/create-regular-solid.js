import getNormalizedNormalVectorFromThreeVertices from "../utilities/get-normalized-normal-vector-from-three-vertices.js";
import roundTo from "../utilities/round-to.js";
import dot from "../maths/dot.js";
import hexToUnitArray from "../utilities/hex-to-unit-array.js";

const isTheSameVertex = (vertexA, vertexB) => {
  return vertexA.x === vertexB.x &&
         vertexA.y === vertexB.y &&
         vertexA.z === vertexB.z;
}

const debugVertices = (vertices) => {
  console.log(`debug vertices`);

  vertices.forEach(vertex => {
    console.log(vertex.position);
  });
}

const checkIfAllVerticesAreOnTheSameSide = (vertices, normal, d) => {
  const isOnTheSameSide = vertices.every(vertex => {
    const side = normal.x * vertex.position.x
               + normal.y * vertex.position.y
               + normal.z * vertex.position.z
               + d;

    return side >= 0;
  });

  const isOnTheOppositeSide = vertices.every(vertex => {
    const side = normal.x * vertex.position.x
               + normal.y * vertex.position.y
               + normal.z * vertex.position.z
               + d;

    return side <= 0;
  });

  return isOnTheSameSide || isOnTheOppositeSide;
}

const createRegularSolid = ({
  scale = 1,
  colors = [],

  maximumNumberOfFaces = 6,
  maximumNumberOfFacesShareTheSameVertex = 3,
  numberOfVerticesEachFace = [],
  faceIndicesShiftings = [0, 1, 2, 0, 2, 1],
  baseVertices = [],
}) => {
  const vertices = [];

  baseVertices.forEach(baseVertex => {
    let currentVertexPosition = baseVertex.position;

    for (let i = 0; i <= baseVertex.rotateCount; i++) {
      const rangeX = currentVertexPosition.x === 0
        ? [0]
        : baseVertex.signed
          ? [-currentVertexPosition.x, currentVertexPosition.x]
          : [currentVertexPosition.x];

      for (let x of rangeX) {
        const rangeY = currentVertexPosition.y === 0
          ? [0]
          : baseVertex.signed
            ? [-currentVertexPosition.y, currentVertexPosition.y]
            : [currentVertexPosition.y];

        for (let y of rangeY) {
          const rangeZ = currentVertexPosition.z === 0
            ? [0]
            : baseVertex.signed
              ? [-currentVertexPosition.z, currentVertexPosition.z]
              : [currentVertexPosition.z];

          for (let z of rangeZ) {
            vertices.push({
              position: { x: x * scale, y: y * scale, z: z * scale },
            });
          }
        }
      }

      currentVertexPosition = {
        x: currentVertexPosition.y,
        y: currentVertexPosition.z,
        z: currentVertexPosition.x,
      };
    }
  });

  const faces = [];

  const vertexLinkCounts = vertices.map(() => 0);

  for (let i = 0; i < vertices.length; i++) {
    for (let j = 0; j < vertices.length; j++) {
      for (let k = 0; k < vertices.length; k++) {
        if (i === j || j === k || k === i) continue;

        if (
          vertexLinkCounts[i] > maximumNumberOfFacesShareTheSameVertex
          || vertexLinkCounts[j] > maximumNumberOfFacesShareTheSameVertex
          || vertexLinkCounts[k] > maximumNumberOfFacesShareTheSameVertex
        ) continue;

        const normal = getNormalizedNormalVectorFromThreeVertices({
          vertexA: vertices[i].position,
          vertexB: vertices[j].position,
          vertexC: vertices[k].position,
        });

        if (isNaN(normal.x) || isNaN(normal.y) || isNaN(normal.z)) continue;

        const coplanarVertices = vertices.filter(vertex => {
          const newVertex = {
            position: {
              x: vertex.position.x - vertices[i].position.x,
              y: vertex.position.y - vertices[i].position.y,
              z: vertex.position.z - vertices[i].position.z,
            }
          }

          return roundTo(dot([
            normal.x,
            normal.y,
            normal.z,
          ], [
            newVertex.position.x,
            newVertex.position.y,
            newVertex.position.z,
          ])) === 0;
        });

        if (numberOfVerticesEachFace.includes(coplanarVertices.length)) {
          const d = -(normal.x * coplanarVertices[0].position.x
                    + normal.y * coplanarVertices[0].position.y
                    + normal.z * coplanarVertices[0].position.z);

          const otherVertices = vertices.filter(
            vertex => !coplanarVertices.some(
              coplanarVertex => isTheSameVertex(vertex.position, coplanarVertex.position)
            )
          );

          if (checkIfAllVerticesAreOnTheSameSide(otherVertices, normal, d)) {
            vertexLinkCounts[i]++;
            vertexLinkCounts[j]++;
            vertexLinkCounts[k]++;

            faces.push({
              normal,
              color: colors[faces.length],
              vertices: coplanarVertices,
            });
          } else {
          }
        }

        if (faces.length === maximumNumberOfFaces) break;
      }

      if (faces.length === maximumNumberOfFaces) break;
    }

    if (faces.length === maximumNumberOfFaces) break;
  }

  const vertexBuffersArray = [];

  faces.forEach((face) => {
    face.vertices.forEach(vertex => {
      vertexBuffersArray.push(
        vertex.position.x,
        vertex.position.y,
        vertex.position.z,
      );
      vertexBuffersArray.push(face.normal.x, face.normal.y, face.normal.z);
      vertexBuffersArray.push(...hexToUnitArray(face.color));
    });
  });

  const vertexIndexBuffersArray = [];

  for (let i = 0; i < faces.length; i++) {
    const indices = faceIndicesShiftings.map(
      index => i * faces[i].vertices.length + index
    );

    vertexIndexBuffersArray.push(...indices);
  }

  return {
    faces,
    vertices: vertexBuffersArray,
    vertexIndices: vertexIndexBuffersArray,
  }
}

export default createRegularSolid;
