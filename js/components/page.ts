import * as THREE from "three";
import { degToRad } from "three/src/math/MathUtils.js";

class Page {
  constructor(
    public id: number,
    public image: string,
    public index: number,
    public page: THREE.Mesh | null
  ) {
    this.id = id;
    this.image = image;
    this.index = index;
    this.page = null;
  }

  createPage(): THREE.Mesh {
    const PAGE_WIDTH: number = 16;
    const PAGE_HEIGHT: number = 9;
    const PAGE_DEPTH: number = 0.025;
    const PAGE_SEGMENTS: number = 20;
    const PAGE_SEGMENT_WIDTH: number = PAGE_WIDTH / PAGE_SEGMENTS;
    const PAGE_SEGMENT_HEIGHT: number = PAGE_HEIGHT / PAGE_SEGMENTS;
    const PAGE_SEGMENT_DEPTH: number = PAGE_DEPTH / PAGE_SEGMENTS;

    // geometry setting
    const pageGeometry: THREE.BoxGeometry = new THREE.BoxGeometry(
      PAGE_WIDTH,
      PAGE_HEIGHT,
      PAGE_DEPTH,
      PAGE_SEGMENTS,
      2
    );

    pageGeometry.translate(PAGE_WIDTH / 2, 0, 0);

    // material setting
    const pageMaterial: THREE.MeshBasicMaterial[] = [
      new THREE.MeshBasicMaterial({
        color: 0xff0000,
      }),
      new THREE.MeshBasicMaterial({
        color: 0x00ff00,
      }),
      new THREE.MeshBasicMaterial({
        color: 0x0000ff,
      }),
      new THREE.MeshBasicMaterial({
        color: 0xff0000,
      }),
      new THREE.MeshBasicMaterial({
        color: 0x00ff00,
      }),
      new THREE.MeshBasicMaterial({
        color: 0x0000ff,
      }),
    ];

    // mesh create
    this.page = new THREE.Mesh(pageGeometry, pageMaterial);
    this.page.position.set(0, 0, -this.index * PAGE_DEPTH);
    this.page.rotation.y = Math.PI / 2;
    this.page.castShadow = true;
    this.page.receiveShadow = true;
    this.page.frustumCulled = false;

    return this.page;
  }

  updatePage(activePage: number) {
    console.log(this.index, activePage);
    if (!this.page) return;
    const PAGE_ROTATION_Y: number =
      activePage > this.index ? -Math.PI / 2 : Math.PI / 2;
    this.page.rotation.y = this.lerp(
      this.page.rotation.y,
      PAGE_ROTATION_Y,
      0.05
    );
  }

  lerp(start: number, end: number, t: number) {
    return start + (end - start) * t;
  }
}

export default Page;
