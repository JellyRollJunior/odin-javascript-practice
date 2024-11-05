import { LinkedList } from "./linked-linked.js";

class HashMap {
    constructor() {
        // Start with hashmap of capacity: 16 
        this.buckets = [];
        this.expandBuckets(16);
    }

    expandBuckets(newCapacity) {
        const currentSize = this.buckets.length;
        for (let i = currentSize; i < newCapacity; i++) {
            this.buckets.push(new LinkedList());
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
}
