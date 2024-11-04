function fibsRecursive(n) {
    if (n == 1) return [0];
    if (n == 2) return [0, 1];
    let array = fibsRecursive(n - 1);
    array.push(array[n-2] + array[n-3]);
    return array;
  }

function mergesort(array) {
    console.log("This was printed recursively");
    if (array.length === 1) return array;
    const mid = array.length / 2;
    let left = mergesort(array.slice(0, mid));
    let right = mergesort(array.slice(mid, array.length));
    let sorted = merge(left, right);
    return sorted;
}

function merge(a, b) {
    let sorted = [];
    let i = 0;
    let j = 0;
    while (i < a.length && j < b.length) {
        if (a[i] < b[j]) {
            sorted.push(a[i]);
            i++;
        } else {
            sorted.push(b[j]);
            j++;
        }
    }

    while (j < b.length) {
        sorted.push(b[j]);
        j++;
    }

    while (i < a.length) {
        sorted.push(a[i]);
        i++;
    }
    return sorted;
}

const array = [5, 2, 3, 1, 4];
console.log(array);
console.log(mergesort(array));
console.log(mergesort(fibsRecursive(8)));
