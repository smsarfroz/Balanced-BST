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
    let nodeTobeDeleted = new Node();
    let curNode = this.root;
    let parNode = new Node();
    let nextNode = new Node();
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

}

export { Tree };
