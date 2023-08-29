varying vec2 vUv;
uniform float time;
uniform vec3 color;

#pragma glslify: snoise3 = require(glsl-noise/simplex/3d) 

void main() {

  gl_FragColor = vec4(vec3(color), 1.0);
}