/**
 * Create a function 'series' that sequentially does the following.
 *  1. Read the contents of `a1.txt` using UTF-8 encoding.
 *  2. Wait for 3 seconds.
 *  3. Write the contents of `a1.txt` in `b1.txt`.
 *  4. Remove any extra space from `a1.txt`
 *  5. Delete the contents of `a1.txt`
 *  6. Delete the contents of `b1.txt`
 */

const fs = require('fs').promises;

function removeSpaces(data) {
    let cleanedData = "";
    let foundFirstChar = false;
    let lastWasSpace = false;

    for (let i=0; i<data.length; i++) {
        let char = data[i];
        if (char === ' ') {
            if (!foundFirstChar) continue;
            if (lastWasSpace) continue;
            cleanedData += char;
            lastWasSpace = true;
        } else {
            cleanedData += char;
            lastWasSpace = false;
            foundFirstChar = true;
        }
    }
    // Or we can use split array(" ") and push not-zero length elememts. 
    // Then join again with " "

    return cleanedData;
}

function series () {
    fs.readFile('a1.txt', 'utf-8')
    .then((dataFromA) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(dataFromA);
            }, 3000);
        });
    })
    .then((dataFromA) => {
        return fs.writeFile('b1.txt', dataFromA)
    })
    .then(() => {
        removeSpaces(dataFromA);
        return fs.readFile('a1.txt', 'utf-8')
    })
    .then(() => {
        return fs.writeFile('a1.txt', "");
    })
    .then(() => {
        fs.writeFile('b1.txt', "");
    })
    .catch((err) => {
        console.error("Error", err.message);
    });

}

series()