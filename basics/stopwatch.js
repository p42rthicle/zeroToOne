const { start } = require("repl");

var counter = 1;

function printCounter() {
    //console.clear()
    console.log(counter)
    counter += 1
}

function blockingFunction() {
    ctr2 = 0;
    startTime = Date.now()
    for (var i=0; i<1000000000; i++) {
        ctr2 += 1;
    }
    endTime = Date.now()
    console.log("time taken:" + (endTime - startTime))
    console.log(ctr2)
}

setInterval(printCounter, 2000)
blockingFunction()

/**
 * Flow:
 * 1. Program offloaded the timer thing to somewhere else. (setInterval)
 * 2. It began the blockingFunction()
 * 3. blockingFunction kept running for a longer time, so the result / callback from the setInterval can't run till JS thread is free.
 * Hence, delay in printing `1` for 1Bn but incase of smaller number it runs fine, you can feel the delay
 */