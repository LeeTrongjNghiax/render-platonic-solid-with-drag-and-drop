import GOLDEN_RATIO from "../constants/golden-ratio.constant.js";
import INVERSE_GOLDEN_RATIO from "../constants/inverse-golden-ratio.constant.js";
import hexToUnitArray from "../utilities/hex-to-unit-array.js";

const createRegularDodecahedron = ({
  scale = 1,
  gapScale = 0,
  colors = {
    'up-front': 0xffffffff, // White
    'up-back': 0xffff00ff, // Yellow
    'up-right': 0x00008bff, // Dark Blue
    'up-left': 0x800080ff, // Purple
    'down-front': 0xf5f5dcff, // Beige
    'down-back': 0x808080ff, // Gray
    'down-right': 0xff00ffff, // Purple
    'down-left': 0x87ceebff, // Sky Blue
    'front-right': 0xff0000ff, // Red
    'front-left': 0x006400ff, // Dark Green
    'back-right': 0x32cd32ff, // Lime Green
    'back-left': 0xffa800ff, // Orange
  },
}) => {
  const faces = [
    // Up Front Face
    {
      color: colors['up-front'],
      vertices: [
        {
          position: {
            x: scale *  0,
            y: scale *  INVERSE_GOLDEN_RATIO,
            z: scale * -GOLDEN_RATIO,
          },
        },
        {
          position: {
            x: scale *  1,
            y: scale *  1,
            z: scale * -1,
          },
        },
        {
          position: {
            x: scale *  INVERSE_GOLDEN_RATIO,
            y: scale *  GOLDEN_RATIO,
            z: scale *  0,
          },
        },
        {
          position: {
            x: scale * -INVERSE_GOLDEN_RATIO,
            y: scale *  GOLDEN_RATIO,
            z: scale *  0,
          },
        },
        {
          position: {
            x: scale * -1,
            y: scale *  1,
            z: scale * -1,
          },
        },
      ]
    },

    // Up Back Face
    {
      color: colors['up-back'],
      vertices: [
        {
          position: {
            x: scale *  0,
            y: scale *  INVERSE_GOLDEN_RATIO,
            z: scale *  GOLDEN_RATIO,
          },
        },
        {
          position: {
            x: scale * -1,
            y: scale *  1,
            z: scale *  1,
          },
        },
        {
          position: {
            x: scale * -INVERSE_GOLDEN_RATIO,
            y: scale *  GOLDEN_RATIO,
            z: scale *  0,
          },
        },
        {
          position: {
            x: scale *  INVERSE_GOLDEN_RATIO,
            y: scale *  GOLDEN_RATIO,
            z: scale *  0,
          },
        },
        {
          position: {
            x: scale *  1,
            y: scale *  1,
            z: scale *  1,
          },
        },
      ]
    },

    // Up Right Face
    {
      color: colors['up-right'],
      vertices: [
        {
          position: {
            x: scale *  INVERSE_GOLDEN_RATIO,
            y: scale *  GOLDEN_RATIO,
            z: scale *  0,
          },
        },
        {
          position: {
            x: scale *  1,
            y: scale *  1,
            z: scale * -1,
          },
        },
        {
          position: {
            x: scale *  GOLDEN_RATIO,
            y: scale *  0,
            z: scale * -INVERSE_GOLDEN_RATIO,
          },
        },
        {
          position: {
            x: scale *  GOLDEN_RATIO,
            y: scale *  0,
            z: scale *  INVERSE_GOLDEN_RATIO,
          },
        },
        {
          position: {
            x: scale *  1,
            y: scale *  1,
            z: scale *  1,
          },
        },
      ]
    },

    // Up Left Face
    {
      color: colors['up-left'],
      vertices: [
        {
          position: {
            x: scale * -INVERSE_GOLDEN_RATIO,
            y: scale *  GOLDEN_RATIO,
            z: scale *  0,
          },
        },
        {
          position: {
            x: scale * -1,
            y: scale *  1,
            z: scale *  1,
          },
        },
        {
          position: {
            x: scale * -GOLDEN_RATIO,
            y: scale *  0,
            z: scale *  INVERSE_GOLDEN_RATIO,
          },
        },
        {
          position: {
            x: scale * -GOLDEN_RATIO,
            y: scale *  0,
            z: scale * -INVERSE_GOLDEN_RATIO,
          },
        },
        {
          position: {
            x: scale * -1,
            y: scale *  1,
            z: scale * -1,
          },
        },
      ]
    },

    // Down Front Face
    {
      color: colors['down-front'],
      vertices: [
        {
          position: {
            x: scale *  0,
            y: scale * -INVERSE_GOLDEN_RATIO,
            z: scale * -GOLDEN_RATIO,
          },
        },
        {
          position: {
            x: scale * -1,
            y: scale * -1,
            z: scale * -1,
          },
        },
        {
          position: {
            x: scale * -INVERSE_GOLDEN_RATIO,
            y: scale * -GOLDEN_RATIO,
            z: scale *  0,
          },
        },
        {
          position: {
            x: scale *  INVERSE_GOLDEN_RATIO,
            y: scale * -GOLDEN_RATIO,
            z: scale *  0,
          },
        },
        {
          position: {
            x: scale *  1,
            y: scale * -1,
            z: scale * -1,
          },
        },
      ]
    },

    // Down Back Face
    {
      color: colors['down-back'],
      vertices: [
        {
          position: {
            x: scale *  0,
            y: scale * -INVERSE_GOLDEN_RATIO,
            z: scale *  GOLDEN_RATIO,
          },
        },
        {
          position: {
            x: scale *  1,
            y: scale * -1,
            z: scale *  1,
          },
        },
        {
          position: {
            x: scale *  INVERSE_GOLDEN_RATIO,
            y: scale * -GOLDEN_RATIO,
            z: scale *  0,
          },
        },
        {
          position: {
            x: scale * -INVERSE_GOLDEN_RATIO,
            y: scale * -GOLDEN_RATIO,
            z: scale *  0,
          },
        },
        {
          position: {
            x: scale * -1,
            y: scale * -1,
            z: scale *  1,
          },
        },
      ]
    },

    // Down Right Face
    {
      color: colors['down-right'],
      vertices: [
        {
          position: {
            x: scale *  INVERSE_GOLDEN_RATIO,
            y: scale * -GOLDEN_RATIO,
            z: scale *  0,
          },
        },
        {
          position: {
            x: scale *  1,
            y: scale * -1,
            z: scale *  1,
          },
        },
        {
          position: {
            x: scale *  GOLDEN_RATIO,
            y: scale *  0,
            z: scale *  INVERSE_GOLDEN_RATIO,
          },
        },
        {
          position: {
            x: scale *  GOLDEN_RATIO,
            y: scale *  0,
            z: scale * -INVERSE_GOLDEN_RATIO,
          },
        },
        {
          position: {
            x: scale *  1,
            y: scale * -1,
            z: scale * -1,
          },
        },
      ]
    },

    // Down Left Face
    {
      color: colors['down-left'],
      vertices: [
        {
          position: {
            x: scale * -INVERSE_GOLDEN_RATIO,
            y: scale * -GOLDEN_RATIO,
            z: scale *  0,
          },
        },
        {
          position: {
            x: scale * -1,
            y: scale * -1,
            z: scale * -1,
          },
        },
        {
          position: {
            x: scale * -GOLDEN_RATIO,
            y: scale *  0,
            z: scale * -INVERSE_GOLDEN_RATIO,
          },
        },
        {
          position: {
            x: scale * -GOLDEN_RATIO,
            y: scale *  0,
            z: scale *  INVERSE_GOLDEN_RATIO,
          },
        },
        {
          position: {
            x: scale * -1,
            y: scale * -1,
            z: scale *  1,
          },
        },
      ]
    },

    // Front Right Face
    {
      color: colors['front-right'],
      vertices: [
        {
          position: {
            x: scale *  GOLDEN_RATIO,
            y: scale *  0,
            z: scale * -INVERSE_GOLDEN_RATIO,
          },
        },
        {
          position: {
            x: scale *  1,
            y: scale *  1,
            z: scale * -1,
          },
        },
        {
          position: {
            x: scale *  0,
            y: scale *  INVERSE_GOLDEN_RATIO,
            z: scale * -GOLDEN_RATIO,
          },
        },
        {
          position: {
            x: scale *  0,
            y: scale * -INVERSE_GOLDEN_RATIO,
            z: scale * -GOLDEN_RATIO,
          },
        },
        {
          position: {
            x: scale *  1,
            y: scale * -1,
            z: scale * -1,
          },
        },
      ]
    },

    // Front Left Face
    {
      color: colors['front-left'],
      vertices: [
        {
          position: {
            x: scale * -GOLDEN_RATIO,
            y: scale *  0,
            z: scale * -INVERSE_GOLDEN_RATIO,
          },
        },
        {
          position: {
            x: scale * -1,
            y: scale * -1,
            z: scale * -1,
          },
        },
        {
          position: {
            x: scale *  0,
            y: scale * -INVERSE_GOLDEN_RATIO,
            z: scale * -GOLDEN_RATIO,
          },
        },
        {
          position: {
            x: scale *  0,
            y: scale *  INVERSE_GOLDEN_RATIO,
            z: scale * -GOLDEN_RATIO,
          },
        },
        {
          position: {
            x: scale * -1,
            y: scale *  1,
            z: scale * -1,
          },
        },
      ]
    },

    // Back Right Face
    {
      color: colors['back-right'],
      vertices: [
        {
          position: {
            x: scale *  GOLDEN_RATIO,
            y: scale *  0,
            z: scale *  INVERSE_GOLDEN_RATIO,
          },
        },
        {
          position: {
            x: scale *  1,
            y: scale * -1,
            z: scale *  1,
          },
        },
        {
          position: {
            x: scale *  0,
            y: scale * -INVERSE_GOLDEN_RATIO,
            z: scale *  GOLDEN_RATIO,
          },
        },
        {
          position: {
            x: scale *  0,
            y: scale *  INVERSE_GOLDEN_RATIO,
            z: scale *  GOLDEN_RATIO,
          },
        },
        {
          position: {
            x: scale *  1,
            y: scale *  1,
            z: scale *  1,
          },
        },
      ]
    },

    // Back Left Face
    {
      color: colors['back-left'],
      vertices: [
        {
          position: {
            x: scale * -GOLDEN_RATIO,
            y: scale *  0,
            z: scale *  INVERSE_GOLDEN_RATIO,
          },
        },
        {
          position: {
            x: scale * -1,
            y: scale *  1,
            z: scale *  1,
          },
        },
        {
          position: {
            x: scale *  0,
            y: scale *  INVERSE_GOLDEN_RATIO,
            z: scale *  GOLDEN_RATIO,
          },
        },
        {
          position: {
            x: scale *  0,
            y: scale * -INVERSE_GOLDEN_RATIO,
            z: scale *  GOLDEN_RATIO,
          },
        },
        {
          position: {
            x: scale * -1,
            y: scale * -1,
            z: scale *  1,
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
      x: vectorB.y * vectorA.z - vectorB.z * vectorA.y,
      y: vectorB.z * vectorA.x - vectorB.x * vectorA.z,
      z: vectorB.x * vectorA.y - vectorB.y * vectorA.x,
    }

    const normalizedNormal = {
      x: (normal.x / Math.sqrt(normal.x * normal.x + normal.y * normal.y + normal.z * normal.z)),
      y: (normal.y / Math.sqrt(normal.x * normal.x + normal.y * normal.y + normal.z * normal.z)),
      z: (normal.z / Math.sqrt(normal.x * normal.x + normal.y * normal.y + normal.z * normal.z)),
    };

    face.normal = normalizedNormal;

    face.vertices.forEach(vertex => {
      vertex.position.x += gapScale * normalizedNormal.x; 
      vertex.position.y += gapScale * normalizedNormal.y;
      vertex.position.z += gapScale * normalizedNormal.z;

      vertices.push(vertex.position.x, vertex.position.y, vertex.position.z);
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
      i * faces[i].vertices.length + 3,
      i * faces[i].vertices.length + 4,

      i * faces[i].vertices.length + 0,
      i * faces[i].vertices.length + 4,
      i * faces[i].vertices.length + 3,

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

export default createRegularDodecahedron;
