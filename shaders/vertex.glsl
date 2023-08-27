varying vec2 vUv;
uniform float time;

void main() {
  vec3 pos = position;
  pos.x += sin(pos.y * 10.0 + time) * 2.2; 

  // uniform
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}