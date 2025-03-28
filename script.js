import { Tree } from "./Tree.js";

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
tree.insert(24);
tree.deleteItem(324);
console.log(tree.find(23));

// tree.levelOrder((node) => console.log(node.data));

// tree.inOrder(tree.root, (node) => console.log(node.data));

// tree.preOrder(tree.root, (node) => console.log(node.data));

// tree.postOrder(tree.root, (node) => console.log(node.data));

console.log(tree.height(tree.find(67)));

console.log(tree.depth(tree.find(8)))