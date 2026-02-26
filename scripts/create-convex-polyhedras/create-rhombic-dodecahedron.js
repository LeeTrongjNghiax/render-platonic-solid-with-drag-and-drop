import hexToUnitArray from "../utilities/hex-to-unit-array.js";

const createRhombicDodecahedron = ({
  scale = 1,
  colors = {
    'up-front-right': 0x0000ffff, //
    'up-front-left': 0x0000ffff, //
    'up-back-right': 0x0000ffff, //
    'up-back-left': 0x0000ffff, //
    'down-front-right': 0x0000ffff, //
    'down-front-left': 0x0000ffff, //
    'down-back-right': 0x0000ffff, //
    'down-back-left': 0x0000ffff, //
    'front': 0x0000ffff, //
    'back': 0x0000ffff, //
    'right': 0x0000ffff, //
    'left': 0x0000ffff, //
  }
}) => {
  const faces = [
    {
      color: colors[''],
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
  ];
}

export default createRhombicDodecahedron;
