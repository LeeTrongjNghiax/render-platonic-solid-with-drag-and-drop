import readTextFile from "../../../scripts/utilities/read-text-file.js";
import createRegularTetrahedron from "../../../scripts/create-convex-polyhedras/create-regular-tetrahedron.js";
import createRegularHexahedron from "../../../scripts/create-convex-polyhedras/create-regular-hexahedron.js";
import createRegularOctahedron from "../../../scripts/create-convex-polyhedras/create-regular-octahedron.js";
import createRegularDodecahedron from "../../../scripts/create-convex-polyhedras/create-regular-dodecahedron.js";
import createRegularIcosahedron from "../../../scripts/create-convex-polyhedras/create-regular-icosahedron.js";
import identity from "../../../scripts/maths/identity.js";
import rotate from "../../../scripts/maths/rotate.js";
import multiply from "../../../scripts/maths/multiply.js";
import lookAt from "../../../scripts/maths/look-at.js";
import perspective from "../../../scripts/maths/perspective.js";

const createPlatonicSolid = async (form) => {
  const formData = new FormData(form);

  const faceGap = formData.get(`face-gap`);

  if (!faceGap) throw new Error(`Face gap is required`);

  const scale = formData.get(`scale`);

  if (!scale) throw new Error(`Scale is required`);

  const canvas = document.querySelector(`.c-main__canvas`);

  if (!canvas) throw new Error(`Canvas not found`);

  const gl = canvas.getContext(`webgl2`);

  if (!gl) throw new Error(`WebGL2 context not found`);

  const width = gl.canvas.clientWidth;
  const height = gl.canvas.clientHeight;

  gl.canvas.width = width;
  gl.canvas.height = height;
  
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);

  gl.frontFace(gl.CCW);

  gl.enable(gl.CULL_FACE);
  gl.cullFace(gl.BACK);

  gl.clearColor(.07, .07, .07, 1.0);
  gl.clear(
    gl.COLOR_BUFFER_BIT |
    gl.DEPTH_BUFFER_BIT |
    gl.STENCIL_BUFFER_BIT
  );

  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  const vertexShaderSource = await readTextFile(`./glsl/vertex.glsl`);
  gl.shaderSource(vertexShader, vertexShaderSource);
  gl.compileShader(vertexShader);

  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(vertexShader));
    throw new Error('Vertex shader compilation failed');
  }

  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  const fragmentShaderSource = await readTextFile(`./glsl/fragment.glsl`);
  gl.shaderSource(fragmentShader, fragmentShaderSource);
  gl.compileShader(fragmentShader);

  if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(fragmentShader));
    throw new Error('Fragment shader compilation failed');
  }

  const program = gl.createProgram();

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);

  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program));
    throw new Error('Program linking failed');
  }

  gl.validateProgram(program);

  gl.useProgram(program);

  let object;

  const platonicSolidType = document.querySelector(`#platonic-solid-type`);

  if (!platonicSolidType) throw new Error(`Platonic solid type is required`);

  switch (platonicSolidType.value) {
    case `regular-tetrahedron`:
      object = createRegularTetrahedron({
        scale: +scale,
        gapScale: +faceGap,
      });
      break;
    case `regular-hexahedron`: default:
      object = createRegularHexahedron({
        scale: +scale,
        gapScale: +faceGap,
      });
      break;
    case `regular-octahedron`:
      object = createRegularOctahedron({
        scale: +scale,
        gapScale: +faceGap,
      });
      break;
    case `regular-dodecahedron`:
      object = createRegularDodecahedron({
        scale: +scale,
        gapScale: +faceGap,
      });
      break;
    case `regular-icosahedron`:
      object = createRegularIcosahedron({
        scale: +scale,
        gapScale: +faceGap,
      });
      break;
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(object.vertices),
    gl.STATIC_DRAW,
  );

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(object.vertexIndices),
    gl.STATIC_DRAW,
  );

  const positionAttributeLocationIndex = 0;
  gl.vertexAttribPointer(
    positionAttributeLocationIndex,
    3,
    gl.FLOAT,
    false,
    7 * Float32Array.BYTES_PER_ELEMENT,
    0
  );
  gl.enableVertexAttribArray(positionAttributeLocationIndex);

  const colorAttributeLocationIndex = 1;
  gl.vertexAttribPointer(
    colorAttributeLocationIndex,
    4,
    gl.FLOAT,
    false,
    7 * Float32Array.BYTES_PER_ELEMENT,
    3 * Float32Array.BYTES_PER_ELEMENT,
  );
  gl.enableVertexAttribArray(colorAttributeLocationIndex);

  const identityMatrix = identity();

  const modelMatrix = identity();
  const viewMatrix = identity();
  const projectionMatrix = identity();

  const orientationXMatrix = identity();
  const orientationYMatrix = identity();
  const orientationZMatrix = identity();

  const axisXVector = new Float32Array([1, 0, 0]);
  const axisYVector = new Float32Array([0, 1, 0]);
  const axisZVector = new Float32Array([0, 0, 1]);
  
  const orientationXAngle = -.6;
  const orientationYAngle = -.7;
  const orientationZAngle = 0;

  rotate(orientationXMatrix, identityMatrix, orientationXAngle, axisXVector);
  rotate(orientationYMatrix, identityMatrix, orientationYAngle, axisYVector);
  rotate(orientationZMatrix, identityMatrix, orientationZAngle, axisZVector);

  multiply(modelMatrix, orientationXMatrix, orientationYMatrix);
  multiply(modelMatrix, modelMatrix, orientationZMatrix);

  const camera = {
    position: { x: 0, y: 0, z: -12, },
    target: { x: 0, y: 0, z: 0, },
    up: { x: 0, y: 1, z: 0, },
    fieldOfView: Math.PI / 12,
    aspectRatio: width / height,
    nearPlane: 0.1,
    farPlane: 100,
  }

  lookAt(
    viewMatrix, 
    new Float32Array([camera.position.x, camera.position.y, camera.position.z]),
    new Float32Array([camera.target.x, camera.target.y, camera.target.z]),
    new Float32Array([camera.up.x, camera.up.y, camera.up.z]),
  );

  perspective(
    projectionMatrix,
    camera.fieldOfView,
    camera.aspectRatio,
    camera.nearPlane,
    camera.farPlane,
  )

  const modelUniformLocation = gl.getUniformLocation(program, 'u_model');
  const viewUniformLocation = gl.getUniformLocation(program, 'u_view');
  const projectionUniformLocation = gl.getUniformLocation(program, 'u_projection');

  gl.uniformMatrix4fv(modelUniformLocation, false, modelMatrix);
  gl.uniformMatrix4fv(viewUniformLocation, false, viewMatrix);
  gl.uniformMatrix4fv(projectionUniformLocation, false, projectionMatrix);

  gl.drawElements(
    gl.TRIANGLES,
    object.vertexIndices.length,
    gl.UNSIGNED_SHORT,
    0
  );

  let angle = 0;

  const loop = () => {
    angle += 0.01;

    gl.clear(
      gl.COLOR_BUFFER_BIT |
      gl.DEPTH_BUFFER_BIT |
      gl.STENCIL_BUFFER_BIT
    );

    rotate(orientationXMatrix, identityMatrix, angle, axisXVector);
    rotate(orientationYMatrix, identityMatrix, angle, axisYVector);
    rotate(orientationZMatrix, identityMatrix, angle, axisZVector);

    multiply(modelMatrix, orientationXMatrix, orientationYMatrix);
    multiply(modelMatrix, modelMatrix, orientationZMatrix);

    gl.uniformMatrix4fv(modelUniformLocation, false, modelMatrix);
    gl.uniformMatrix4fv(viewUniformLocation, false, viewMatrix);
    gl.uniformMatrix4fv(projectionUniformLocation, false, projectionMatrix);

    gl.drawElements(
      gl.TRIANGLES,
      object.vertexIndices.length,
      gl.UNSIGNED_SHORT,
      0
    );

    requestAnimationFrame(loop);
  }

  loop();
}

const handdleCreatePlatonicSolid = (event) => {
  event.preventDefault();
  createPlatonicSolid(event.target);
}

const initiateForm = () => {
  const form = document.querySelector(`.c-form`);

  if (!form) throw new Error(`Form not found`);

  form.addEventListener(`submit`, handdleCreatePlatonicSolid);
}

document.addEventListener(`DOMContentLoaded`, initiateForm);
