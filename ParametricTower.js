import * as THREE from "three";
import {

    AmbientLight,
    AxesHelper,
    DirectionalLight,
    GridHelper,
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
  } from "three";
  import {
      OrbitControls
  } from "three/examples/jsm/controls/OrbitControls";
  import { IFCLoader } from "web-ifc-three/IFCLoader";
 

  const scene = new Scene();
  scene.background = new THREE.Color('black');

  const size = {
      width: window.innerWidth,
      height: window.innerHeight,
  };

  const aspect = size.width/size.height;
  const camera = new PerspectiveCamera(75,aspect);
  camera.position.z = 15;
  camera.position.y = 13;
  camera.position.x = 8;

  const lightColor = 0xffffff;

  const ambientLight = new AmbientLight(lightColor,0.5);
  scene.add(ambientLight);


  const directionalLight = new DirectionalLight(lightColor, 1);
  directionalLight.position.set(0, 10, 0);
  directionalLight.target.position.set(-5, 0, 0);
  scene.add(directionalLight);
  scene.add(directionalLight.target);

  const threeCanvas = document.getElementById("three-canvas");
  const renderer = new WebGLRenderer({
      canvas: threeCanvas,
      alpha: true
  });
  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  //Creates grids and axes in the scene
  const grid = new GridHelper(100, 100);
  scene.add(grid);

  const axes = new AxesHelper();
  axes.material.depthTest = false;
  axes.renderOrder = 1;
  scene.add(axes);

  const  height = 3;
  const geometry = new THREE.BoxGeometry(40,height,60);
  const material = new THREE.MeshLambertMaterial({
    color: 0xdcbbc7,
  })
 
  const mesh = new THREE.Mesh(geometry,material);
  mesh.position.z = 5;
  //scene.add(mesh);

  for(let row = 0; row <30; row ++){
    let Ypos = row * (height + 1);
    let offset = 1;
    const block = mesh.clone();
    block.rotation.y = row * (row/0.25) ;
    block.position.set(offset,Ypos,0);
    scene.add(block);
    offset ++;
  }


  //Creates the orbit controls (to navigate the scene)
  const controls = new OrbitControls(camera, threeCanvas);
  controls.enableDamping = true;
  controls.target.set(-2, 0, 0);

  //Animation loop
  const animate = () => {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };

  animate();

  //Adjust the viewport to the size of the browser
  window.addEventListener("resize", () => {
    size.width = window.innerWidth;
    size.height = window.innerHeight;
    camera.aspect = size.width / size.height;
    camera.updateProjectionMatrix();
    renderer.setSize(size.width, size.height);
  });



