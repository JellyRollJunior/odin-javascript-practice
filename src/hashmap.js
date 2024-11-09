import { LinkedList } from './linked-linked.js';

class KeyPair {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
}

class KeyPairLinkedList extends LinkedList {
    appendKeyPair(key, value) {
        let keyPair = new KeyPair(key, value);
        super.append(keyPair);
    }

    containsKey(key) {
        let current = this.head;
        while (current !== null) {
            if (current.value.key == key) return true;
            current = current.nextNode;
        }
        return false;
    }

    findKey(key) {
        let i = 0;
        let current = this.head;
        while (current !== null) {
            if (current.value.key == key) return i;
            current = current.nextNode;
            i = i + 1;
        }
        return null;
    }
}

class HashMap {
    constructor() {
        // Start with hashmap of capacity: 16
        this.buckets = [];
        this.expandBuckets(16);
        this.size = 0;
        this.loadFactor = 0.75;
    }

    expandBuckets(newCapacity) {
        const currentSize = this.buckets.length;
        for (let i = currentSize; i < newCapacity; i++) {
            this.buckets.push(new KeyPairLinkedList());
        }
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
            hashCode = hashCode % this.buckets.length;
        }
        return hashCode;
    }

    set(key, value) {
        const hashCode = this.hash(key);
        this.#insertValue(hashCode, key, value);
        // Double buckets if entries exceed load factor
        const expandPoint = this.buckets.length * this.loadFactor;
        if (this.size > expandPoint) {
            const entries = this.entries();
            this.clear();
            this.expandBuckets(this.buckets.length * 2);
            this.#setAll(entries);
        }
    }

    get(key) {
        let value = null;
        const index = this.hash(key);
        this.#boundsCheck(index)
        const list = this.buckets[index];
        if (list.containsKey(key)) {
            const index = list.findKey(key);
            const node = list.at(index);
            value = this.#getKeyPairValueFromNode(node);
        }
        return value;
    }

    remove(key) {
        const index = this.hash(key);
        this.#boundsCheck(index)
        const list = this.buckets[index];
        if (list.containsKey(key)) {
            const index = list.findKey(key);
            list.removeAt(index);
            this.size -= 1;
            return true;
        }
        return false;
    }

    length() {
        return this.size;
    }

    clear() {
        for (let i = 0; i < this.buckets.length; i++) {
            this.buckets[i] = new KeyPairLinkedList();
        }
        this.size = 0;
    }

    keys() {
        return this.entries().map((keyPair) => {
            return keyPair.key;
        })
    }

    values() {
        return this.entries().map((keyPair) => {
            return keyPair.value;
        })
    }

    entries() {
        let keyPairArray = [];
        for (const bucket of this.buckets) {
            let current;
            for (let i = 0; i < bucket.getSize(); i++) {
                current = bucket.at(i);
                keyPairArray.push(current.value);
            }
        }
        return keyPairArray;
    }

    #boundsCheck(index) {
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bound");
        }
    }

    #insertValue(index, key, value) {
        this.#boundsCheck(index)
        const list = this.buckets[index];
        if (list.containsKey(key)) {
            this.remove(key);
        }
        list.appendKeyPair(key, value);
        this.size += 1;
    }

    #setAll(entries) {
        entries.forEach((entry) => {
            this.set(entry.key, entry.value);
        });
    }

    #getKeyPairValueFromNode(node) {
        return node.value.value;
    }
}

const test = new HashMap();
test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')

console.log('test');