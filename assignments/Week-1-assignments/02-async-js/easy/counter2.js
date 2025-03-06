function keepCounting(count) {
    setTimeout(() => {
        console.log(count);
        count++;
        keepCounting(count)
    }, 1000);
}

keepCounting(0);