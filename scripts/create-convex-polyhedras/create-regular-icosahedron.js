import GOLDEN_RATIO from "../constants/golden-ratio.constant.js";
import hexToUnitArray from "../utilities/hex-to-unit-array.js";

const createRegularIcosahedron = ({
  scale = 1,
  colors = {
    'up-front-right':   0x000000ff, //
    'up-front-left':    0x0000ffff, //
    'up-back-right':    0x00ff00ff, //
    'up-back-left':     0x00ffffff, //
    'down-front-right': 0xff0000ff, //
    'down-front-left':  0xff00ffff, //
    'down-back-right':  0xffff00ff, //
    'down-back-left':   0xffffffff, //
    'up-front':         0x000080ff, //
    'up-back':          0x008000ff, //
    'up-right':         0x008080ff, //
    'up-left':          0x800000ff, //
    'down-front':       0x800080ff, //
    'down-back':        0x808000ff, //
    'down-right':       0x808080ff, //
    'down-left':        0x00ff80ff, //
    'front-right':      0x0080ffff, //
    'front-left':       0xff0080ff, //
    'back-right':       0x8000ffff, //
    'back-left':        0xffff80ff, //
  }
}) => {
  const faces = [
    {
      color: colors['up-front-right'],
      vertices: [
        {
          position: {
            x:  0,
            y:  scale * GOLDEN_RATIO,
            z:  scale,
          },
        },
        {
          position: {
            x:  scale,
            y:  0,
            z:  scale * GOLDEN_RATIO,
          },
        },
        {
          position: {
            x:  scale * GOLDEN_RATIO,
            y:  scale,
            z:  0,
          },
        },
      ]
    },

    {
      color: colors['up-front-left'],
      vertices: [
        {
          position: {
            x:  0,
            y:  scale * GOLDEN_RATIO,
            z:  scale,
          },
        },
        {
          position: {
            x:  scale * -GOLDEN_RATIO,
            y:  scale,
            z:  0,
          },
        },
        {
          position: {
            x: -scale,
            y:  0,
            z:  scale * GOLDEN_RATIO,
          },
        },
      ]
    },

    {
      color: colors['up-back-right'],
      vertices: [
        {
          position: {
            x:  0,
            y:  scale * GOLDEN_RATIO,
            z: -scale,
          },
        },
        {
          position: {
            x:  scale * GOLDEN_RATIO,
            y:  scale,
            z:  0,
          },
        },
        {
          position: {
            x:  scale,
            y:  0,
            z: -scale * GOLDEN_RATIO,
          },
        },
      ]
    },

    {
      color: colors['up-back-left'],
      vertices: [
        {
          position: {
            x:  0,
            y:  scale * GOLDEN_RATIO,
            z: -scale,
          },
        },
        {
          position: {
            x: -scale,
            y:  0,
            z: -scale * GOLDEN_RATIO,
          },
        },
        {
          position: {
            x: -scale * GOLDEN_RATIO,
            y:  scale,
            z:  0,
          },
        },
      ]
    },

    {
      color: colors['down-front-right'],
      vertices: [
        {
          position: {
            x:  0,
            y: -scale * GOLDEN_RATIO,
            z:  scale,
          },
        },
        {
          position: {
            x:  scale * GOLDEN_RATIO,
            y: -scale,
            z:  0,
          },
        },
        {
          position: {
            x:  scale,
            y:  0,
            z:  scale * GOLDEN_RATIO,
          },
        },
      ]
    },

    {
      color: colors['down-front-left'],
      vertices: [
        {
          position: {
            x:  0,
            y: -scale * GOLDEN_RATIO,
            z:  scale,
          },
        },
        {
          position: {
            x: -scale,
            y:  0,
            z:  scale * GOLDEN_RATIO,
          },
        },
        {
          position: {
            x: -scale * GOLDEN_RATIO,
            y: -scale,
            z:  0,
          },
        },
      ]
    },

    {
      color: colors['down-back-right'],
      vertices: [
        {
          position: {
            x:  0,
            y: -scale * GOLDEN_RATIO,
            z: -scale,
          },
        },
        {
          position: {
            x:  scale,
            y:  0,
            z: -scale * GOLDEN_RATIO,
          },
        },
        {
          position: {
            x:  scale * GOLDEN_RATIO,
            y: -scale,
            z:  0,
          },
        },
      ]
    },

    {
      color: colors['down-back-left'],
      vertices: [
        {
          position: {
            x:  0,
            y: -scale * GOLDEN_RATIO,
            z: -scale,
          },
        },
        {
          position: {
            x: -scale * GOLDEN_RATIO,
            y: -scale,
            z:  0,
          },
        },
        {
          position: {
            x: -scale,
            y:  0,
            z: -scale * GOLDEN_RATIO,
          },
        },
      ]
    },

    {
      color: colors['up-front'],
      vertices: [
        {
          position: {
            x:  0,
            y:  scale * GOLDEN_RATIO,
            z:  scale,
          },
        },
        {
          position: {
            x: -scale,
            y:  0,
            z:  scale * GOLDEN_RATIO,
          },
        },
        {
          position: {
            x:  scale,
            y:  0,
            z:  scale * GOLDEN_RATIO,
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
            y:  scale * GOLDEN_RATIO,
            z: -scale,
          },
        },
        {
          position: {
            x:  scale,
            y:  0,
            z: -scale * GOLDEN_RATIO,
          },
        },
        {
          position: {
            x: -scale,
            y:  0,
            z: -scale * GOLDEN_RATIO,
          },
        },
      ]
    },

    {
      color: colors['up-right'],
      vertices: [
        {
          position: {
            x:  scale * GOLDEN_RATIO,
            y:  scale,
            z:  0,
          },
        },
        {
          position: {
            x:  0,
            y:  scale * GOLDEN_RATIO,
            z: -scale,
          },
        },
        {
          position: {
            x:  0,
            y:  scale * GOLDEN_RATIO,
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
            x: -scale * GOLDEN_RATIO,
            y:  scale,
            z:  0,
          },
        },
        {
          position: {
            x:  0,
            y:  scale * GOLDEN_RATIO,
            z:  scale,
          },
        },
        {
          position: {
            x:  0,
            y:  scale * GOLDEN_RATIO,
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
            y: -scale * GOLDEN_RATIO,
            z:  scale,
          },
        },
        {
          position: {
            x:  scale,
            y:  0,
            z:  scale * GOLDEN_RATIO,
          },
        },
        {
          position: {
            x: -scale,
            y:  0,
            z:  scale * GOLDEN_RATIO,
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
            y: -scale * GOLDEN_RATIO,
            z: -scale,
          },
        },
        {
          position: {
            x: -scale,
            y:  0,
            z: -scale * GOLDEN_RATIO,
          },
        },
        {
          position: {
            x:  scale,
            y:  0,
            z: -scale * GOLDEN_RATIO,
          },
        },
      ]
    },

    {
      color: colors['down-right'],
      vertices: [
        {
          position: {
            x:  scale * GOLDEN_RATIO,
            y: -scale,
            z:  0,
          },
        },
        {
          position: {
            x:  0,
            y: -scale * GOLDEN_RATIO,
            z:  scale,
          },
        },
        {
          position: {
            x:  0,
            y: -scale * GOLDEN_RATIO,
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
            x: -scale * GOLDEN_RATIO,
            y: -scale,
            z:  0,
          },
        },
        {
          position: {
            x:  0,
            y: -scale * GOLDEN_RATIO,
            z: -scale,
          },
        },
        {
          position: {
            x:  0,
            y: -scale * GOLDEN_RATIO,
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
            x:  scale,
            y:  0,
            z:  scale * GOLDEN_RATIO,
          },
        },
        {
          position: {
            x:  scale * GOLDEN_RATIO,
            y: -scale,
            z:  0,
          },
        },
        {
          position: {
            x:  scale * GOLDEN_RATIO,
            y:  scale,
            z:  0,
          },
        },
      ]
    },

    {
      color: colors['front-left'],
      vertices: [
        {
          position: {
            x: -scale,
            y:  0,
            z:  scale * GOLDEN_RATIO,
          },
        },
        {
          position: {
            x: -scale * GOLDEN_RATIO,
            y:  scale,
            z:  0,
          },
        },
        {
          position: {
            x: -scale * GOLDEN_RATIO,
            y: -scale,
            z:  0,
          },
        },
      ]
    },

    {
      color: colors['back-right'],
      vertices: [
        {
          position: {
            x:  scale,
            y:  0,
            z: -scale * GOLDEN_RATIO,
          },
        },
        {
          position: {
            x:  scale * GOLDEN_RATIO,
            y:  scale,
            z:  0,
          },
        },
        {
          position: {
            x:  scale * GOLDEN_RATIO,
            y: -scale,
            z:  0,
          },
        },
      ]
    },

    {
      color: colors['back-left'],
      vertices: [
        {
          position: {
            x: -scale,
            y:  0,
            z: -scale * GOLDEN_RATIO,
          },
        },
        {
          position: {
            x: -scale * GOLDEN_RATIO,
            y: -scale,
            z:  0,
          },
        },
        {
          position: {
            x: -scale * GOLDEN_RATIO,
            y:  scale,
            z:  0,
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

export default createRegularIcosahedron;
