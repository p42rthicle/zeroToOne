const fs = require('fs');

const content = "I am writing this to the file hehehehehe";

// Asynchronous file write
fs.writeFile('someFile.txt', content, 'utf8', (err) => {
    if (err) {
        console.error('Error writing to file:', err);
        return;
    }
    console.log('File successfully written!');
});

console.log('Writing to the file started parallely');
