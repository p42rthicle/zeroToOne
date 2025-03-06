function startCounter() {
    count = 0;
    setInterval(() => {
        console.log(count);
        count++;
    }, 1000);
}

startCounter();