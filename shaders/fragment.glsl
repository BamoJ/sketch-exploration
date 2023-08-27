precision highp float;
uniform sampler2D texture;
uniform float time;
varying vec2 vUv;
uniform float aspect;
float PI = 3.1415926535897932384626433832795;

#pragma glslify: snoise = require(glsl-noise/simplex/3d)
#pragma glslify: hsl2rgb = require(glsl-hsl2rgb)

void main() {
  vec2 uvCenter = vUv - 0.5;
  uvCenter.x *= aspect;

  float dist = length(uvCenter);

  // Use smoothstep to smooth the transition between colors
  float alpha = smoothstep(0.25, 0.247, dist);

  float noise = snoise(vec3(uvCenter * 0.5, time * 0.25));
  vec3 color = hsl2rgb(0.36 + noise * 0.2, 0.5, 0.5);

  gl_FragColor = vec4(vec3(color), alpha);
}