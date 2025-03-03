console.log('hello, world');

console.log('starry pattern');
console.log()

for (var i=0; i<4; i++) {
    for (var j=0; j<i+1; j++) {
        process.stdout.write("*")
    }
    console.log()
}
console.log()

/**
 * JS
 * - Single threaded
 *   - Runs on one core. One or max two cores on Virtual Machine
 *   - Only one single executor - no helpers. There are hacks to do it. 
 * - Asynchronous
 *   - Reading from file, Making API call, Waiting for input (keyboard, mouse)
 *   - Offload async tasks, 
 *   - Delegate to a different thread
 * 
 * JS written to run on Browsers, now Tv, mobile etc.
 * 
 * - Loosely typed - You dont define the types of variable and returns etc.
 * - Interpreted Language: Interpreted vs compiled.
 *   - It starts executing line by line. Control shifts to functions. Goes line by line, encounters fn, goes there
 * - Compile - Will compile the code first before executing (prechecking)
 * 
 * - Strict checks - Websites wont work. Need websites to run even if there are errors.
 * 
 * 
 * ECMA - Native JS code. 
 * API - expose the environment. 
 * Core - very simple
 * API - say nodejs exposes Location API. (Ability to use locations)
 */

function complexFn(n) {
    let sum = 0;
    for (var i=0; i<n; i++) {
        sum += 1;
    }
    return sum;
}

const a = complexFn(1000);
console.log(a);