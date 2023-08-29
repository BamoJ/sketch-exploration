varying vec2 vUv;
uniform float time;

void main() { 
  // uniform 
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}