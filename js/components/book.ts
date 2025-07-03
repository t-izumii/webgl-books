import * as THREE from "three";
import Page from "./page";
import pageDatas from "../pageData";

class Book {
  constructor(public pages: Page[], public bookGroup: THREE.Group | null) {
    this.pages = [];
    this.bookGroup = null;
  }

  createPages(): THREE.Group {
    this.bookGroup = new THREE.Group();

    pageDatas.map((data, index) => {
      const page: Page = new Page(data.id, data.image, index, null);
      const mesh = page.createPage();

      this.pages.push(page);
      if (!this.bookGroup) return;
      this.bookGroup.add(mesh);
      this.bookGroup.position.set(-8, 0, 0);
      this.bookGroup.rotation.y = -Math.PI / 2;
    });
    return this.bookGroup;
  }

  updatePages(activePage: number) {
    if (!this.bookGroup) return;
    if (activePage === 9) {
      this.bookGroup.position.x = this.lerp(this.bookGroup.position.x, 8, 0.05);
    } else {
      this.bookGroup.position.x = this.lerp(this.bookGroup.position.x, -8, 0.1);
    }

    this.pages.forEach((page) => {
      page.updatePage(activePage);
    });
  }

  lerp(start: number, end: number, t: number) {
    return start + (end - start) * t;
  }
}

export default Book;
