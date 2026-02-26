import GOLDEN_RATIO from "../constants/golden-ratio.constant.js";
import INVERSE_GOLDEN_RATIO from "../constants/inverse-golden-ratio.constant.js";
import hexToUnitArray from "../utilities/hex-to-unit-array.js";
import getNormalizedNormalVectorFromThreeVertices from "../utilities/get-normalized-normal-vector-from-three-vertices.js";

const createRegularDodecahedron = ({
  scale = 1,
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
    {
      color: colors['up-front'],
      vertices: [
        {
          position: {
            x:  0,
            y:  scale * INVERSE_GOLDEN_RATIO,
            z: -scale * GOLDEN_RATIO,
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
            x:  scale * INVERSE_GOLDEN_RATIO,
            y:  scale * GOLDEN_RATIO,
            z:  0,
          },
        },
        {
          position: {
            x: -scale * INVERSE_GOLDEN_RATIO,
            y:  scale * GOLDEN_RATIO,
            z:  0,
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
      color: colors['up-back'],
      vertices: [
        {
          position: {
            x:  0,
            y:  scale * INVERSE_GOLDEN_RATIO,
            z:  scale * GOLDEN_RATIO,
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
            x: -scale * INVERSE_GOLDEN_RATIO,
            y:  scale * GOLDEN_RATIO,
            z:  0,
          },
        },
        {
          position: {
            x:  scale * INVERSE_GOLDEN_RATIO,
            y:  scale * GOLDEN_RATIO,
            z:  0,
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
      color: colors['up-right'],
      vertices: [
        {
          position: {
            x:  scale * INVERSE_GOLDEN_RATIO,
            y:  scale * GOLDEN_RATIO,
            z:  0,
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
            x:  scale * GOLDEN_RATIO,
            y:  0,
            z: -scale * INVERSE_GOLDEN_RATIO,
          },
        },
        {
          position: {
            x:  scale * GOLDEN_RATIO,
            y:  0,
            z:  scale * INVERSE_GOLDEN_RATIO,
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
      color: colors['up-left'],
      vertices: [
        {
          position: {
            x: -scale * INVERSE_GOLDEN_RATIO,
            y:  scale * GOLDEN_RATIO,
            z:  0,
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
            x: -scale * GOLDEN_RATIO,
            y:  0,
            z:  scale * INVERSE_GOLDEN_RATIO,
          },
        },
        {
          position: {
            x: -scale * GOLDEN_RATIO,
            y:  0,
            z: -scale * INVERSE_GOLDEN_RATIO,
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
      color: colors['down-front'],
      vertices: [
        {
          position: {
            x:  0,
            y: -scale * INVERSE_GOLDEN_RATIO,
            z: -scale * GOLDEN_RATIO,
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
            x: -scale * INVERSE_GOLDEN_RATIO,
            y: -scale * GOLDEN_RATIO,
            z:  0,
          },
        },
        {
          position: {
            x:  scale * INVERSE_GOLDEN_RATIO,
            y: -scale * GOLDEN_RATIO,
            z:  0,
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
      color: colors['down-back'],
      vertices: [
        {
          position: {
            x:  0,
            y: -scale * INVERSE_GOLDEN_RATIO,
            z:  scale * GOLDEN_RATIO,
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
            x:  scale * INVERSE_GOLDEN_RATIO,
            y: -scale * GOLDEN_RATIO,
            z:  0,
          },
        },
        {
          position: {
            x: -scale * INVERSE_GOLDEN_RATIO,
            y: -scale * GOLDEN_RATIO,
            z:  0,
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

    {
      color: colors['down-right'],
      vertices: [
        {
          position: {
            x:  scale * INVERSE_GOLDEN_RATIO,
            y: -scale * GOLDEN_RATIO,
            z:  0,
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
            x:  scale * GOLDEN_RATIO,
            y:  0,
            z:  scale * INVERSE_GOLDEN_RATIO,
          },
        },
        {
          position: {
            x:  scale * GOLDEN_RATIO,
            y:  0,
            z: -scale * INVERSE_GOLDEN_RATIO,
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
      color: colors['down-left'],
      vertices: [
        {
          position: {
            x: -scale * INVERSE_GOLDEN_RATIO,
            y: -scale * GOLDEN_RATIO,
            z:  0,
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
            x: -scale * GOLDEN_RATIO,
            y:  0,
            z: -scale * INVERSE_GOLDEN_RATIO,
          },
        },
        {
          position: {
            x: -scale * GOLDEN_RATIO,
            y: 0,
            z: scale * INVERSE_GOLDEN_RATIO,
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

    {
      color: colors['front-right'],
      vertices: [
        {
          position: {
            x:  scale * GOLDEN_RATIO,
            y:  0,
            z: -scale * INVERSE_GOLDEN_RATIO,
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
            x:  0,
            y:  scale * INVERSE_GOLDEN_RATIO,
            z: -scale * GOLDEN_RATIO,
          },
        },
        {
          position: {
            x:  0,
            y: -scale * INVERSE_GOLDEN_RATIO,
            z: -scale * GOLDEN_RATIO,
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
      color: colors['front-left'],
      vertices: [
        {
          position: {
            x: -scale * GOLDEN_RATIO,
            y:  0,
            z: -scale * INVERSE_GOLDEN_RATIO,
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
            x:  0,
            y: -scale * INVERSE_GOLDEN_RATIO,
            z: -scale * GOLDEN_RATIO,
          },
        },
        {
          position: {
            x:  0,
            y:  scale * INVERSE_GOLDEN_RATIO,
            z: -scale * GOLDEN_RATIO,
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
      color: colors['back-right'],
      vertices: [
        {
          position: {
            x:  scale * GOLDEN_RATIO,
            y:  0,
            z:  scale * INVERSE_GOLDEN_RATIO,
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
            x:  0,
            y: -scale * INVERSE_GOLDEN_RATIO,
            z:  scale * GOLDEN_RATIO,
          },
        },
        {
          position: {
            x:  0,
            y:  scale * INVERSE_GOLDEN_RATIO,
            z:  scale * GOLDEN_RATIO,
          },
        },
        {
          position: {
            x: scale,
            y: scale,
            z: scale,
          },
        },
      ]
    },

    {
      color: colors['back-left'],
      vertices: [
        {
          position: {
            x: -scale * GOLDEN_RATIO,
            y:  0,
            z:  scale * INVERSE_GOLDEN_RATIO,
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
            x:  0,
            y:  scale * INVERSE_GOLDEN_RATIO,
            z:  scale * GOLDEN_RATIO,
          },
        },
        {
          position: {
            x:  0,
            y: -scale * INVERSE_GOLDEN_RATIO,
            z:  scale * GOLDEN_RATIO,
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
