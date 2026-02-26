import hexToUnitArray from "../utilities/hex-to-unit-array.js";
import getNormalizedNormalVectorFromThreeVertices from "../utilities/get-normalized-normal-vector-from-three-vertices.js";

const createRegularHexahedron = ({
  scale = 1,
  colors = {
    'up': 0xffffffff, // White
    'down': 0xffff00ff, // Yellow
    'front': 0x008b00ff, // Green
    'back': 0x0000ffff, // Blue
    'right': 0xff0000ff, // Red
    'left': 0xffa800ff, // Cyan
  }
}) => {
  const faces = [
    {
      color: colors['up'],
      vertices: [
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
            y:  scale,
            z: -scale,
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
            x: -scale,
            y:  scale,
            z:  scale,
          },
        },
      ]
    },

    {
      color: colors['down'],
      vertices: [
        {
          position: {
            x:  scale,
            y: -scale,
            z:  scale,
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
            x: -scale,
            y: -scale,
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
      color: colors['front'],
      vertices: [
        {
          position: {
            x:  scale,
            y:  scale,
            z:  scale,
          },
        },
        {
          position: {
            x: -scale,
            y:  scale,
            z:  scale,
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
            y: -scale,
            z:  scale,
          },
        },
      ]
    },

    {
      color: colors['back'],
      vertices: [
        {
          position: {
            x:  scale,
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
        {
          position: {
            x: -scale,
            y: -scale,
            z: -scale,
          },
        },
        {
          position: {
            x: -scale,
            y:  scale,
            z: -scale,
          },
        },
      ]
    },

    {
      color: colors['right'],
      vertices: [
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
            z: -scale,
          },
        },
      ]
    },

    {
      color: colors['left'],
      vertices: [
        {
          position: {
            x: -scale,
            y:  scale,
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
            x: -scale,
            y: -scale,
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

      i * faces[i].vertices.length + 0,
      i * faces[i].vertices.length + 2,
      i * faces[i].vertices.length + 3,

      i * faces[i].vertices.length + 0,
      i * faces[i].vertices.length + 3,
      i * faces[i].vertices.length + 2,
    );
  }

  return {
    faces,
    vertices,
    vertexIndices,
  }
}

export default createRegularHexahedron;
