
function clamp(v, min, max) {
    return Math.max(min, Math.min(v, max));
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
camera.rotation.order = "YXZ";

const renderer = new THREE.WebGLRenderer();
renderer.physicallyCorrectLights = true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 2, 1);
//const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
//const material = new THREE.MeshStandardMaterial({ color: 0x80ff80, roughness:0.8, metalness:0.2, bumpScale:0.005 });
const material = new THREE.MeshLambertMaterial({ color: 0xffffff });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);


const sun = new THREE.DirectionalLight(0xffffff, 3);
sun.position.set(1, 1, 1).normalize();
scene.add(sun);

const ambient = new THREE.AmbientLight(0xffffff, 1);
ambient.position.set(0, 10, 0);
scene.add(ambient);


var keysHeld = {};
function getDir(plus, neg) {
    var dir = 0;
    if (keysHeld[plus]) {
        dir++;
    }
    if (keysHeld[neg]) {
        dir--;
    }
    return dir;
}
document.addEventListener("keydown", e => {
    if (e.repeat) { return; }
    keysHeld[e.code] = true;
})
document.addEventListener("keyup", e => {
    delete keysHeld[e.code];
})


window.onresize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
};
const clock = new THREE.Clock();
function animate() {
	requestAnimationFrame(animate);
    
    var dt = clock.getDelta();

    camera.rotation.x += getDir("ArrowUp", "ArrowDown")*2*dt;
    camera.rotation.y -= getDir("ArrowRight", "ArrowLeft")*2*dt;
    var pos = camera.position;
    var dir = new THREE.Vector3(getDir("KeyD", "KeyA"), getDir("KeyE", "KeyQ"), -getDir("KeyW", "KeyS"));
    dir.normalize().applyQuaternion(camera.quaternion);
    pos.add(dir.multiplyScalar(dt*4));
    
    renderer.render(scene, camera);
}
animate();