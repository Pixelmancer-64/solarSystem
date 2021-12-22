import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(250, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

camera.position.setX(10);

const bgTexture = new THREE.TextureLoader().load('8k_stars_milky_way.jpg');
scene.background = bgTexture;

class Planet{
  constructor(map, scale, vel, r){
    this.planetMap = new THREE.TextureLoader().load(map);
    this.geometry = new THREE.SphereGeometry(scale*1000 / 2, 32, 32);
    this.material = new THREE.MeshBasicMaterial( { map: this.planetMap,});
    this.planet = new THREE.Mesh(this.geometry, this.material);
    scene.add(this.planet);

		this.t = 0;
		this.vel = vel;
		this.r = r;
    this.i = .1 * scale;
  }

  update(){
    this.planet.position.x = this.r * Math.cos(this.t * this.vel); 
  	this.planet.position.z = this.r * Math.sin(this.t * this.vel);
    this.planet.rotateY(Math.sin(this.i))
		this.t += .01;
  }
	
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
});

planets.push(sun);
planets.push(moon);

// const asteroidGeometry = new THREE.TorusGeometry(228, 7, 32, 1000)
// const asteroidMaterial = new THREE.PointsMaterial({
//   size: 0.005,
//   color: 'gray'
// })
// const asteroid = new THREE.Points(asteroidGeometry,asteroidMaterial);
// scene.add(asteroid)

const light = new THREE.PointLight(0xffffff)
light.position.set(0,0,0)
scene.add(light)

const controls = new OrbitControls(camera, renderer.domElement);

function animate(){
	planets.forEach(e => {
		e.update();
	});

  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
} 


animate()