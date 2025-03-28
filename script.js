import { Tree } from "./Tree.js";

/*
let tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
tree.insert(24);
tree.deleteItem(324);
console.log(tree.find(23));

// tree.levelOrder((node) => console.log(node.data));

// tree.inOrder(tree.root, (node) => console.log(node.data));

// tree.preOrder(tree.root, (node) => console.log(node.data));

// tree.postOrder(tree.root, (node) => console.log(node.data));

// console.log(tree.height(tree.find(67)));

// console.log(tree.depth(tree.find(8)))

console.log(tree.isBalanced());

tree.rebalance();

console.log(tree.isBalanced());

*/

const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const arrayOfRandomNumbers = (len) => {
  const arr = [];
  for (let i = 0; i < len; ++i) {
    arr.push(getRandomNumber(1, 100));
  }
  return arr;
};

let tree = new Tree(arrayOfRandomNumbers(10));

console.log(tree.isBalanced());

const printOrders = () => {
  let levelorder = "";
  tree.levelOrder((node) => (levelorder += node.data + " "));
  console.log(levelorder);

  let inorder = "";
  tree.inOrder(tree.root, (node) => (inorder += node.data + " "));
  console.log(inorder);

  let preorder = "";
  tree.preOrder(tree.root, (node) => (preorder += node.data + " "));
  console.log(preorder);

  let postorder = "";
  tree.postOrder(tree.root, (node) => (postorder += node.data + " "));
  console.log(postorder);
};
printOrders();

const unbalanceTheTree = () => {
  let numberOfAddedNodes = getRandomNumber(1, 5);
  for (let i = 0; i < numberOfAddedNodes; ++i) {
    tree.insert(getRandomNumber(101, 200));
  }
};
unbalanceTheTree();

console.log(tree.isBalanced());

tree.rebalance();

console.log(tree.isBalanced());

printOrders();
