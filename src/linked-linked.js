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
            this.size = this.size - 1;
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

    find(value) {
        let i = 0;
        let current = this.head;
        while (current !== null) {
            if (current.value == value) return i;
            current = current.nextNode;
            i = i + 1;
        }
        return null;
    }

    insertAt(value, index) {
        if (index <= 0) {
            let node = new Node(value, this.head);
            this.head = node;
        } else if (index >= this.size) {
            let node = new Node(value, null);
            this.tail.nextNode = node;
            this.tail = node;
        } else {
            let left = this.head;
            let right = this.head.nextNode;
            for (let i = 1; i < index; i++) {
                left = left.nextNode;
                right = right.nextNode;
            }
            let node = new Node(value, right);
            left.nextNode = node;
        }
        this.size = this.size + 1;
    }

    removeAt(index) {
        if (this.size == 0) {
            return;
        } else if (this.size == 1) {
            this.pop();
        } else {
            // size >= 2
            if (index <= 0) {
                this.head = this.head.nextNode;
            } else if (index >= this.size) {
                let left = this.head;
                let right = this.head.nextNode;
                while (right !== this.tail) {
                    left = left.nextNode;
                    right = right.nextNode;
                }
                this.tail = left;
                left.nextNode = null;
            } else {
                let left = this.head;
                let mid = left.nextNode;
                let right = mid.nextNode;
                for (let i = 1; i < index; i++) {
                    left = left.nextNode;
                    mid = mid.nextNode;
                    right = right.nextNode;
                }
                left.nextNode = right;
            }
        }
        this.size = this.size - 1;
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
console.log(list.find('snake'));
console.log(list.find('chiikawa'));
console.log(list.insertAt('hachiware', 3));
console.log(list.insertAt('chiikawa', 2002));
console.log(list.insertAt('usagi2', -123123));
console.log(list.toString());
console.log(list.getSize());
list.removeAt(0);
list.removeAt(6);
list.removeAt(123123);
console.log(list.toString());
console.log(list.getSize());
