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
        this.size = 0;
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
        this.size = this.size + 1;
    }

    prepend(value) {
        let node = new Node(value, this.head);
        this.head = node;
        this.size = this.size + 1;
    }

    size() {
        return this.size;
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
list.prepend("usagi");
console.log(list.toString());
console.log(list.size());