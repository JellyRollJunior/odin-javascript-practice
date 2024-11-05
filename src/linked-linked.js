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

    getSize() {
        return this.size;
    }

    getHead() {
        return this.head;
    }

    getTail() {
        return this.tail;
    }

    at(value) {
        if (value >= this.size) return null;
        let current = this.head;
        for (let i = 0; i < value; i++) {
            current = current.nextNode;
        }
        return current;
    }

    pop() {
        // size = 1
        if (this.head === this.tail) {
            let node = this.tail;
            this.head = null;
            this.tail = null;
            this.size = 0;
            return node;
        } else {
            let current = this.head;
            let currentNext = this.head.nextNode;
            // increment until we hit tail-1 and tail
            while (currentNext !== this.tail) {
                current = current.nextNode;
                currentNext = currentNext.nextNode;
            }
            let node = this.tail;
            this.tail = current;
            this.tail.nextNode = null;
            return node;
        }
    }

    contains(value) {
        let current = this.head;
        while (current !== null) {
            if (current.value == value) return true;
            current = current.nextNode;
        }
        return false;
    }

    toString() {
        let list = '';
        let current = this.head;
        while (current !== null) {
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
console.log(list.getSize());
console.log(list.getHead());
console.log(list.getTail());
console.log(list.at(0));
console.log(list.at(6));
console.log(list.pop());
console.log(list.toString());
console.log(list.contains('usagi'));
console.log(list.contains('chiikawa'));