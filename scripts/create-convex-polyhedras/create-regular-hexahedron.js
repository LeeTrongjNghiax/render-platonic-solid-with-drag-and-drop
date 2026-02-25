import hexToUnitArray from "../utilities/hex-to-unit-array.js";

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
    const vertexA = face.vertices[0];
    const vertexB = face.vertices[1];
    const vertexC = face.vertices[2];

    const vectorA = {
      x: vertexB.position.x - vertexA.position.x,
      y: vertexB.position.y - vertexA.position.y,
      z: vertexB.position.z - vertexA.position.z,
    }

    const vectorB = {
      x: vertexC.position.x - vertexA.position.x,
      y: vertexC.position.y - vertexA.position.y,
      z: vertexC.position.z - vertexA.position.z,
    }

    const normal = {
      x: vectorA.y * vectorB.z - vectorA.z * vectorB.y,
      y: vectorA.z * vectorB.x - vectorA.x * vectorB.z,
      z: vectorA.x * vectorB.y - vectorA.y * vectorB.x,
    }

    const normalizedNormal = {
      x: (normal.x / Math.sqrt(normal.x * normal.x + normal.y * normal.y + normal.z * normal.z)),
      y: (normal.y / Math.sqrt(normal.x * normal.x + normal.y * normal.y + normal.z * normal.z)),
      z: (normal.z / Math.sqrt(normal.x * normal.x + normal.y * normal.y + normal.z * normal.z)),
    };

    face.normal = normalizedNormal;

    face.vertices.forEach(vertex => {
      vertices.push(vertex.position.x, vertex.position.y, vertex.position.z);
      vertices.push(normalizedNormal.x, normalizedNormal.y, normalizedNormal.z);
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
