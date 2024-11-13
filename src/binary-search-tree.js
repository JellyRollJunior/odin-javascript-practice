function node(data, left = null, right = null) {
    return { data, left, right };
}

function tree(array) {
    const buildTree = (array) => {
        array.sort();
        // remove duplicates
        const values = [...new Set(array)];
        // construct tree
        return buildTreeRecursive(0, values.length - 1, values);
    };

    const buildTreeRecursive = (start, end, values) => {
        if (start > end) return null;
        let mid = Math.floor((start + end) / 2);
        const current = node(
            values[mid],
            buildTreeRecursive(start, mid - 1, values),
            buildTreeRecursive(mid + 1, end, values)
        );
        return current;
    };

    const insert = function (value) {
        if (root == null) {
            root = node(value);
        } else {
            insertRecursive(value, getRoot());
        }
    };

    const insertRecursive = (value, current) => {
        if (current == null) return;
        if (value < current.data) {
            if (current.left == null) {
                current.left = node(value);
            }
            insertRecursive(value, current.left);
        } else if (value > current.data) {
            if (current.right == null) {
                current.right = node(value);
            }
            insertRecursive(value, current.right);
        }
        return;
    };

    const deleteItem = (value) => {
        let target = find(value);
        if (target == null) {
            return;
        } else if (target == root && root.left == null && root.right == null) {
            // if target is last node in BST, delete root
            root = null;
            return;
        }
        const parent = findParent(target);
        if (target.left == null && target.right == null) {
            // case 1: target is a leaf
            parent.left == target
                ? (parent.left = null)
                : (parent.right = null);
        } else if (target.left != null && target.right != null) {
            // case 3: target has two children
            const next = findNext(target);
            // remove next biggest value from tree and replace our target with the next biggest value
            deleteItem(next.data);
            target.data = next.data;
        } else {
            // case 2: target has one child
            const targetChild =
                target.left != null ? target.left : target.right;
            if (parent.left == target) {
                parent.left = targetChild;
            } else {
                parent.right = targetChild;
            }
        }
    };

    const find = function (value) {
        let current = getRoot();
        while (current != null && current.data != value) {
            if (value < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        return current;
    };

    const findParent = function (child) {
        let parent = null;
        levelOrder((node) => {
            if (node.left == child || node.right == child) parent = node;
        });
        return parent;
    };

    const findNext = function (node) {
        if (node == null) return null;
        let next = node.right;
        while (next.left) {
            next = next.left;
        }
        return next;
    };

    const levelOrder = (callback) => {
        if (typeof callback !== 'function') {
            throw new Error('Parameter is not a callback function!');
        }
        const queue = [getRoot()];
        while (queue.length > 0) {
            let current = queue.shift();
            if (current.left != null) queue.push(current.left);
            if (current.right != null) queue.push(current.right);
            callback(current);
        }
    };

    const inOrder = function (callback) {
        if (typeof callback !== 'function') {
            throw new Error('Parameter is not a callback function!');
        }
        inOrderRecursive(callback, getRoot());
    };

    const inOrderRecursive = (callback, node) => {
        if (node == null) return;
        if (node.left != null) inOrderRecursive(callback, node.left);
        callback(node);
        if (node.right != null) inOrderRecursive(callback, node.right);
    };

    const preOrder = function (callback) {
        if (typeof callback !== 'function') {
            throw new Error('Parameter is not a callback function!');
        }
        preOrderRecursive(callback, getRoot());
    };

    const preOrderRecursive = (callback, node) => {
        if (node == null) return;
        callback(node);
        if (node.left != null) preOrderRecursive(callback, node.left);
        if (node.right != null) preOrderRecursive(callback, node.right);
    };

    const postOrder = function (callback) {
        if (typeof callback !== 'function') {
            throw new Error('Parameter is not a callback function!');
        }
        postOrderRecursive(callback, getRoot());
    };

    const postOrderRecursive = (callback, node) => {
        if (node == null) return;
        if (node.left != null) postOrderRecursive(callback, node.left);
        if (node.right != null) postOrderRecursive(callback, node.right);
        callback(node);
    };

    const height = (node) => {
        return heightRecurse(node, node);
    };

    const heightRecurse = (node, current) => {
        if (
            current == null ||
            (current.left == null && current.right == null)
        ) {
            return 0;
        }
        const height = Math.max(
            heightRecurse(node, current.left) + 1,
            heightRecurse(node, current.right) + 1
        );
        return height;
    };

    const depth = function (node) {
        if (node == getRoot()) return 0;
        let depth = 0;
        let current = getRoot();
        while (current != null && current.data != node.data) {
            if (node.data < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
            depth += 1;
        }
        return current == null ? null : depth;
    };

    const isBalanced = function () {
        let balanced = true;
        levelOrder(function (node) {
            if (Math.abs(height(node.left) - height(node.right)) > 1) {
                balanced = false;
            }
        });
        return balanced;
    };

    const rebalance = function () {
        let data = [];
        levelOrder((node) => {
            data.push(node.data);
        });
        root = buildTree(data);
    };

    const prettyPrint = (node, prefix = '', isLeft = true) => {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            prettyPrint(
                node.right,
                `${prefix}${isLeft ? '│   ' : '    '}`,
                false
            );
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        if (node.left !== null) {
            prettyPrint(
                node.left,
                `${prefix}${isLeft ? '    ' : '│   '}`,
                true
            );
        }
    };

    let root = buildTree(array);
    const getRoot = () => root;

    return {
        getRoot,
        insert,
        deleteItem,
        find,
        levelOrder,
        inOrder,
        preOrder,
        postOrder,
        height,
        depth,
        isBalanced,
        rebalance,
        prettyPrint,
    };
}

// const test = tree([5, 4, 3]);
// test.insert(1);
// test.insert(6);
// test.insert(5);
// test.insert(9);
// test.insert(8);
// test.insert(10);
// test.prettyPrint(test.getRoot());
// test.deleteItem(4);
// test.prettyPrint(test.getRoot());

const map = tree([]);
map.insert(0);
map.prettyPrint(map.getRoot());
map.deleteItem(0);
map.prettyPrint(map.getRoot());

console.log('test');
