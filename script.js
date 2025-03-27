import { Tree } from "./Tree.js";

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
tree.insert(24);
tree.deleteItem(324);
console.log(tree.find(23));

let levelorder = '';
const levelOrdercallback = (node) => {
    let queue = [];
    queue.push(node);
    while (queue.length) {
      let curNode = queue.shift();
      levelorder += `${curNode.data} `;
      if (curNode.left != null) {
        queue.push(curNode.left);
      }
      if (curNode.right != null) {
        queue.push(curNode.right);
      }
    }
};
tree.levelOrder(levelOrdercallback);
console.log(levelorder);

let inorder = '';
const inOrderCallback = (node) => {
    if (node == null) return;

    inOrderCallback(node.left);
    inorder += `${node.data} `;
    inOrderCallback(node.right);
};
tree.inOrder(inOrderCallback);
console.log(inorder);