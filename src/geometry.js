import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';
import Scroller from './scroller';

function Geometry() {
  
  let renderer
  let scene
  let camera
  
  const colors = [
    {
      r: .8,
      g: .2,
      b: .6,
    },
    {
      r: .6,
      g: .4,
      b: .9,
    },
    {
      r: .5,
      g: .2,
      b: .8,
    }
  ]

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

    createRenderer()
    scene = new THREE.Scene()

    let screenAspectRatio = WIN_W / WIN_H
    let depth = 30
    camera = new THREE.OrthographicCamera(-depth * screenAspectRatio, depth * screenAspectRatio, depth, -depth, -2000, 2000)

    camera.position.set(20, 20, 20)
    camera.lookAt(scene.position)
    scene.add(camera)
    createLights(scene)
    
    createShapes();
  }

  function createRenderer() {
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      shadowMapEnabled: true,
      shadowMapType: THREE.PCFSoftShadowMap,
    })

    renderer.setSize(WIN_W, WIN_H)
    document.querySelector('.container').appendChild(renderer.domElement)
  }

  function createShapes() {
    let material = new THREE.MeshPhongMaterial({
      color: 0xdf5f84,
    })

    let [width, height, depth] = [30, 30, 30]
    let geometry = new THREE.BoxGeometry(width, height, depth)
    geometry.translate( 0, height/2, 0 );
    let cube = new THREE.Mesh(geometry, material)
    cube.position.x = 0
    cube.position.z = 0
    cube.scale.y = 1

    scene.add(cube);
  }

  function createLights(scene) {

    // var light = new THREE.DirectionalLight(0x0000ff)
    // light.position.set(100, 0, 0)
    // scene.add(light)

    // var light = new THREE.DirectionalLight(0x000022)
    // light.position.set(0, 100, 0)
    // scene.add(light)

    // var light = new THREE.DirectionalLight(0x0000ff)
    // light.position.set(0, 0, 100)
    // scene.add(light)

    // var light = new THREE.PointLight(0x000000)
    // light.position.set(0, 250, 300)
    // scene.add(light)
  }

  function animate() {
    requestAnimationFrame(animate);
    scrollCounter = Scroller.scrollY/6;
    autoCounter += .1;
    counter = scrollCounter + autoCounter;
    
    let counterScaler = Math.min(1, autoCounter/100);
    let counterScaler2 = 2-counterScaler;

    for (var i=0; i<scene.children.length-1;i++) {
      let cube = scene.children[i+1];
      let offsetX = counter-cube.position.x;
      // cube.scale.y = (Scroller.scrollY/200 + (Math.sin((offsetX-cube.position.z)/10)) + 2) * counterScaler * counterScaler2
      // cube.scale.z = ((Math.sin((offsetX-cube.position.z/3)/20)) + 1) * counterScaler * counterScaler2
      // cube.scale.x = ((Math.sin((offsetX-cube.position.z/3)/20)) + 1) * counterScaler * counterScaler2
      
      // cube.rotation.y = (Math.sin((offsetX-cube.position.z/3)/20)) + 1 + mouseX/1000
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