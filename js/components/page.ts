import * as THREE from "three";

class Page {
  constructor(public id: number, public image: string, public index: number) {
    this.id = id;
    this.image = image;
    this.index = index;
  }

  createPage(): { mesh: THREE.SkinnedMesh; helper: THREE.SkeletonHelper } {
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

    // material setting
    const pageMaterial: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
    });

    // bone setting - 複数のボーンを作成
    const bones: THREE.Bone[] = [];

    // ルートボーンを作成
    const rootBone = new THREE.Bone();
    rootBone.position.set(-PAGE_WIDTH / 2, 0, 0);
    bones.push(rootBone);

    // セグメント数に応じてボーンを作成
    for (let i = 1; i <= PAGE_SEGMENTS; i++) {
      const bone = new THREE.Bone();
      bone.position.set(PAGE_SEGMENT_WIDTH, 0, 0);
      bones[i - 1].add(bone);
      bones.push(bone);
    }

    // スキンインデックスとウェイトを設定
    const position = pageGeometry.attributes.position;
    const vertex = new THREE.Vector3();
    const skinIndices: number[] = [];
    const skinWeights: number[] = [];

    for (let i = 0; i < position.count; i++) {
      vertex.fromBufferAttribute(position, i);

      const x = (vertex.x + PAGE_WIDTH / 2);
      const skinIndex = Math.floor(x / PAGE_SEGMENT_WIDTH);
      const skinWeight = (x % PAGE_SEGMENT_WIDTH) / PAGE_SEGMENT_WIDTH;

      // インデックスが範囲内であることを確認
      const index1 = Math.min(skinIndex, PAGE_SEGMENTS);
      const index2 = Math.min(skinIndex + 1, PAGE_SEGMENTS);

      skinIndices.push(index1, index2, 0, 0);
      skinWeights.push(1 - skinWeight, skinWeight, 0, 0);
    }

    pageGeometry.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(skinIndices, 4));
    pageGeometry.setAttribute('skinWeight', new THREE.Float32BufferAttribute(skinWeights, 4));

    // mesh create
    const page = new THREE.SkinnedMesh(pageGeometry, pageMaterial);

    // skelton
    const skeleton = new THREE.Skeleton(bones);
    page.add(bones[0]); // ルートボーンを追加
    page.bind(skeleton);

    // ボーンヘルパーを作成（可視化）
    const helper = new THREE.SkeletonHelper(page);


    return {mesh: page , helper : helper };
  }
}

export default Page;
