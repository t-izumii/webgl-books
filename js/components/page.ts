import * as THREE from "three";

class Page {
  constructor(public id: number, public image: string, public index: number) {
    this.id = id;
    this.image = image;
    this.index = index;
  }

  createPage(): THREE.Mesh {
    const PAGE_WIDTH: number = 16;
    const PAGE_HEIGHT: number = 9;
    const PAGE_DEPTH: number = 0.025;
    const PAGE_SEGMENTS: number = 20;
    const PAGE_SEGMENT_WIDTH: number = PAGE_WIDTH / PAGE_SEGMENTS;
    const PAGE_SEGMENT_HEIGHT: number = PAGE_HEIGHT / PAGE_SEGMENTS;
    const PAGE_SEGMENT_DEPTH: number = PAGE_DEPTH / PAGE_SEGMENTS;

    const pageGeometry: THREE.BoxGeometry = new THREE.BoxGeometry(
      PAGE_WIDTH,
      PAGE_HEIGHT,
      PAGE_DEPTH,
      PAGE_SEGMENTS,
      2
    );
    const pageMaterial: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
    });
    const page: THREE.Mesh = new THREE.Mesh(pageGeometry, pageMaterial);
    return page;
  }
}

export default Page;
