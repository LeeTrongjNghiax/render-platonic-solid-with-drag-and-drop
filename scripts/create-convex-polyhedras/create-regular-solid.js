import getNormalizedNormalVectorFromThreeVertices from "../utilities/get-normalized-normal-vector-from-three-vertices.js";
import roundTo from "../utilities/round-to.js";
import dot from "../maths/dot.js";
import hexToUnitArray from "../utilities/hex-to-unit-array.js";
import toBase26 from "../utilities/to-base-26.js";
import isTheSameVertex from "../maths/is-the-same-vertex.js";
import checkIfAllVerticesAreOnTheSameSide from "../maths/check-if-all-vertices-are-on-the-same-side.js";
import createRandomHexColor from "../utilities/create-random-hex-color.js";

const createRegularSolid = ({
  scale = 1,
  colors = [],

  maximumNumberOfFaces = 6,
  maximumNumberOfFacesShareTheSameVertex = 3,
  numberOfVerticesEachFace = [],
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
              name: toBase26(vertices.length),
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
          vertexLinkCounts[i] > maximumNumberOfFacesShareTheSameVertex ||
          vertexLinkCounts[j] > maximumNumberOfFacesShareTheSameVertex ||
          vertexLinkCounts[k] > maximumNumberOfFacesShareTheSameVertex
        ) continue;

        const normal = getNormalizedNormalVectorFromThreeVertices({
          vertexA: vertices[i].position,
          vertexB: vertices[j].position,
          vertexC: vertices[k].position,
        });

        if (isNaN(normal.x) || isNaN(normal.y) || isNaN(normal.z)) continue;

        const normalFacing = dot(
          [normal.x, normal.y, normal.z],
          [
            vertices[i].position.x,
            vertices[i].position.y,
            vertices[i].position.z,
          ],
        );

        if (normalFacing < 0) {
          normal.x = -normal.x;
          normal.y = -normal.y;
          normal.z = -normal.z;
        }

        const coplanarVertices = vertices.filter(vertex => {
          const newVertex = {
            x: vertex.position.x - vertices[i].position.x,
            y: vertex.position.y - vertices[i].position.y,
            z: vertex.position.z - vertices[i].position.z,
          }

          return roundTo(dot(
            [normal.x, normal.y, normal.z],
            [newVertex.x, newVertex.y, newVertex.z]
          )) === 0;
        });

        const isFacesExist = faces.some(face => {
          const areEqual =
            face.vertices.length === coplanarVertices.length &&
            face.vertices.every((obj, index) => {
              const compare = coplanarVertices[index];

              return obj.position.x === compare.position.x &&
                     obj.position.y === compare.position.y &&
                     obj.position.z === compare.position.z
            });

          return areEqual;
        });

        if (isFacesExist) continue;

        // console.log('coplanarVertices', coplanarVertices, numberOfVerticesEachFace);

        if (!numberOfVerticesEachFace.includes(coplanarVertices.length))
          continue

        const d = -(normal.x * coplanarVertices[0].position.x
                  + normal.y * coplanarVertices[0].position.y
                  + normal.z * coplanarVertices[0].position.z);

        const otherVertices = vertices.filter(
          vertex => !coplanarVertices.some(
            coplanarVertex => isTheSameVertex(
              vertex.position,
              coplanarVertex.position,
            )
          )
        );

        if (!checkIfAllVerticesAreOnTheSameSide({
          vertices: otherVertices,
          normal,
          d,
        })) continue;

        vertexLinkCounts[i]++;
        vertexLinkCounts[j]++;
        vertexLinkCounts[k]++;

        const addedFace = {
          normal,
          color: colors[faces.length] ?? createRandomHexColor(),
          vertices: coplanarVertices,
        }

        faces.push(addedFace);

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
    let indicesShiftings = [0, 1, 2, 0, 2, 1];

    switch (faces[i].vertices.length) {
      case 3:
        indicesShiftings = [0, 1, 2, 0, 2, 1];
        break;
      case 4:
        indicesShiftings = [
          0, 1, 2, 0, 2, 1,
          0, 1, 3, 0, 3, 1,
          3, 1, 2, 3, 2, 1,
        ];
        break;
      case 5:
        indicesShiftings = [
          0, 1, 2, 0, 2, 1,
          0, 1, 3, 0, 3, 1,
          0, 1, 4, 0, 4, 1,
          2, 3, 4, 2, 4, 3,
        ];
        break;
    }

    const indices = indicesShiftings.map(
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
