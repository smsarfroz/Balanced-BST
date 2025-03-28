import { Node } from "./Node.js";

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

class Tree {
  constructor(arr) {
    const uniqueArr = [...new Set(arr)];
    const sortedUniqueArr = uniqueArr.sort((a, b) => a - b);

    console.log(sortedUniqueArr);
    this.arr = sortedUniqueArr;
    this.len = this.arr.length;
    this.root = this.buildTree(sortedUniqueArr, 0, this.len - 1);
    prettyPrint(this.root);
  }
  buildTree(array, start, end) {
    if (start > end) return null;
    let mid = Math.floor((start + end) / 2);
    let leftNode = this.buildTree(array, start, mid - 1);
    let rightNode = this.buildTree(array, mid + 1, end);
    const rootNode = new Node(array[mid], leftNode, rightNode);
    return rootNode;
  }
  insert(value) {
    let curNode = this.root; 
    let nextNode = new Node();
    if (value < curNode.data) {
      nextNode = curNode.left;
    } else {
      nextNode = curNode.right;
    }
    while (nextNode != null) {
      if (value < nextNode.data) {
        curNode = nextNode;
        nextNode = nextNode.left;
      } else {
        curNode = nextNode;
        nextNode = nextNode.right;
      }
    }
    console.log(curNode);
    if (value < curNode.data) {
      curNode.left = new Node(value);
    } else {
      if (value != curNode.data) {
        curNode.right = new Node(value);
      } else {
        console.log('The given value is already there in the tree!');
      }
    }
    prettyPrint(this.root);
  }
  deleteItem(value) {
    let curNode = this.root;
    let parNode = new Node();
    let ok = false;
    if (this.root.data == value) {
      ok = true;
    }
    while (curNode != null && curNode.data != value) {
      parNode = curNode;
      if (value < curNode.data) {
        curNode = curNode.left;
      } else {
        curNode = curNode.right;
      }
    }
    if (curNode != null && curNode.data == value) {
      if (curNode.left == null && curNode.right == null) {
        //it's a leaf
        if (curNode.data < parNode.data) {
          parNode.left = null;
        } else {
          parNode.right = null;
        }
      } else {
        let rightChild = curNode.right;
        if (rightChild == null) {
          if (curNode.data < parNode.data) {
            parNode.left = curNode.left;
          } else {
            parNode.right = curNode.right;
          }
        } else {
          if (rightChild.left == null) {
            if (curNode.data < parNode.data) {
              parNode.left = rightChild;
            } else {
              parNode.right = rightChild;
            }
            rightChild.left = curNode.left;
          } else {
            //go as far left as possible. 
            let nodeReplace = rightChild.left;
            let parNodeReplace = rightChild;

            while (nodeReplace.left != null) {
              parNodeReplace = nodeReplace;
              nodeReplace = nodeReplace.left;
            }

            if (ok) {
              parNodeReplace.left = nodeReplace.right;
              nodeReplace.left = curNode.left; 
              nodeReplace.right = curNode.right; 
              this.root = nodeReplace;
              // curNode = null;
            } else {
              parNodeReplace.left = nodeReplace.right;
              if (curNode.data < parNode.data) {
                parNode.left = nodeReplace;
              } else {
                parNode.right = nodeReplace;
              }
              nodeReplace.left = curNode.left;
              nodeReplace.right = curNode.right;
            }
          }
        }
      }
      prettyPrint(this.root);
    } else {
      throw new Error('No such value exists in the tree.');
    }
  }
  find(value) {
    let curNode = this.root;
    while (!(curNode == null || curNode.data == value)) {
      if (value < curNode.data) {
        curNode = curNode.left;
      } else {
        curNode = curNode.right;
      }
    }
    if (curNode != null && curNode.data == value) {
      return curNode;
    } else {
      throw new Error('Given value is not there in the tree');
    }
  }
  levelOrder(callback) {
    if (!callback) {
      throw new Error('Please provide a callback function first.');
    }
    let queue = [];
    queue.push(this.root);
    while (queue.length) {
      let curNode = queue.shift();
      callback(curNode);
      if (curNode.left != null) {
        queue.push(curNode.left);
      }
      if (curNode.right != null) {
        queue.push(curNode.right);
      }
    }
  }
  inOrder(node, callback) {
    if (!callback) {
      throw new Error('Please provide a callback function first.');
    }
    if (node == null) return;

    this.inOrder(node.left, callback);
    callback(node);
    this.inOrder(node.right, callback);
  }
  preOrder(node, callback) {
    if (!callback) {
      throw new Error('Please provide a callback function first.');
    }
    if (node == null) return;
    callback(node);
    this.preOrder(node.left, callback);
    this.preOrder(node.right, callback);
  }
  postOrder(node, callback) {
    if (!callback) {
      throw new Error('Please provide a callback function first.');
    }
    if (node == null) return;
    this.postOrder(node.left, callback);
    this.postOrder(node.right, callback);
    callback(node);
  }
  height(node, Height = 0) {
    if (node == null || (node.left == null && node.right == null)) {
      return 0;
    }
    Height += Math.max((node.left != null) + this.height(node.left, Height), (node.right != null) + this.height(node.right, Height));
    return Height;
  }
  depth(node) {
    let value = node.data; 
    let curdepth = 0; 
    let curNode = this.root;
    while (curNode != node) {
      if (value < curNode.data) {
        curNode = curNode.left;
      } else {
        curNode = curNode.right;
      }
      curdepth++;
    }
    return curdepth;
  }
  isBalanced() {
    let ok = true;
    this.preOrder(this.root, (node) => {
      if (this.height(node.left) - this.height(node.right) > 1) {
        ok = false; 
      }
    });
    if (ok) {
      return true;
    } else {
      return false;
    }
  }
  rebalance() {
    let array = [];
    this.inOrder(this.root, (node) => {
      array.push(node.data);
    });
    console.log(array);
    const rootNodeOfBalancedTree = this.buildTree(array, 0, array.length - 1);
    this.root = rootNodeOfBalancedTree;
    prettyPrint(this.root);
  }
}

export { Tree };
