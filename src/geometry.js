import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';
import Scroller from './scroller';

function Geometry() {
  
  let renderer
  let scene
  let camera
  let controls = {
    x: true,
    y: true,
    z: true,
  }

  let autoCounter = 0;
  let scrollCounter = 0;
  let counter = 0;
  let WIN_W = window.innerWidth;
  let WIN_H = window.innerHeight;
  let mouseX = 0;
  let mouseY = 0;
  const content = document.querySelector('.content')

  function init() {
    window.addEventListener('mousemove', handleMouseMove)
    document.querySelector('.x').addEventListener('click', function() {
      this.classList.toggle('active')
      controls.x = !controls.x
    })
    document.querySelector('.y').addEventListener('click', function() {
      this.classList.toggle('active')
      controls.y = !controls.y
    })
    document.querySelector('.z').addEventListener('click', function() {
      this.classList.toggle('active')
      controls.z = !controls.z
    })
    createRenderer()
    scene = new THREE.Scene()

    let screenAspectRatio = WIN_W / WIN_H
    let depth = 30
    camera = new THREE.OrthographicCamera(-depth * screenAspectRatio, depth * screenAspectRatio, depth, -depth, -2000, 2000)

    camera.position.set(20, 20, 20)
    camera.lookAt(scene.position)
    scene.add(camera)
    createLights(scene)
    
    const numCubes = 1600;
    for (var i=0; i < numCubes; i++) {
      drawCube((i % 40) * 3, Math.floor(i / 40) * 3, 2, scene, i)
    }
  }

  function createRenderer() {
    renderer = new THREE.WebGLRenderer({
      antialias: true
    })
    renderer.setClearColor(0x141121)

    renderer.setSize(WIN_W, WIN_H)
    document.querySelector('.container').appendChild(renderer.domElement)
  }

  function drawCube(x = 0, z = 0, cubeSize = 4, scene, num) {
    let material = new THREE.MeshPhongMaterial({
      color: 0xcc00ff,
    })

    let [width, height, depth] = [cubeSize, cubeSize, cubeSize]
    let geometry = new THREE.BoxGeometry(width, height, depth)
    geometry.translate( 0, height/2, 0 );
    let cube = new THREE.Mesh(geometry, material)
    cube.position.x = x
    cube.position.z = z
    cube.scale.y = 0

    let tween = new TWEEN.Tween(cube.scale)

    tween
      .to({ y: 1 }, 1000)
      .delay(num * 10)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start()
    
    scene.add(cube);
  }

  function createLights(scene) {

    var light = new THREE.DirectionalLight(0x0000ff)
    light.position.set(100, 0, 0)
    scene.add(light)

    var light = new THREE.DirectionalLight(0x000022)
    light.position.set(0, 100, 0)
    scene.add(light)

    var light = new THREE.DirectionalLight(0x0000ff)
    light.position.set(0, 0, 100)
    scene.add(light)

    var light = new THREE.PointLight(0x000000)
    light.position.set(0, 250, 300)
    scene.add(light)
  }

  function animate() {
    requestAnimationFrame(animate)
    TWEEN.update()
    scrollCounter = Scroller.scrollY/6;
    autoCounter += .1;
    counter = scrollCounter + autoCounter;
    for (var i=0; i<scene.children.length-1;i++) {
      let cube = scene.children[i+1];
      cube.scale.y = (Scroller.scrollY/(200) + (Math.sin((counter-cube.position.x-cube.position.z)/10)) + 2) * Math.min(1,autoCounter/10)
      cube.scale.z = ((Math.sin((counter-cube.position.x-cube.position.z/3)/20)) + 1) * Math.min(1,autoCounter/10)
      cube.scale.x = ((Math.sin((counter-cube.position.x-cube.position.z/3)/20)) + 1) * Math.min(1,autoCounter/10)
      if (controls.x) {
        cube.rotation.x = (Math.sin((counter-cube.position.x-cube.position.z/3)/20)) + 1
      } else {
        cube.rotation.x = 0;
      }
      if (controls.y) {
        cube.rotation.y = (Math.sin((counter-cube.position.x-cube.position.z/3)/20)) + 1 + mouseX/1000
      } else {
        cube.rotation.y = 0 + mouseX/1000;
      }
      if (controls.z) {
        cube.rotation.z = (Math.sin((counter-cube.position.x-cube.position.z/3)/20)) + 1 + mouseY/1000
      } else {
        cube.rotation.z = 0;
      }
      cube.color = {r:1,g:.5,b:.5}
      if (cube.material) {
        cube.material.color = {
          r: .3 + Math.random()/100 + cube.position.x/160,
          g: .1 + Math.random()/100 + cube.position.x/80,
          b: .4 + Math.random()/100 + cube.position.x/160,
        }
      }
    }
    render()
  }

  function render() {
    renderer.render(scene, camera)
  }

  function handleMouseMove(e) {
    mouseX = e.pageX;
    mouseY = e.pageY - Scroller.scrollY;
    content.querySelector('.people').style.transformOrigin = '50% 50%'
    content.querySelector('.people').style.transform = `perspective(1000px) rotateY(${mouseX/100 - WIN_W/100/2}deg) rotateX(${(mouseY)/100 - WIN_H/100/2}deg)`
  }

  init()
  animate()
}

export default Geometry;