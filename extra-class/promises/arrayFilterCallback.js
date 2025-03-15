/**
 * Write a function 'filterArray' that takes an array and a callback function as arguments. 'filterArray' should filter the elements
 * based on the condition specified by the callback function and return a new array with the filtered elements
 */

function filterArray(arr, callback) {
    var newArr = [];

    for(let ele of arr) {
        if (callback(ele)) newArr.push(ele);
    }

    return newArr;
}

let filteredList = filterArray([1,2,3,4,5,6], (ele) => {
    return ele % 2 == 0;
})

console.log(filteredList);