const fs = require('fs')

function sum(n) {
    let sum = 0
    for (var i=1; i<=n; i++) {
        sum += i;
    }

    return sum;
}

function fileIsRead(err, contents) {
    if (err) {
        console.log(err)
    }
    console.log('File is read')
    console.log("Answer is " + sum(contents));
}

console.log('Before reading file')
fs.readFile("chocolates.txt", 'utf8', fileIsRead) // Asynchronous - Offloaded the reading task and below execution continues
console.log('After reading file')