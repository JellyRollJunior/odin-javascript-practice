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

    const insert = (value) => {
        insertRecursive(value, root);
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

    const find = (value) => {
        let current = root;
        while (current != null && current.data != value) {
            if (value < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        return current;
    };

    const levelOrder = (callback) => {
        if (typeof callback !== 'function')
            throw new Error('Parameter is not a callback function!');
        const queue = [root];
        while (queue.length > 0) {
            let current = queue.shift();
            if (current.left != null) queue.push(current.left);
            if (current.right != null) queue.push(current.right);
            callback(current);
        }
    };

    const inOrder = (callback) => {
        if (typeof callback !== 'function')
            throw new Error('Parameter is not a callback function!');
        inOrderRecursive(callback, root);
    };

    const inOrderRecursive = (callback, node) => {
        if (node == null) return;
        if (node.left != null) inOrderRecursive(callback, node.left);
        callback(node);
        if (node.right != null) inOrderRecursive(callback, node.right);
    };

    const depth = (value) => {
        if (value == root.data) return 0;
        let depth = 0;
        let current = root;
        while (current != null && current.data != value) {
            if (value < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
            depth += 1;
        }
        return current == null ? null : depth;
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

    return { root, insert, find, levelOrder, inOrder, depth, prettyPrint };
}

function call(node) {
    console.log(node.data);
}

const test = tree([5, 4, 3]);
test.insert(1);
test.insert(6);
test.insert(5);
test.insert(9);
test.insert(8);
test.prettyPrint(test.root);
// test.levelOrder(call);
// test.inOrder(call);
