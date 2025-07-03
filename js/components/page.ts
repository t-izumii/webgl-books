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
      // todo:error
      skinning: true
    });
    const position = pageGeometry.attributes.position;
    const vertex: THREE.Vector3 = new THREE.Vector3();
    const skinIndices: any = [];
    const skinWeights: any = [];
    for ( let i = 0; i < position.count; i ++ ) {

      vertex.fromBufferAttribute( position, i );

      // compute skinIndex and skinWeight based on some configuration data
      const y = ( vertex.y + PAGE_HEIGHT / 2 );
      const skinIndex = Math.floor( y / PAGE_SEGMENT_HEIGHT );
      const skinWeight = ( y % PAGE_SEGMENT_HEIGHT ) / PAGE_SEGMENT_HEIGHT;
      skinIndices.push( skinIndex, skinIndex + 1, 0, 0 );
      skinWeights.push( 1 - skinWeight, skinWeight, 0, 0 );
    }

    pageGeometry.setAttribute( 'skinIndex', new THREE.Uint16BufferAttribute( skinIndices, 4 ) );
    pageGeometry.setAttribute( 'skinWeight', new THREE.Float32BufferAttribute( skinWeights, 4 ) );

    const page: THREE.SkinnedMesh = new THREE.SkinnedMesh(pageGeometry, pageMaterial);

    // todo:bone bug
    const bones: THREE.Bone[] = [];
    const numBones = PAGE_SEGMENTS + 1;
    const skeleton = new THREE.Skeleton( bones );
    const rootBone = skeleton.bones[ 0 ];

    page.add( rootBone );
    page.bind( skeleton );

    skeleton.bones[ 0 ].rotation.x = -0.1;
    skeleton.bones[ 1 ].rotation.x = 0.2;
    return page;
  }
}

export default Page;
