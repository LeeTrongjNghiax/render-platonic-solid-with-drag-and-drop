import GOLDEN_RATIO from "../../constants/golden-ratio.constant.js";
import RECIPROCAL_OF_GOLDEN_RATION from "../../constants/reciprocal-of-golden-ratio.constant.js";
import createRegularSolid from "../create-regular-solid.js";

const createDeltoidalHexecontahedron = ({ scale = 1.6, colors = [] }) => {
  const regularIcosahedronUnitScale = 1 / Math.hypot(0, 1, GOLDEN_RATIO);
  const regularIcosahedronScale = 1;

  const regularDodecahedronUnitScale = 1 / Math.sqrt(3);
  const regularDodecahedronScale = (3 / 11) * Math.sqrt( 15 - 6 / Math.sqrt(5) );

  const icosidodecahedronUnitScale = 1;
  const icosidodecahedronScale = 3 * Math.sqrt( 1 - 2 / Math.sqrt(5) );

  return createRegularSolid({
    scale,
    colors,

    maximumNumberOfFaces: 60,
    baseVertices: [
      {
        position: {
          x: 0,
          y: regularIcosahedronUnitScale * regularIcosahedronScale,
          z: regularIcosahedronUnitScale * regularIcosahedronScale * GOLDEN_RATIO,
        },
        signed: true,
        permutationType: `even`,
      },

      {
        position: {
          x: regularDodecahedronUnitScale * regularDodecahedronScale,
          y: regularDodecahedronUnitScale * regularDodecahedronScale,
          z: regularDodecahedronUnitScale * regularDodecahedronScale,
        },
        signed: true,
      },
      {
        position: {
          x: 0,
          y: regularDodecahedronUnitScale * regularDodecahedronScale * GOLDEN_RATIO,
          z: regularDodecahedronUnitScale * regularDodecahedronScale * RECIPROCAL_OF_GOLDEN_RATION,
        },
        signed: true,
        permutationType: `even`,
      },

      {
        position: { x: icosidodecahedronUnitScale * icosidodecahedronScale, y: 0, z: 0 },
        signed: true,
        permutationType: `even`,
      },
      {
        position: {
          x: icosidodecahedronUnitScale * icosidodecahedronScale * ( GOLDEN_RATIO / 2 ),
          y: icosidodecahedronUnitScale * icosidodecahedronScale * ( 1 / (GOLDEN_RATIO * 2) ),
          z: icosidodecahedronUnitScale * icosidodecahedronScale * ( 1 / 2 ),
        },
        signed: true,
        permutationType: `even`,
      },
    ],
  });
}

export default createDeltoidalHexecontahedron;
