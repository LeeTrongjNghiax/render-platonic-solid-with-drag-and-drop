import hexToUnitArray from "../utilities/hex-to-unit-array.js";

const createRegularTetrahedron = ({
  scale = 1,
  colors = {
    'down-front-right': 0xffff00ff, // Yellow
    'down-back-left': 0x0000ffff, // Blue
    'top-front-left': 0xff0000ff, // Red
    'top-back-right': 0x32cd32ff, // Lime Green
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
      color: colors['top-front-left'],
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
      color: colors['top-back-right'],
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
    );
  }

  return {
    faces,
    vertices,
    vertexIndices,
  }
}

export default createRegularTetrahedron;
