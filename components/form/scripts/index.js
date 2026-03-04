import createRegularTetrahedron from "../../../scripts/create-convex-polyhedras/create-regular-tetrahedron.js";
import createRegularHexahedron from "../../../scripts/create-convex-polyhedras/create-regular-hexahedron.js";
import createRegularOctahedron from "../../../scripts/create-convex-polyhedras/create-regular-octahedron.js";
import createRegularDodecahedron from "../../../scripts/create-convex-polyhedras/create-regular-dodecahedron.js";
import createRegularIcosahedron from "../../../scripts/create-convex-polyhedras/create-regular-icosahedron.js";
import createRegularDodecahedron3 from "../../../scripts/create-convex-polyhedras/create-regular-dodecahedron-3.js";
import createRhombicDodecahedron from "../../../scripts/create-convex-polyhedras/create-rhombic-dodecahedron.js";
import createTriakisOctahedron from "../../../scripts/create-convex-polyhedras/create-triakis-octahedron.js";
import createTetrakisHexahedron from "../../../scripts/create-convex-polyhedras/create-tetrakis-hexahedron.js";
import createRhombicuboctahedron from "../../../scripts/create-convex-polyhedras/create-rhombicuboctahedron.js";
import createDisdyakisDodecahedron from "../../../scripts/create-convex-polyhedras/create-disdyakis-dodecahedron.js";
import createRhombicTriacontahedron from "../../../scripts/create-convex-polyhedras/create-rhombic-triacontahedron.js";
import createTriakisIcosahedron from "../../../scripts/create-convex-polyhedras/create-triakis-icosahedron.js";
import createPentakisDodecahedron from "../../../scripts/create-convex-polyhedras/create-pentakis-dodecahedron.js";
import createDisdyakisTriacontahedron from "../../../scripts/create-convex-polyhedras/create-disdyakis-triacontahedron.js";

import getRandomInteger from "../../../scripts/utilities/get-random-integer.js";
import readTextFile from "../../../scripts/utilities/read-text-file.js";
import identity from "../../../scripts/maths/identity.js";
import rotate from "../../../scripts/maths/rotate.js";
import multiply from "../../../scripts/maths/multiply.js";
import lookAt from "../../../scripts/maths/look-at.js";
import perspective from "../../../scripts/maths/perspective.js";

let modelUniformLocation;
let viewUniformLocation;
let projectionUniformLocation;
let pointSizeUniformLocation;
let objectVertexIndicesLength;
let scaleUniformLocation;
let faceGapUniformLocation;

let rotateXSpeed = 0;
let rotateYSpeed = 0;
let rotateZSpeed = 0;

