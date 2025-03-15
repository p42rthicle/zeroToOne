/**
 * Implement a function 'parallelFileOperation' that returns an array of size 2 with the first index containing the contents
 * of the file 'a.txt' in UTF-8 encoding. If `a.txt` doesn't exist, then throw an error. The second element of the array contains
 * 1 if the text 'Hello!' is successfully written to the file 'b.txt' and 0 if the write operation fails
 */

const fs = require('fs').promises;

async function parallelFileOperation() {
    try{
        const readPromise = fs.readFile('a.txt', 'utf-8');
        const writePromise = fs.writeFile('b.txt', 'Hello!')
        .then(() => 1).catch(() => 0);

        const [fileContent, writeStatus] = await Promise.all([readPromise, writePromise]);
        return [fileContent, writeStatus];}
    catch {
        throw new Error("a.txt does not exist");
    }
}

parallelFileOperation()
    .then(result => console.log("Result:", result))
    .catch(error => console.error("Error:", error.message))