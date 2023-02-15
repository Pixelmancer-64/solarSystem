import * as THREE from 'three';

const width = 400;
const height = 400;
const maxIterations = 100;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

const material = new THREE.ShaderMaterial({
  uniforms: {
    u_maxIterations: { value: maxIterations },
    u_colorScale: { value: 4.0 },
    u_resolution: { value: new THREE.Vector2(width, height) },
  },
  vertexShader: `
  attribute vec3 position1;
  varying vec3 v_position;
  
  void main() {
    v_position = position1;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position1, 1.0);
  }
  `,
  fragmentShader: `
  uniform float u_maxIterations;
  uniform float u_colorScale;
  uniform vec2 u_resolution;
  
  void main() {
  // Calculate the pixel coordinate in the complex plane
  vec2 c = 2.0 * gl_FragCoord.xy / u_resolution - 1.0;
  c.x *= u_resolution.x / u_resolution.y;
  
  // Calculate the Mandelbrot set
  vec2 z = vec2(0.0, 0.0);
  float iteration = 0.0;
  for (float i = 0.0; i < u_maxIterations; i++) {
    if (length(z) > 4.0) break;
    z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
    iteration = i;
  }
  
  // Output the color based on the number of iterations
  gl_FragColor = vec4(vec3(iteration / u_colorScale), 1.0);
  
  }
  
  `,
});

const geometry = new THREE.BoxGeometry(2, 2, 2);
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}

animate()