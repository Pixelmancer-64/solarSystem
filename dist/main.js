import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(250, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerWidth)
camera.position.setX(550);


renderer.render( scene, camera);

const bgTexture = new THREE.TextureLoader().load('8k_stars_milky_way.jpg');
scene.background = bgTexture;
let scale = 1;
let sunS = 109 * scale;
let mercuryS = 0.4 * scale;
let venusS = 0.9 * scale;
let earthS = 1 * scale;
let moonS = 1*.27 * scale;
let marsS = .5 * scale;
let jupiterS = 11.2 * scale;
let saturnS = 9.5 * scale;
let uranusS = 4 * scale;
let neptuneS = 3.9 * scale;
const sunD = sunS * 2;

let planetV = [1.607, 1.174, .802, .434, 0.323, 0.228, 0.182, 0.159]

const neptuneMap = new THREE.TextureLoader().load('2k_neptune.jpg') 
const neptuneGeometry = new THREE.SphereGeometry(neptuneS, 32, 32)
const neptuneMaterial = new THREE.MeshBasicMaterial( { map: neptuneMap,});
const neptune = new THREE.Mesh(neptuneGeometry, neptuneMaterial);
scene.add(neptune)

const uranusMap = new THREE.TextureLoader().load('2k_uranus.jpg') 
const uranusGeometry = new THREE.SphereGeometry(uranusS, 32, 32)
const uranusMaterial = new THREE.MeshBasicMaterial( { map: uranusMap,});
const uranus = new THREE.Mesh(uranusGeometry, uranusMaterial);
scene.add(uranus)

const saturnMap = new THREE.TextureLoader().load('8k_saturn.jpg') 
const saturnGeometry = new THREE.SphereGeometry(saturnS, 32, 32)
const saturnMaterial = new THREE.MeshBasicMaterial( { map: saturnMap,});
const saturn = new THREE.Mesh(saturnGeometry, saturnMaterial);
scene.add(saturn)

const jupiterMap = new THREE.TextureLoader().load('8k_jupiter.jpg') 
const jupiterGeometry = new THREE.SphereGeometry(jupiterS, 32, 32)
const jupiterMaterial = new THREE.MeshBasicMaterial( { map: jupiterMap,});
const jupiter = new THREE.Mesh(jupiterGeometry, jupiterMaterial);
scene.add(jupiter)

const marsMap = new THREE.TextureLoader().load('8k_mars.jpg') 
const marsGeometry = new THREE.SphereGeometry(marsS, 32, 32)
const marsMaterial = new THREE.MeshBasicMaterial( { map: marsMap,});
const mars = new THREE.Mesh(marsGeometry, marsMaterial);
scene.add(mars)

const earthMap = new THREE.TextureLoader().load('8k_earth_daymap.jpg') 
const earthNormal = new THREE.TextureLoader().load('8k_earth_normal_map.tif') 
const geometry = new THREE.SphereGeometry(earthS, 32, 32)
const material = new THREE.MeshBasicMaterial( { map: earthMap, normalMap: earthNormal});
const earth = new THREE.Mesh(geometry, material);
scene.add(earth)

const moonMap = new THREE.TextureLoader().load('8k_moon.jpg') 
const moonGeometry = new THREE.SphereGeometry(moonS, 32, 32)
const moonMaterial = new THREE.MeshBasicMaterial( { map: moonMap,});
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
 scene.add(moon)
 earth.attach(moon)

const venusMap = new THREE.TextureLoader().load('8k_venus_surface.jpg')
const venusGeometry = new THREE.SphereGeometry(venusS, 32, 32)
const venusMaterial = new THREE.MeshBasicMaterial({ map: venusMap, });
const venus = new THREE.Mesh(venusGeometry, venusMaterial);
scene.add(venus)

const mercuryMap = new THREE.TextureLoader().load('8k_mercury.jpg') 
const mercuryGeometry = new THREE.SphereGeometry(mercuryS, 32, 32)
const mercuryMaterial = new THREE.MeshBasicMaterial( { map: mercuryMap,});
const mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial);
scene.add(mercury)

const sunMap = new THREE.TextureLoader().load('8k_sun.jpg') 
const sunGeometry = new THREE.SphereGeometry(sunS, 32, 64)
const sunMaterial = new THREE.MeshBasicMaterial( { map: sunMap,});
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun)

/*
const asteroidGeometry = new THREE.TorusGeometry(sunD+28, 7, 32, 1000)
const asteroidMaterial = new THREE.PointsMaterial({
  size: 0.005,
  color: 'gray'
})
const asteroid = new THREE.Points(asteroidGeometry,asteroidMaterial);
scene.add(asteroid)
asteroid.rotation.x=Math.PI / 2;
*/
const light = new THREE.PointLight(0xffffff)
const helper = new THREE.PointLightHelper(light)
light.position.set(0,0,0)

scene.add(helper)
scene.add(light)

const controls = new OrbitControls(camera, renderer.domElement);

let t =0;
let y=0;
function animate(){
  requestAnimationFrame( animate);
  earth.rotation.y += 0.003;
  controls.update();
  t += .001;
  y += .0005;
  moon.rotation.y+=0.01;
  sun.rotation.y += 0.0001;
  mercury.rotation.y += 0.001;
  venus.rotation.y += 0.001;
  mars.rotation.y += 0.001;
  jupiter.rotation.y += 0.001;
  saturn.rotation.y += 0.001;
  uranus.rotation.y += 0.001;
  neptune.rotation.y += 0.001;
  mercury.position.x = (sunD+4)*Math.cos(t * planetV[0]); 
  mercury.position.z = (sunD+4)*Math.sin(t* planetV[0]);
  venus.position.x = (sunD+7)*Math.cos(t* planetV[1]); 
  venus.position.z = (sunD+7)*Math.sin(t* planetV[1]);
  moon.position.x = (2+0.002)*Math.sin(y);
  moon.position.z = (2+0.002)*Math.cos(y);
  earth.position.x = (sunD+10)*Math.cos(t);
  earth.position.z = (sunD+10)*Math.sin(t);
  mars.position.x = (sunD+15)*Math.cos(t* planetV[2]);
  mars.position.z = (sunD+15)*Math.sin(t* planetV[2]);
  jupiter.position.x =  (sunD+52)*Math.cos(t* planetV[3]);
  jupiter.position.z = (sunD+52)*Math.sin(t* planetV[3]);
  saturn.position.x = (sunD+96)*Math.cos(t* planetV[4]);
  saturn.position.z = (sunD+96)*Math.sin(t* planetV[4]);
  uranus.position.x = (sunD+192)*Math.cos(t* planetV[5]);
  uranus.position.z = (sunD+192)*Math.sin(t* planetV[5]);
  neptune.position.x = (sunD+300)*Math.cos(t* planetV[6]);
  neptune.position.z = (sunD+300)*Math.sin(t* planetV[6]);
  renderer.render(scene, camera);
} 


animate()