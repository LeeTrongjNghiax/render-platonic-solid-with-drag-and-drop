#version 300 es

#ifdef GL_ES
  precision mediump float;
#else
  precision highp float;
#endif

layout(location = 0) in vec3 a_position;
layout(location = 1) in vec3 a_normal;
layout(location = 2) in vec4 a_color;

out vec4 v_color;

#ifndef IS_SOLID
  uniform mat4 u_model;
  uniform mat4 u_view;
  uniform mat4 u_projection;

  uniform float u_scale;
  uniform float u_faceGap;
  uniform lowp float u_pointSize;
  uniform lowp float u_faceOpacity;
#endif

void main() {
  gl_PointSize = u_pointSize;
  gl_Position = u_projection * u_view * u_model * vec4(
    a_position * u_scale + a_normal * u_faceGap, 1.0
  );

  v_color = a_color * u_faceOpacity;
}