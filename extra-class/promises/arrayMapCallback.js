/**
 * Implement a function 'mapArray' that takes an array and a callback function as arguments. 'mapArray' should apply the callback function
 * to each element of the array and return a new array with the modified values.
 */

function mapArray(arr, transform) {
    for (let i=0; i<arr.length; i++) {
        arr[i] = transform(arr[i]);
    }
    return arr;
}

let transformed = mapArray([1,2,4,6], (n) => {
    return n*2;
})

console.log(transformed); 