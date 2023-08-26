precision highp float;
uniform sampler2D texture;
uniform float time;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;

  vec4 color = vec4(uv, 0.0, 1.0);
  gl_FragColor = vec4(color);
}