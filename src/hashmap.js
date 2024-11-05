import { LinkedList } from "./linked-linked.js";

class HashMap {
    constructor() {
        // Start with hashmap of capacity: 16 
        this.buckets = [];
        for (let i = 0; i < 16; i++) {
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
