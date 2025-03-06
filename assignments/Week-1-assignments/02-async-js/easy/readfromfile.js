const fs = require('fs');

fs.readFile('someFile.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    console.log('File content:', data);
});

// Expensive computation
console.log("Starting expensive operation...");

let sum = 0;
for (let i = 0; i < 1e9; i++) {
    sum += i;
}

console.log("Expensive operation completed. Sum:", sum);
