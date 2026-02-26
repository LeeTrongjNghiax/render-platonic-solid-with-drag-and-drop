import hexToUnitArray from "../utilities/hex-to-unit-array.js";
import getNormalizedNormalVectorFromThreeVertices from "../utilities/get-normalized-normal-vector-from-three-vertices.js";

const createRegularOctahedron = ({
  scale = 1,
  colors = {
    'up-front-right': 0xffffffff, //
    'up-front-left': 0xff0000ff, //
    'up-back-right': 0x00ff00ff, //
    'up-back-left': 0x0000ffff, //
    'down-front-right': 0xffff00ff, //
    'down-front-left': 0xff00ffff, //
    'down-back-right': 0x00ffffff, //
    'down-back-left': 0x000000ff, //
  }
}) => {
  const faces = [
    {
      color: colors['up-front-right'],
      vertices: [
        {
          position: {
            x: 0,
            y: scale,
            z: 0,
          },
        },
        {
          position: {
            x: 0,
            y: 0,
            z: scale,
          },
        },
        {
          position: {
            x: scale,
            y: 0,
            z: 0,
          },
        },
      ]
    },

    {
      color: colors['up-front-left'],
      vertices: [
        {
          position: {
            x: 0,
            y: scale,
            z: 0,
          },
        },
        {
          position: {
            x: -scale,
            y: 0,
            z: 0,
          },
        },
        {
          position: {
            x: 0,
            y: 0,
            z: scale,
          },
        },
      ]
    },

    {
      color: colors['up-back-right'],
      vertices: [
        {
          position: {
            x: 0,
            y: scale,
            z: 0,
          },
        },
        {
          position: {
            x: scale,
            y: 0,
            z: 0,
          },
        },
        {
          position: {
            x: 0,
            y: 0,
            z: -scale,
          },
        },
      ]
    },

    {
      color: colors['up-back-left'],
      vertices: [
        {
          position: {
            x: 0,
            y: scale,
            z: 0,
          },
        },
        {
          position: {
            x: 0,
            y: 0,
            z: -scale,
          },
        },
        {
          position: {
            x: -scale,
            y: 0,
            z: 0,
          },
        },
      ]
    },

    {
      color: colors['down-front-right'],
      vertices: [
        {
          position: {
            x: 0,
            y: -scale,
            z: 0,
          },
        },
        {
          position: {
            x: scale,
            y: 0,
            z: 0,
          },
        },
        {
          position: {
            x: 0,
            y: 0,
            z: scale,
          },
        },
      ]
    },

    {
      color: colors['down-front-left'],
      vertices: [
        {
          position: {
            x: 0,
            y: -scale,
            z: 0,
          },
        },
        {
          position: {
            x: 0,
            y: 0,
            z: scale,
          },
        },
        {
          position: {
            x: -scale,
            y: 0,
            z: 0,
          },
        },
      ]
    },

    {
      color: colors['down-back-right'],
      vertices: [
        {
          position: {
            x: 0,
            y: -scale,
            z: 0,
          },
        },
        {
          position: {
            x: 0,
            y: 0,
            z: -scale,
          },
        },
        {
          position: {
            x: scale,
            y: 0,
            z: 0,
          },
        },
      ]
    },

    {
      color: colors['down-back-left'],
      vertices: [
        {
          position: {
            x: 0,
            y: -scale,
            z: 0,
          },
        },
        {
          position: {
            x: -scale,
            y: 0,
            z: 0,
          },
        },
        {
          position: {
            x: 0,
            y: 0,
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
    )
  }

  return {
    faces,
    vertices,
    vertexIndices,
  }
}

export default createRegularOctahedron;
