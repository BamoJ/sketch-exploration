varying vec2 vUv;
uniform float time;
varying vec3 vNormal;

void main() {
  vec3 pos = position;

  // uniform
  vUv = uv;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}