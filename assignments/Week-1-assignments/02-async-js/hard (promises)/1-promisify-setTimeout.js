/*
    Write a function that returns a promise that resolves after n seconds have passed, where n is passed as an argument to the function.
*/

function wait(n) {
    return new Promise((resolve, reject) => {
        if (typeof n !== "number" || n < 0) {
            reject(new Error("Invalid time value"));
            return;
        }
        setTimeout(() => {
            resolve(`Promised resolved after ${n} seconds`);
        }, n * 1000);
    })
}

wait(5).then(() => {
    console.log(value);
}).catch(console.error);
wait(-2).then(console.log).catch(console.error);
