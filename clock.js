var scene,camera,renderer,clock;
const parts = [];
init =()=>{
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
    camera.position.set(0,3,10);

    const ambient = new THREE.AmbientLight(0xffffbb,0xFFFFFF);
    scene.add(camera);
    scene.add(ambient);

    const light = new THREE.DirectionalLight(0xFFFFFF,35);
    light.position.set(1,10,6);
    scene.add(light);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth,window.innerHeight);
    
    document.body.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera,renderer.domElement);
    controls.target.set(0,4,0);
    controls.update;

    const grid = new THREE.GridHelper(100, 100);
    scene.add(grid);
  
    const axes = new THREE.AxesHelper();
    axes.material.depthTest = false;
    axes.renderOrder = 1;
    scene.add(axes);

    clock = new THREE.Clock();

    const geometry = new THREE.BoxBufferGeometry(1,3,1);
   /// geometry.vertices.forEach(vertex => vertex.y += 1.5);
   const position = geometry.getAttribute('position');
   for(let f = 1; f<position.array.length; f++){
        position.array[f] += 0.02;
   }
    const material = new THREE.MeshPhongMaterial({
        color:'yellow',
        shininess:true,
        displacementBias:0.25,
    });
    const block = new THREE.Mesh(geometry,material);
    

    for(let i = 0; i <5; i++){
        const mesh = block.clone();
        mesh.position.y = i*2;
        parts.push(mesh);

        if(i == 0){
            scene.add(mesh);
        }else{
            parts[i-1].add(mesh);
        }

    }

    window.addEventListener('resize',resize,false);

}


update = () =>{
    requestAnimationFrame(update);
    renderer.render(scene,camera);
    const theta = Math.sin(clock.getElapsedTime());
    parts.forEach(part => part.rotation.z = theta);
    
    
}

function resize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}


init();

update();