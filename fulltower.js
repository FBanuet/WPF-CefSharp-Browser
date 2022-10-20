var scene,camera,renderer,params1,controls;
let  parent,mesho,box,mesh;

params1 = {
    width:1,
    height:1,
    depth:1,
    floors:1,
    offset:1,
    rotation:0.10,
    offsety:2,
};

const material = new THREE.MeshLambertMaterial( { color: 0xff00ff } );

let boxes = [];


function addBox(){
    if ( mesh !== undefined ) {

        parent.remove( mesh );
        mesh.geometry.dispose();

    }
    for(let row = 0; row<params1.floors; row++){

        box = new THREE.BoxGeometry(params1.width,params1.height,params1.depth);
        mesh = new THREE.Mesh(box,material);
        mesh.position.z = 5;
        mesh.position.x = 10;
        boxes.push();


        
        let Ypos = row * (params1.height + 1);
        let offset = params1.offset;
        
        mesh.rotation.y = row * (row/params1.rotation) ;
        mesh.position.set(offset,row++,params1.offsety);
        offset ++;
        parent.add(mesh);

    }
    
}


function init(){

    scene = new THREE.Scene();
    scene.background = new THREE.Color('black');
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.set(0, 0, 10);

    const lightColor = 0xffffff;

    const ambientLight = new THREE.AmbientLight(lightColor,0.5);
    scene.add(ambientLight);
  
  
    const directionalLight = new THREE.DirectionalLight(lightColor, 1);
    directionalLight.position.set(0, 10, 0);
    directionalLight.target.position.set(-5, 0, 0);
    scene.add(directionalLight);
    scene.add(directionalLight.target);

    parent = new THREE.Object3D();
    scene.add( parent );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

      //Creates the orbit controls (to navigate the scene)
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.target.set(-2, 0, 0);

    const grid = new THREE.GridHelper(100, 100);
    scene.add(grid);
  
    const axes = new THREE.AxesHelper();
    axes.material.depthTest = false;
    axes.renderOrder = 1;
    scene.add(axes);

    addBox();

    const gui = new dat.gui.GUI({width: 350,height:950});

    const p1 = gui.addFolder('Constraints');
    p1.add(params1,'width').min(1).max(100).step(1).onChange(function(){
        addBox();
    });
    p1.add(params1,'height').min(0.10).max(25).step(0.101).onChange(function(){
        addBox();
    });
    p1.add(params1,'depth').min(1).max(50).step(1).onChange(function(){
        addBox();
    });
    p1.add(params1,'floors').min(1).max(50).step(1).onChange(function(){
        addBox();
    });
    p1.add(params1,'offset').min(1).max(20).step(1).onChange(function(){
        addBox();
    });
    p1.add(params1,'offsety').min(1).max(20).step(1).onChange(function(){
        addBox();
    });
    p1.add(params1,'rotation').min(0.25).max(1.50).step(0.10).onChange(function(){
        addBox();
    });

    p1.open();


    window.addEventListener( 'resize', resize, false);
  
    update();
}

init ();

function update(){
    requestAnimationFrame( update );
      renderer.render( scene, camera );
}
  
  function resize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}