const createSolid = async () => {
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

  const scale = document.querySelector(`#scale`);

  if (!scale) throw new Error(`Scale not found`);

  const faceGap = document.querySelector(`#face-gap`);

  if (!faceGap) throw new Error(`Face gap not found`);

  const solidType = document.querySelector(`#solid-type`);

  if (!solidType) throw new Error(`Solid type is required`);

  switch (solidType.value) {
    // Platonic Solids
    case `regular-tetrahedron`: object = createRegularTetrahedron({}); break;
    case `regular-hexahedron`: default:
      object = createRegularHexahedron({});
      break;
    case `regular-octahedron`: object = createRegularOctahedron({}); break;
    case `regular-dodecahedron`: object = createRegularDodecahedron3({}); break;
    case `regular-icosahedron`: object = createRegularIcosahedron({}); break;

    // Catalan Solids
    // triakis tetrahedron
    case `rhombic-dodecahedron`: object = createRhombicDodecahedron({}); break;
    case `triakis-octahedron`: object = createTriakisOctahedron({}); break;
    case `tetrakis-hexahedron`: object = createTetrakisHexahedron({}); break;
    // deltoidal icositetrahedron
    case `disdyakis-dodecahedron`:
      object = createDisdyakisDodecahedron({});
      break;
    // pentagonal icositetrahedron
    case `rhombic-triacontahedron`:
      object = createRhombicTriacontahedron({});
      break;
    case `triakis-icosahedron`: object = createTriakisIcosahedron({}); break;
    case `pentakis-dodecahedron`:
      object = createPentakisDodecahedron({});
      break;
    // deltoidal hexecontahedron
    case `disdyakis-triacontahedron`:
      object = createDisdyakisTriacontahedron({});
      break;
    // pentagonal hexecontahedron

    case `rhombicuboctahedron`: object = createRhombicuboctahedron({}); break;
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
    10 * Float32Array.BYTES_PER_ELEMENT,
    0
  );
  gl.enableVertexAttribArray(positionAttributeLocationIndex);

  const normalAttributeLocationIndex = 1;
  gl.vertexAttribPointer(
    normalAttributeLocationIndex,
    3,
    gl.FLOAT,
    false,
    10 * Float32Array.BYTES_PER_ELEMENT,
    3 * Float32Array.BYTES_PER_ELEMENT,
  );
  gl.enableVertexAttribArray(normalAttributeLocationIndex);

  const colorAttributeLocationIndex = 2;
  gl.vertexAttribPointer(
    colorAttributeLocationIndex,
    4,
    gl.FLOAT,
    false,
    10 * Float32Array.BYTES_PER_ELEMENT,
    6 * Float32Array.BYTES_PER_ELEMENT,
  );
  gl.enableVertexAttribArray(colorAttributeLocationIndex);

  const cameraDistance = document.querySelector(`#camera-distance`);

  if (!cameraDistance) throw new Error(`Camera Distance not found`);

  const cameraSensitivity = document.querySelector(`#camera-sensitivity`);

  if (!cameraSensitivity) throw new Error(`Camera Sensitivity not found`);

  const cameraPolarAngle = document.querySelector(`#camera-polar-angle`);

  if (!cameraPolarAngle) throw new Error(`Camera Polar Angle not found`);

  const cameraAzimuthalAngle = document.querySelector(`#camera-azimuthal-angle`);

  if (!cameraAzimuthalAngle) throw new Error(`Camera Azimuthal Angle not found`);

  const cameraZoomSpeed = document.querySelector(`#camera-zoom-speed`);

  if (!cameraZoomSpeed) throw new Error(`Camera Zoom Speed not found`);

  const fieldOfView = document.querySelector(`#field-of-view`);

  if (!fieldOfView) throw new Error(`Field Of View not found`);

  const nearPlane = document.querySelector(`#near-plane`);

  if (!nearPlane) throw new Error(`Near Plane not found`);

  const farPlane = document.querySelector(`#far-plane`);

  if (!farPlane) throw new Error(`Far Plane not found`);

  const cameraLookAtX = document.querySelector(`#camera-look-at-x`);

  if (!cameraLookAtX) throw new Error(`Camera Look At X not found`);

  const cameraLookAtY = document.querySelector(`#camera-look-at-y`);

  if (!cameraLookAtY) throw new Error(`Camera Look At Y not found`);

  const cameraLookAtZ = document.querySelector(`#camera-look-at-z`);

  if (!cameraLookAtZ) throw new Error(`Camera Look At Z not found`);

  const cameraUpX = document.querySelector(`#camera-up-axis-x`);

  if (!cameraUpX) throw new Error(`Camera Up Axis X not found`);

  const cameraUpY = document.querySelector(`#camera-up-axis-y`);

  if (!cameraUpY) throw new Error(`Camera Up Axis Y not found`);

  const cameraUpZ = document.querySelector(`#camera-up-axis-z`);

  if (!cameraUpZ) throw new Error(`Camera Up Axis Z not found`);

  const pointSize = document.querySelector(`#point-size`);

  if (!pointSize) throw new Error(`Point size not found`);

  const camera = {
    position: { x: 0, y: 0, z: +cameraDistance.value, },
    target: {
      x: +cameraLookAtX.value,
      y: +cameraLookAtY.value,
      z: +cameraLookAtZ.value,
    },
    up: {
      x: +cameraUpX.value,
      y: +cameraUpY.value,
      z: +cameraUpZ.value,
    },
    fieldOfView: +fieldOfView.value,
    aspectRatio: width / height,
    nearPlane: +nearPlane.value,
    farPlane: +farPlane.value,

    radius: +cameraDistance.value,
    theta: +cameraPolarAngle.value,
    phi: +cameraAzimuthalAngle.value,
    sensitivity: +cameraSensitivity.value,
    zoomSpeed: +cameraZoomSpeed.value,
    lastTouchDistance: 0,
  }

  const updateCameraPosition = () => {
    camera.position.x = camera.radius * Math.sin(camera.phi) * Math.cos(camera.theta);
    camera.position.y = camera.radius * Math.cos(camera.phi);
    camera.position.z = camera.radius * Math.sin(camera.phi) * Math.sin(camera.theta);
  }

  updateCameraPosition();

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

  let orientationXAngle = 0;
  let orientationYAngle = 0;
  let orientationZAngle = 0;

  modelUniformLocation = gl.getUniformLocation(program, 'u_model');
  viewUniformLocation = gl.getUniformLocation(program, 'u_view');
  projectionUniformLocation = gl.getUniformLocation(
    program,
    'u_projection',
  );
  pointSizeUniformLocation = gl.getUniformLocation(program, 'u_pointSize');
  scaleUniformLocation = gl.getUniformLocation(program, 'u_scale');
  faceGapUniformLocation = gl.getUniformLocation(program, 'u_faceGap');

  objectVertexIndicesLength = object.vertexIndices.length;

  const drawMode = document.querySelector(`#draw-mode`);

  if (!drawMode) throw new Error(`Draw Mode not found`);

  const getDrawMode = () => {
    let drawModeValue = gl.TRIANGLES;

    switch (drawMode.value) {
      case `points`:
        drawModeValue = gl.POINTS;
        break;
      case `lines`:
        drawModeValue = gl.LINES;
        break;
      case `line-loop`:
        drawModeValue = gl.LINE_LOOP;
        break;
      case `line-strip`:
        drawModeValue = gl.LINE_STRIP;
        break;
      case `triangle-strip`:
        drawModeValue = gl.TRIANGLE_STRIP;
        break;
      case `triangle-fan`:
        drawModeValue = gl.TRIANGLE_FAN;
        break;
      case `triangles`:
        drawModeValue = gl.TRIANGLES;
        break;
      default:
        drawModeValue = gl.TRIANGLES;
        break;
    }

    return drawModeValue;
  }

  const updateCamera = () => {
    updateCameraPosition();

    lookAt(
      viewMatrix,
      new Float32Array([
        camera.position.x,
        camera.position.y,
        camera.position.z,
      ]),
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

    rotate(orientationXMatrix, identityMatrix, orientationXAngle, axisXVector);
    rotate(orientationYMatrix, identityMatrix, orientationYAngle, axisYVector);
    rotate(orientationZMatrix, identityMatrix, orientationZAngle, axisZVector);

    multiply(modelMatrix, orientationXMatrix, orientationYMatrix);
    multiply(modelMatrix, modelMatrix, orientationZMatrix);

    gl.uniformMatrix4fv(modelUniformLocation, false, modelMatrix);
    gl.uniformMatrix4fv(viewUniformLocation, false, viewMatrix);
    gl.uniformMatrix4fv(projectionUniformLocation, false, projectionMatrix);
    gl.uniform1f(pointSizeUniformLocation, +pointSize.value);
    gl.uniform1f(scaleUniformLocation, +scale.value);
    gl.uniform1f(faceGapUniformLocation, +faceGap.value);
    gl.drawElements(
      getDrawMode(),
      objectVertexIndicesLength,
      gl.UNSIGNED_SHORT,
      0
    );
  }

  updateCamera();

  let isInteracting = false;
  let lastX;
  let lastY;

  const startInteract = (x, y) => {
    isInteracting = true;
    lastX = x;
    lastY = y;
  }

  const stopInteract = () => {
    isInteracting = false;
    camera.lastTouchDistance = 0;
  }

  const handleRotate = (rotateX, rotateY) => {
    const dx = rotateX - lastX;
    const dy = rotateY - lastY;

    camera.theta += dx * camera.sensitivity;
    camera.phi += dy * camera.sensitivity;
    camera.phi = Math.max(0.01, Math.min(Math.PI - 0.01, camera.phi));

    updateCamera();

    lastX = rotateX;
    lastY = rotateY;
  }

  let angle;
  let isMouseDown;
  let lastTime = 0;
  let deltaTime = 0;

  const loop = (timestamp = 0) => {
    if (lastTime === 0) {
      lastTime = timestamp;
      requestAnimationFrame(loop);
      return;
    }

    deltaTime = timestamp - lastTime;

    lastTime = timestamp;

    angle = 0.001 * deltaTime;

    gl.clear(
      gl.COLOR_BUFFER_BIT |
      gl.DEPTH_BUFFER_BIT |
      gl.STENCIL_BUFFER_BIT
    );

    orientationXAngle += angle * rotateXSpeed;
    orientationYAngle += angle * rotateYSpeed;
    orientationZAngle += angle * rotateZSpeed;

    updateCamera();

    requestAnimationFrame(loop);
  }

  loop();

  canvas.addEventListener(`mousedown`, (e) => {
    isMouseDown = true;
    canvas.classList.add(`c-main__canvas--focus`);

    startInteract(e.clientX, e.clientY);
  });

  canvas.addEventListener(`mouseup`, () => {
    isMouseDown = false;
    canvas.classList.remove(`c-main__canvas--focus`);

    stopInteract();
  });

  canvas.addEventListener(`mousemove`, (e) => {
    if (isInteracting) {
      handleRotate(e.clientX, e.clientY);
    }
  });

  canvas.addEventListener('wheel', (e) => {
    camera.radius += e.deltaY * camera.zoomSpeed;
    camera.radius = Math.max(1, camera.radius);
    e.preventDefault();
  }, { passive: false });

  canvas.addEventListener(`touchstart`, (e) => {
    if (e.touches.length === 1) {
      startInteract(e.touches[0].clientX, e.touches[0].clientY);
    } else if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      camera.lastTouchDistance = Math.hypot(dx, dy);
    }
  }, { passive: false });

  canvas.addEventListener(`touchmove`, (e) => {
    e.preventDefault();

    if (e.touches.length === 1 && isInteracting) {
      handleRotate(e.touches[0].clientX, e.touches[0].clientY);
    } else if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;

      const distance = Math.hypot(dx, dy);

      if (camera.lastTouchDistance > 0) {
        const delta = (camera.lastTouchDistance - distance) * camera.zoomSpeed;
        camera.radius += delta;
        camera.radius = Math.max(1, camera.radius);
      }

      camera.lastTouchDistance = distance;
    }
  }, { passive: false });

  cameraPolarAngle.addEventListener(`input`, (event) => {
    camera.theta = +event.target.value;

    updateCamera();
  });

  cameraAzimuthalAngle.addEventListener(`input`, (event) => {
    camera.phi = +event.target.value;

    updateCamera();
  });

  cameraDistance.addEventListener(`input`, (event) => {
    camera.radius = +event.target.value;

    updateCamera();
  });

  cameraLookAtX.addEventListener(`input`, (event) => {
    camera.target.x = +event.target.value;

    updateCamera();
  });

  cameraLookAtY.addEventListener(`input`, (event) => {
    camera.target.y = +event.target.value;

    updateCamera();
  });

  cameraLookAtZ.addEventListener(`input`, (event) => {
    camera.target.z = +event.target.value;

    updateCamera();
  });

  cameraUpX.addEventListener(`input`, (event) => {
    camera.up.x = +event.target.value;

    updateCamera();
  });

  cameraUpY.addEventListener(`input`, (event) => {
    camera.up.y = +event.target.value;

    updateCamera();
  });

  cameraUpZ.addEventListener(`input`, (event) => {
    camera.up.z = +event.target.value;

    updateCamera();
  });

  fieldOfView.addEventListener(`input`, (event) => {
    camera.fieldOfView = +event.target.value;

    updateCamera();
  });

  nearPlane.addEventListener(`input`, (event) => {
    camera.nearPlane = +event.target.value;

    updateCamera();
  });

  farPlane.addEventListener(`input`, (event) => {
    camera.farPlane = +event.target.value;

    updateCamera();
  });
}

