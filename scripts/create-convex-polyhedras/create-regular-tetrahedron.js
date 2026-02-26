import hexToUnitArray from "../utilities/hex-to-unit-array.js";
import getNormalizedNormalVectorFromThreeVertices from "../utilities/get-normalized-normal-vector-from-three-vertices.js";

const createRegularTetrahedron = ({
  scale = 1,
  colors = {
    'down-front-right': 0xffff00ff, // Yellow
    'down-back-left': 0x0000ffff, // Blue
    'up-front-left': 0xff0000ff, // Red
    'up-back-right': 0x32cd32ff, // Lime Green
  }
}) => {
  const faces = [
    {
      color: colors['down-front-right'],
      vertices: [
        {
          position: {
            x: -scale,
            y: -scale,
            z:  scale,
          },
        },
        {
          position: {
            x:  scale,
            y: -scale,
            z: -scale,
          },
        },
        {
          position: {
            x:  scale,
            y:  scale,
            z:  scale,
          },
        },
      ]
    },

    {
      color: colors['down-back-left'],
      vertices: [
        {
          position: {
            x: -scale,
            y: -scale,
            z:  scale,
          },
        },
        {
          position: {
            x: -scale,
            y:  scale,
            z: -scale,
          },
        },
        {
          position: {
            x:  scale,
            y: -scale,
            z: -scale,
          },
        },
      ]
    },

    {
      color: colors['up-front-left'],
      vertices: [
        {
          position: {
            x: -scale,
            y:  scale,
            z: -scale,
          },
        },
        {
          position: {
            x: -scale,
            y: -scale,
            z:  scale,
          },
        },
        {
          position: {
            x:  scale,
            y:  scale,
            z:  scale,
          },
        },
      ]
    },

    {
      color: colors['up-back-right'],
      vertices: [
        {
          position: {
            x: -scale,
            y:  scale,
            z: -scale,
          },
        },
        {
          position: {
            x:  scale,
            y:  scale,
            z:  scale,
          },
        },
        {
          position: {
            x:  scale,
            y: -scale,
            z: -scale,
          },
        },
      ]
    },
  ];

  const vertices = [];

  faces.forEach(face => {
    face.normal = getNormalizedNormalVectorFromThreeVertices({
      vertexA: face.vertices[0].position,
      vertexB: face.vertices[1].position,
      vertexC: face.vertices[2].position,
    });

    face.vertices.forEach(vertex => {
      vertices.push(vertex.position.x, vertex.position.y, vertex.position.z);
      vertices.push(face.normal.x, face.normal.y, face.normal.z);
      vertices.push(...hexToUnitArray(face.color));
    });
  });

  const vertexIndices = [];

  for (let i = 0; i < faces.length; i++) {
    vertexIndices.push(
      i * faces[i].vertices.length + 0,
      i * faces[i].vertices.length + 1,
      i * faces[i].vertices.length + 2,

      i * faces[i].vertices.length + 0,
      i * faces[i].vertices.length + 2,
      i * faces[i].vertices.length + 1,
    );
  }

  return {
    faces,
    vertices,
    vertexIndices,
  }
}

export default createRegularTetrahedron;
