#version 300 es

#ifdef GL_ES
  precision mediump float;
#else
  precision highp float;
#endif

in vec4 v_color;
out vec4 outColor;

void main() {
  outColor = v_color;
}