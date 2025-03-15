/**
 * Write a function 'readFileCallback' that takes a filename and a callback function. 'readFileCallback' should read the contents
 * of the file asynchronously and pass the data to the callback function
 */

const fs = require('fs');

function readFileCallback(fileName, callback) {
    fs.readFile(fileName, 'utf-8', callback);
}

function fileRead(err, data) {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }
    console.log("File content:", data);
}

readFileCallback("fileProcessing.txt", fileRead);