class Node {
    constructor(value = null, nextNode = null) {
        this.value = value;
        this.nextNode = nextNode;
    }

    toString() {
        return `( ${this.value} ) -> `;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    append(value) {
        let node = new Node(value, null);
        if (this.head === null) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.nextNode = node;
            this.tail = node;
        }
    }

    toString() {
        let list = '';
        let current = this.head;
        while (current !== null) {
            console.log(current.toString());
            list = list + current.toString();
            current = current.nextNode;
        }
        list = list + 'null';
        return list;
    }
}

const list = new LinkedList();
list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");
console.log(list.toString());