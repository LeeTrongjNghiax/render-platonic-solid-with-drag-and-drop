import createRegularSolid from "../create-regular-solid.js";

const createSnubDisphenoid = ({ scale = 1, colors = [] }) => {
  const p = -97 / 12;
  const q = 881 / 108;

  const rc = 2 * Math.sqrt(-p / 3);
  const theta = Math.acos((3 * q / (2 * p)) * Math.sqrt(-3 / p));

  const t0 = rc * Math.cos(theta / 3);

  const r = t0 - 11 / 6;

  const s = Math.sqrt( (1 - r) / (2 * r) )
  const t = Math.sqrt(2 - 2 * r);

  return createRegularSolid({
    scale,
    colors,

    maximumNumberOfFaces: 12,
    maximumNumberOfFacesShareTheSameVertex: 5,
    numberOfVerticesEachFace: [3],
    baseVertices: [
      { position: { x: t, y: Math.sqrt(r), z: 0 }, signed: false },
      { position: { x: -t, y: Math.sqrt(r), z: 0 }, signed: false },
      { position: { x: 0, y: -Math.sqrt(r), z: t }, signed: false },
      { position: { x: 0, y: -Math.sqrt(r), z: -t }, signed: false },
      { position: { x: 1, y: -s, z: 0 }, signed: false },
      { position: { x: -1, y: -s, z: 0 }, signed: false },
      { position: { x: 0, y: s, z: 1 }, signed: false },
      { position: { x: 0, y: s, z: -1 }, signed: false },
    ],
  });
}

export default createSnubDisphenoid;
