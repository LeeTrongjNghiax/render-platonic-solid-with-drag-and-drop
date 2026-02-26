import hexToUnitArray from "../utilities/hex-to-unit-array.js";
import getNormalizedNormalVectorFromThreeVertices from "../utilities/get-normalized-normal-vector-from-three-vertices.js";

const createRhombicDodecahedron = ({
  scale = 1,
  colors = {
    'up-front': 0x0000ffff, //
    'up-left': 0x00ff00ff, //
    'up-right': 0x00ffffff, //
    'up-back': 0xff0000ff, //
    'down-front': 0xff00ffff, //
    'down-left': 0xffff00ff, //
    'down-right': 0xffffffff, //
    'down-back': 0x000080ff, //
    'front-right': 0x008000ff, //
    'front-left': 0x008080ff, //
    'back-right': 0x800000ff, //
    'back-left': 0x800080ff, //
  }
}) => {
  const faces = [
    {
      color: colors['up-front'],
      vertices: [
        {
          position: {
            x:  0,
            y:  scale * 2,
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
            x:  0,
            y:  0,
            z:  scale * 2,
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
            x:  0,
            y:  scale * 2,
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
        {
          position: {
            x: -scale * 2,
            y:  0,
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
      ]
    },

    {
      color: colors['up-right'],
      vertices: [
        {
          position: {
            x:  0,
            y:  scale * 2,
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
        {
          position: {
            x:  scale * 2,
            y:  0,
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
      ]
    },

    {
      color: colors['up-back'],
      vertices: [
        {
          position: {
            x:  0,
            y:  scale * 2,
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
            x:  0,
            y:  0,
            z: -scale * 2,
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
            y: -scale * 2,
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
            x:  0,
            y:  0,
            z:  scale * 2,
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
      color: colors['down-left'],
      vertices: [
        {
          position: {
            x:  0,
            y: -scale * 2,
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
        {
          position: {
            x: -scale * 2,
            y:  0,
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
      ]
    },

    {
      color: colors['down-right'],
      vertices: [
        {
          position: {
            x:  0,
            y: -scale * 2,
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
        {
          position: {
            x:  scale * 2,
            y:  0,
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
      ]
    },

    {
      color: colors['down-back'],
      vertices: [
        {
          position: {
            x:  0,
            y: -scale * 2,
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
            x:  0,
            y:  0,
            z: -scale * 2,
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
      color: colors['front-right'],
      vertices: [
        {
          position: {
            x:  0,
            y:  0,
            z:  scale * 2,
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
            x:  scale * 2,
            y:  0,
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
      color: colors['front-left'],
      vertices: [
        {
          position: {
            x:  0,
            y:  0,
            z:  scale * 2,
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
            x: -scale * 2,
            y:  0,
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
      color: colors['back-right'],
      vertices: [
        {
          position: {
            x:  0,
            y:  0,
            z: -scale * 2,
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
            x:  scale * 2,
            y:  0,
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
      color: colors['back-left'],
      vertices: [
        {
          position: {
            x:  0,
            y:  0,
            z: -scale * 2,
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
            x: -scale * 2,
            y:  0,
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

export default createRhombicDodecahedron;
