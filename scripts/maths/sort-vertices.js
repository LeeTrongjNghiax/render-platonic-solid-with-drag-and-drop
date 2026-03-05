import normalize from "./normalize.js";
import cross from "./cross.js";
import dot from "./dot.js";
import subtract from "./subtract.js";

const sortVertices = (vertices = [], normal = { x: 0, y: 0, z: 0 }) => {
  if (!vertices || vertices.length < 3) return [...vertices];

  const centroid = { x: 0, y: 0, z: 0 };

  for (let v of vertices) {
    centroid.x += v.x;
    centroid.y += v.y;
    centroid.z += v.z;
  }

  centroid.x /= vertices.length;
  centroid.y /= vertices.length;
  centroid.z /= vertices.length;

  // 2. Create a local 2D basis (u, v) on the plane
  const n = normalize([normal.x, normal.y, normal.z]);

  // Pick an arbitrary vector 'w' that is not parallel to 'n'
  const w = (Math.abs(n.x) > 0.9) ? { x: 0, y: 1, z: 0 } : { x: 1, y: 0, z: 0 };

  // 'u' is a vector on the plane
  const u = normalize(cross(w, n));

  // 'v' is orthogonal to both 'n' and 'u' on the plane.
  // The order (n x u) ensures (u, v, n) forms a right-handed coordinate system,
  // which guarantees a counter-clockwise sort when looking down the normal.
  const v = normalize(cross(n, u));

  // 3. Calculate angles and map them to the vertices
  const verticesWithAngles = vertices.map(vertex => {
    // Vector from centroid to vertex
    const vec = subtract(vertex, centroid);

    // Project the vector onto our local 2D axes
    const localX = dot(vec, u);
    const localY = dot(vec, v);

    // Calculate the angle (-Math.PI to Math.PI)
    const angle = Math.atan2(localY, localX);

    return { vertex, angle };
  });

  // 4. Sort by angle ascending
  verticesWithAngles.sort((a, b) => a.angle - b.angle);

  // Return just the sorted vertex objects
  return verticesWithAngles.map(item => item.vertex);
}

export default sortVertices;
