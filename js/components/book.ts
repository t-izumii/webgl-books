import * as THREE from "three";
import Page from "./page";
import pageDatas from "../pageData";

class Book {
  createPages(): THREE.Group {
    const bookGroup: THREE.Group = new THREE.Group();

    pageDatas.map((data, index) => {
      const page: Page = new Page(data.id, data.image, index);
      const { mesh, helper } = page.createPage();

      bookGroup.add(mesh);
      bookGroup.add(helper);
    });
    return bookGroup;
  }
}

export default Book;
