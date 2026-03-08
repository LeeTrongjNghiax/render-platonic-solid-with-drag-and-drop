import getNormalizedNormalVectorFromThreeVertices from "../utilities/get-normalized-normal-vector-from-three-vertices.js";
import roundTo from "../utilities/round-to.js";
import dot from "../maths/dot.js";
import hexToUnitArray from "../utilities/hex-to-unit-array.js";
import toBase26 from "../utilities/to-base-26.js";
import isTheSameVertex from "../maths/is-the-same-vertex.js";
import checkIfAllVerticesAreOnTheSameSide from "../maths/check-if-all-vertices-are-on-the-same-side.js";
import createRandomHexColor from "../utilities/create-random-hex-color.js";
import sortVertices from "../maths/sort-vertices.js";

const createRegularSolid = ({
  scale = 1,
  colors = [],

  maximumNumberOfFacesShareTheSameVertex = 3,
  numberOfVerticesEachFace = [],
  baseVertices = [],
}) => {
  const vertices = [];

  baseVertices.forEach(baseVertex => {
    const edgePermutations = baseVertex.permutationType === `even`
      ? [
        { x: baseVertex.position.x, y: baseVertex.position.y, z: baseVertex.position.z },
        { x: baseVertex.position.z, y: baseVertex.position.x, z: baseVertex.position.y },
        { x: baseVertex.position.y, y: baseVertex.position.z, z: baseVertex.position.x },
      ] : baseVertex.permutationType === `odd`
        ? [
          { x: baseVertex.position.y, y: baseVertex.position.x, z: baseVertex.position.z },
          { x: baseVertex.position.z, y: baseVertex.position.y, z: baseVertex.position.x },
          { x: baseVertex.position.x, y: baseVertex.position.z, z: baseVertex.position.y },
        ] : baseVertex.permutationType === `all`
          ? [
            { x: baseVertex.position.x, y: baseVertex.position.y, z: baseVertex.position.z },
            { x: baseVertex.position.z, y: baseVertex.position.x, z: baseVertex.position.y },
            { x: baseVertex.position.y, y: baseVertex.position.z, z: baseVertex.position.x },
            { x: baseVertex.position.y, y: baseVertex.position.x, z: baseVertex.position.z },
            { x: baseVertex.position.z, y: baseVertex.position.y, z: baseVertex.position.x },
            { x: baseVertex.position.x, y: baseVertex.position.z, z: baseVertex.position.y },
          ] : [
            { x: baseVertex.position.x, y: baseVertex.position.y, z: baseVertex.position.z },
          ];

    for (let i = 0; i < edgePermutations.length; i++) {
      const currentVertexPosition = edgePermutations[i];

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
            if (
              !baseVertex.conditions ||
              baseVertex.conditions && baseVertex.conditions.every(
                condition => condition(x, y, z)
              )
            ) {
              vertices.push({
                name: toBase26(vertices.length),
                position: { x: x * scale, y: y * scale, z: z * scale },
              });
            }
          }
        }
      }
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

        const sortedCoplanarVertices = sortVertices(coplanarVertices, normal);

        const isFacesExist = faces.some(face => {
          const areEqual =
            face.vertices.length === sortedCoplanarVertices.length &&
            face.vertices.every((obj, index) => {
              const compare = sortedCoplanarVertices[index];

              return obj.position.x === compare.position.x &&
                     obj.position.y === compare.position.y &&
                     obj.position.z === compare.position.z
            });

          return areEqual;
        });

        if (isFacesExist) continue;

        if (!numberOfVerticesEachFace.includes(sortedCoplanarVertices.length))
          continue

        const d = -(normal.x * sortedCoplanarVertices[0].position.x
                  + normal.y * sortedCoplanarVertices[0].position.y
                  + normal.z * sortedCoplanarVertices[0].position.z);

        const otherVertices = vertices.filter(
          vertex => !sortedCoplanarVertices.some(
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
          vertices: sortedCoplanarVertices,
        }

        faces.push(addedFace);
      }
    }
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
          3, 1, 2, 3, 2, 1,
          0, 2, 3, 0, 3, 2,
          0, 1, 3, 0, 3, 1,
        ];
        break;
      case 5:
        indicesShiftings = [
          0, 1, 2, 0, 2, 1,
          0, 1, 3, 0, 3, 1,
          0, 1, 4, 0, 4, 1,
          0, 2, 3, 0, 3, 2,
          0, 2, 4, 0, 4, 2,
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
