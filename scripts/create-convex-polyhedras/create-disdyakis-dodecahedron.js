import createRegularSolid from "./create-regular-solid.js";

const createDisdyakisDodecahedron = ({
  scale = 1,
  colors = [
    0x000000ff,
    0x0000ffff,
    0x00ff00ff,
    0x00ffffff,
    0xff0000ff,
    0xff00ffff,
    0xffff00ff,
    0xffffffff,
    0x000000ff,
    0x0000ffff,
    0x00ff00ff,
    0x00ffffff,
    0xff0000ff,
    0xff00ffff,
    0xffff00ff,
    0xffffffff,
    0x000000ff,
    0x0000ffff,
    0x00ff00ff,
    0x00ffffff,
    0xff0000ff,
    0xff00ffff,
    0xffff00ff,
    0xffffffff,
  ],
}) => {
  const a = 1 / (1 + 2 * Math.sqrt(2));
  const b = 1 / (2 + 3 * Math.sqrt(2));
  const c = 1 / (3 + 3 * Math.sqrt(2));

  return createRegularSolid({
    scale,
    colors,

    maximumNumberOfFaces: 48,
    maximumNumberOfFacesShareTheSameVertex: 6,
    numberOfVerticesEachFace: [3],
    baseVertices: [
      {
        position: { x: a, y: 0, z: 0 },
        signed: true,
        rotateCount: 2,
      },
      {
        position: { x: b, y: b, z: 0 },
        signed: true,
        rotateCount: 2,
      },
      {
        position: { x: c, y: c, z: c },
        signed: true,
        rotateCount: 0,
      },
    ],
  });
}

export default createDisdyakisDodecahedron;
