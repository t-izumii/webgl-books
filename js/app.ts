import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Book from "./components/book";

(() => {
  console.log(THREE);

  // 1. scene
  const scene = new THREE.Scene();

  // 2. camera
  const PERSPECTIVE: number = 20;
  const FOV: number = 60;
  const ASPECT_RATIO: number = window.innerWidth / window.innerHeight;
  const NEAR: number = 0.1;
  const FAR: number = 1000;

  const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
    FOV,
    ASPECT_RATIO,
    NEAR,
    FAR
  );
  camera.position.z = PERSPECTIVE;

  // 3. renderer
  const container: HTMLElement | null = document.querySelector("#webgl");
  if (!container) {
    throw new Error("WebGL container not found");
  }
  const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // 4. controls
  const controls: OrbitControls = new OrbitControls(
    camera,
    renderer.domElement
  );

  // 5. mesh
  const book: Book = new Book();
  const bookGroup: THREE.Group = book.createPages();
  scene.add(bookGroup);

  // 6. animate
  const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
  };
  animate();
})();
