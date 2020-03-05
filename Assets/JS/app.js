let scene, camera, renderer, mesh;
let loader,ambient, lightning, controls;

let keyboard = {};
let player = { height:1.8, speed:0.2, turnSpeed:Math.PI*0.02 };
let USE_WIREFRAME = false;
let plane, hotAirBaloonModel;
 
function init(){
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(100, 1920/1080, 0.1, 1000);
  camera.position.z = 330;
  camera.position.y = 50;
  scene.background = (new THREE.TextureLoader().load('Assets/Textures/monBG.jpg' ))
  
  loader = new THREE.GLTFLoader();
  loader.load( 'Assets/Models/statue/jupiterStatue.gltf', function ( gltf ) {
  
     scene.add( gltf.scene );
  
  }, undefined, function ( error ) {
  
     console.error( error );
  
  } );

  let planeModel = function(){
    this.mesh = new THREE.Object3D();
    let statueVar = this.mesh;
    let loader = new THREE.GLTFLoader();
    loader.load( 'Assets/Models/plane/scene.gltf', function ( gltf ) {
       gltf.scene.scale.set(10,10,10,10);
       gltf.scene.position.y = 390;
       gltf.scene.position.x = 200;
      statueVar.add(gltf.scene);;
    }, undefined, function ( error ) {
      console.error( error );
    } );
  }
 
  plane = new planeModel();
  scene.add(plane.mesh);

  let hotAirBaloonModel = function(){
    this.mesh = new THREE.Object3D();
    let statueVar = this.mesh;
    let loader = new THREE.GLTFLoader();
    loader.load( 'Assets/Models/hotairbaloon/scene.gltf', function ( gltf ) {
       gltf.scene.scale.set(10,10,10,10);
       gltf.scene.position.y = 390;
       gltf.scene.position.x = -280;
      statueVar.add(gltf.scene);;
    }, undefined, function ( error ) {
      console.error( error );
    } );
  }
 
  hotAirBaloon = new hotAirBaloonModel();
  scene.add(hotAirBaloon.mesh);

  Floor = new THREE.Mesh(
     new THREE.BoxGeometry(1500,1100,1),
     new THREE.MeshPhongMaterial({color: 0xc8c8c8, wireframe:USE_WIREFRAME})
  );
  Floor.position.set(0,0,0);
  Floor.rotation.x -= Math.PI / 2;
  Floor.receiveShadow = true;
  scene.add(Floor);

  firstRingTexture = new THREE.TextureLoader().load( 'Assets/Textures/ring1' );
  firstRing = new THREE.Mesh(
    new THREE.TorusBufferGeometry(82,3,16,100),
    new THREE.MeshPhongMaterial({map:firstRingTexture, wireframe:USE_WIREFRAME})
  );
  firstRing.position.set(-5,75,0);
  firstRing.rotation.x = -30;
  firstRing.rotation.y = 35 ;
  firstRing.receiveShadow = true;
  scene.add(firstRing);

  secondRingTexture = new THREE.TextureLoader().load( 'Assets/Textures/ring2' );
  secondRing = new THREE.Mesh(
    new THREE.TorusBufferGeometry(82,6,16,100),
    new THREE.MeshPhongMaterial({map:secondRingTexture, wireframe:USE_WIREFRAME})
    );
    secondRing.position.set(-5,75,0);
    secondRing.rotation.x = -30;
    secondRing.rotation.y = 26;
    secondRing.receiveShadow = true;
    scene.add(secondRing);

    aroundRing = new THREE.Mesh(
      new THREE.TorusBufferGeometry(242,3,16,100),
      new THREE.MeshPhongMaterial({color:0xffffff, wireframe:USE_WIREFRAME})
      );
      aroundRing.position.set(0,0,0);
      aroundRing.rotation.x  -= Math.PI / 2;
      aroundRing.receiveShadow = true;
      scene.add(aroundRing);

// ambient
  ambient = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambient);  

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(innerWidth, innerHeight);
 
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.BasicShadowMap;
 
  document.body.appendChild(renderer.domElement);
  controls = new THREE.OrbitControls (camera, renderer.domElement);
  animate();
}

function animate(){
  controls.update();
  requestAnimationFrame(animate);
 
 
  if(keyboard[87]){ 
     camera.position.x -= Math.sin(camera.rotation.y) * player.speed;
     camera.position.z -= -Math.cos(camera.rotation.y) * player.speed;
  }
  if(keyboard[83]){ 
     camera.position.x += Math.sin(camera.rotation.y) * player.speed;
     camera.position.z += -Math.cos(camera.rotation.y) * player.speed;
  }
  if(keyboard[65]){ 
     camera.position.x += Math.sin(camera.rotation.y + Math.PI/2) * player.speed;
     camera.position.z += -Math.cos(camera.rotation.y + Math.PI/2) * player.speed;
  }
  if(keyboard[68]){ 
     camera.position.x += Math.sin(camera.rotation.y - Math.PI/2) * player.speed;
     camera.position.z += -Math.cos(camera.rotation.y - Math.PI/2) * player.speed;
  }
 
  if(keyboard[37]){ 
     camera.rotation.y -= player.turnSpeed;
  }
  if(keyboard[39]){
     camera.rotation.y += player.turnSpeed;
  }
 
  renderer.render(scene, camera);
}
function keyDown(event){
  keyboard[event.keyCode] = true;
}
 
function keyUp(event){
  keyboard[event.keyCode] = false;
}
 
window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);
 
window.onload = init;

