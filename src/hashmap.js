import { Node, LinkedList } from "./linked-linked.js";

class KeyPair {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
}

class KeyPairLinkedList extends LinkedList {
    appendKeyPair(key, value) {
        let keyPair = new KeyPair(key, value);
        let node = new Node(keyPair, null);
        if (this.head === null) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.nextNode = node;
            this.tail = node;
        }
        this.size = this.size + 1;
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

    #insertValue(index, key, value) {
        // todo: check for repeat key -> delete repeat key value
        const list = this.buckets[index];
        list.appendKeyPair(key, value);
    }

    set(key, value) {
        const hashCode = this.hash(key);
        this.#insertValue(hashCode, key, value);
    }
}

const map = new HashMap();
console.log(map.hash('hello'));
map.set('hello', 'usagi');
console.log(map.buckets);
console.log(map.buckets[2].toString());
