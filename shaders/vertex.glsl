varying vec2 vUv;
uniform float time;

void main() {
  vec3 pos = position;
  pos.x += sin(pos.y * 2.0 + time) * 1.2; 

  // uniform
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}