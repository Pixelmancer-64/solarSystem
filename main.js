<<<<<<< HEAD
import * as THREE from 'three';

const width = 400;
const height = 400;
const maxIterations = 100;
=======
import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
>>>>>>> d640cd09757caea039ff4d5c4ccd3cd91235d2dd

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
<<<<<<< HEAD
  
  // Output the color based on the number of iterations
  gl_FragColor = vec4(vec3(iteration / u_colorScale), 1.0);
  
  }
  
  `,
=======
	
	attach(planet){
		this.planet.attach(planet)
	}
}

const neptune = new Planet('2k_neptune.jpg', .0003, .159, 30.06 + 10);
const uranus = new Planet('2k_uranus.jpg', .0003, .182, 19.2 + 10);
const saturn = new Planet('8k_saturn.jpg', .0008, .228, 9.54 + 10);
const jupiter = new Planet('8k_jupiter.jpg', .00095, .323, 5.2 + 10);
const mars = new Planet('8k_mars.jpg', .00004, 0.434, 1.52 + 10);
const earth = new Planet('8k_earth_daymap.jpg', .00008, .802, 1 + 10);
const moon = new Planet('8k_moon.jpg', .00002, .0000006, 0.25);
const venus = new Planet('8k_venus_surface.jpg', .00008, 1.174, .72 + 10);
const mercury = new Planet('8k_mercury.jpg', .00003, 1.607, .39 + 10);
const sun = new Planet('8k_sun.jpg', 0.0093, 0, 0);

earth.attach(moon.planet);

let planets = [neptune, uranus, saturn, jupiter, mars, earth, venus, mercury];

planets.forEach(e => {
	sun.attach(e.planet);
>>>>>>> d640cd09757caea039ff4d5c4ccd3cd91235d2dd
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