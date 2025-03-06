const fs = require('fs');

function cleanData(data) {
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

    return cleanedData;
}

fs.readFile("sample.txt", "utf-8", (err, data) => {
    if (err) {
        console.error('error reading from file:', err);
        return;
    }
    console.log('read from file', data);
    let cleanedData = cleanData(data);
    fs.writeFile("sample.txt", cleanedData, (err) => {
        if (err) {
            console.error('error writing to file:', err);
            return;
        }
        console.log('Wrote to file: ', cleanedData);
    })
})