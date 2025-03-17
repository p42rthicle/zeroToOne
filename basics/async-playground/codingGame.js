let counter = 0;

let timer = setInterval(() => {
    console.log('This is asyncrhonous message', counter);

    counter++;

    if (counter >= 5) {
        clearInterval(timer);
    }
}, 1000);

console.log('This is synchronous message');