import { Node } from "./Node.js";
class Tree {
    constructor(arr) {
        this.arr = arr; 
        this.root = this.buildTree(arr);
    }
    buildTree(array) {
        const uniqueArr = [...new Set(array)];
        const sortedUniqueArr = uniqueArr.sort();
        // return rootNode; 
    }
}

export { Tree }