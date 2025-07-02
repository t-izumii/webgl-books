import * as THREE from "three";
import Page from "./page";
import pageDatas from "../pageData";

class Book {
  createPages(): THREE.Group {
    const bookGroup: THREE.Group = new THREE.Group();

    pageDatas.map((data, index) => {
      const page: Page = new Page(data.id, data.image, index);
      bookGroup.add(page.createPage());
    });
    return bookGroup;
  }
}

export default Book;
