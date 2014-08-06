function TreeNode(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}

TreeNode.prototype.insert = function(value) {
  if (this.value > value) {
    if (this.left !== null) {
      this.left.insert(value);
    } else{
      this.left = new TreeNode(value);
    }
  } else {
    if (this.right !== null) {
      this.right.insert(value);
    } else{
      this.right = new TreeNode(value);
    }
  }
};

TreeNode.prototype.find = function(value) {
  if (this.value === value) {
    return this;
  }
  if (this.value > value) {
    if (this.left === null) {
      return null;
    }
    return this.left.find(value);
  }
  if (this.value < value) {
    if (this.right === null) {
      return null;
    }
    return this.right.find(value);
  }
  return null;
};

TreeNode.prototype.delete = function(value) {
  var node = this;
  var parentNode = null;
  var direction = 0;

  while (node !== null && node.value !== value) {
    parentNode = node;
    if (node.value > value) {
      node = node.left;
      direction = -1;
    } else {
      node = node.right;
      direction = 1;
    }
  }
  if (node === null) {
    return false;
  }

  if (node.left === null || node.right === null) {
    if (node.left === null) {
      if (direction === -1) {
        parentNode.left = node.right;
      } else if (direction === 1) {
        parentNode.right = node.right;
      } else if (direction === 0) {
        this = node.right;
      }
    }
    if (node.right === null) {
      if (direction === -1) {
        parentNode.left = node.left;
      } else if (direction === 1) {
        parentNode.right = node.left;
      } else if (direction === 0) {
        this = node.left;
      }
    }
  } else {
    var leftBiggest = node.left;
    parentNode = node;
    direction = -1;

    while (leftBiggest.right != null) {
      parentNode = leftBiggest;
      leftBiggest = leftBiggest.right;
      direction = 1;
    }

    node.value = leftBiggest.value;
    if (direction === -1) {
      parentNode.left = leftBiggest.left;
    } else {
      parentNode.right = leftBiggest.left;
    }
  }
  return true;
};

TreeNode.prototype.toString = function(depth) {
  depth = depth || 1;
  var strs = [];
  if (this.left !== null) {
    strs.push(this.left.toString(depth + 1));
  }
  strs.push(Array(depth).join('    ') + this.value);
  if (this.right !== null) {
    strs.push(this.right.toString(depth + 1));
  }
  return strs.join('\n');
};

function main() {
  var root = new TreeNode(100);
  for (var i = 0; i < 10; i++) {
    var value = Math.random() * 200 | 0;
    root.insert(value);
  }
  console.log(root.toString());

  console.log('');

  for (var i = 0; i < 10; i++) {
    var found = (root.find(i) !== null) ? 'Found' : 'Not found';
    console.log(found + ' ' + i);
  }

  console.log('');

  for (var i = 0; i < 100; i++) {
    var value = Math.random() * 200 | 0;
    if (root.delete(value)) {
      console.log('Deleted:' + value);
      console.log(root.toString());
    }
  }
}

main();
