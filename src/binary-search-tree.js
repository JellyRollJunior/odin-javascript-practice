function node(data, left = null, right = null) {
    return { data, left, right };
}

function tree(array) {

    const buildTree = (array) => {
        array.sort();
        // remove duplicates
        const values = [...new Set(array)];
        // construct tree
        return treeBuilding(0, values.length - 1, values);
    }

    const treeBuilding = (start, end, values) => {
        if (start > end) return null;
        let mid = Math.floor((start + end) / 2);
        const current = node(
            values[mid],
            treeBuilding(start, mid - 1, values),
            treeBuilding(mid + 1, end, values)
        );
        return current;
    }

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

    let root = buildTree(array);

    return {root, prettyPrint}
}

const test = tree([5, 4, 3]);
test.prettyPrint(test.root);