const handlecreateSolid = (event) => {
  event.preventDefault();
  createSolid();
}

const initiateForm = () => {
  const form = document.querySelector(`.c-form`);

  if (!form) throw new Error(`Form not found`);

  form.addEventListener(`submit`, handlecreateSolid);

  const faceGap = document.querySelector(`#face-gap`);

  if (!faceGap) throw new Error(`Face gap not found`);

  const scale = document.querySelector(`#scale`);

  if (!scale) throw new Error(`Scale not found`);

  const solidType = document.querySelector(`#solid-type`);

  if (!solidType) throw new Error(`Solid type is required`);

  let randomsolidTypeIndex = getRandomInteger(
    0,
    solidType.options.length - 1
  );

  while (solidType.options[randomsolidTypeIndex].disabled) {
    randomsolidTypeIndex = getRandomInteger(
      0,
      solidType.options.length - 1
    );
  }
  // let randomsolidTypeIndex = 0;

  solidType.value = solidType.options[randomsolidTypeIndex].value;

  solidType.dispatchEvent(new Event(`change`));

  createSolid();

  const isAutoUpdate = document.querySelector(`#is-auto-update`);

  if (!isAutoUpdate) throw new Error(`Is auto update not found`);

  if (isAutoUpdate.checked) {
    form.addEventListener(`input`, createSolid);
    solidType.addEventListener(`change`, createSolid);
  } else {
    form.removeEventListener(`input`, createSolid);
    solidType.removeEventListener(`change`, createSolid);
  }

  isAutoUpdate.addEventListener(`change`, (event) => {
    if (event.target.checked) {
      form.addEventListener(`input`, createSolid);
      solidType.addEventListener(`change`, createSolid);
    } else {
      form.removeEventListener(`input`, createSolid);
      solidType.removeEventListener(`change`, createSolid);
    }
  });

  const isAutoRotate = document.querySelector(`#is-auto-rotate`);

  if (!isAutoRotate) throw new Error(`Is auto rotate not found`);

  const autoRotateXSpeed = document.querySelector(`#auto-rotate-x-speed`);

  if (!autoRotateXSpeed) throw new Error(`Auto rotate x speed not found`);

  rotateXSpeed = +autoRotateXSpeed.value;

  autoRotateXSpeed.addEventListener(`input`, (event) => {
    if (isAutoRotate.checked) {
      rotateXSpeed = +event.target.value;
    }
  });

  const autoRotateYSpeed = document.querySelector(`#auto-rotate-y-speed`);

  if (!autoRotateYSpeed) throw new Error(`Auto rotate y speed not found`);

  rotateYSpeed = +autoRotateYSpeed.value;

  autoRotateYSpeed.addEventListener(`input`, (event) => {
    if (isAutoRotate.checked) {
      rotateYSpeed = +event.target.value;
    }
  });

  const autoRotateZSpeed = document.querySelector(`#auto-rotate-z-speed`);

  if (!autoRotateZSpeed) throw new Error(`Auto rotate z speed not found`);

  rotateZSpeed = +autoRotateZSpeed.value;

  autoRotateZSpeed.addEventListener(`input`, (event) => {
    if (isAutoRotate.checked) {
      rotateZSpeed = +event.target.value;
    }
  });

  if (isAutoRotate.checked) {
    rotateXSpeed = +autoRotateXSpeed.value;
    rotateYSpeed = +autoRotateYSpeed.value;
    rotateZSpeed = +autoRotateZSpeed.value;
  } else {
    rotateXSpeed = 0;
    rotateYSpeed = 0;
    rotateZSpeed = 0;
  }

  isAutoRotate.addEventListener(`change`, (event) => {
    if (isAutoRotate.checked) {
      rotateXSpeed = +autoRotateXSpeed.value;
      rotateYSpeed = +autoRotateYSpeed.value;
      rotateZSpeed = +autoRotateZSpeed.value;
    } else {
      rotateXSpeed = 0;
      rotateYSpeed = 0;
      rotateZSpeed = 0;
    }
  });
}

document.addEventListener(`DOMContentLoaded`, initiateForm);
