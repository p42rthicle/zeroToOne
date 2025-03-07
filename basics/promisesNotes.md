1. **Callbacks vs. Promises vs. Coroutines**  
   - Callbacks: You tell it what to do when done (callback hell).  
   - Promises: It tells you when it’s done, and you handle it using `.then()` and `.catch()`.  
   - Observer Pattern: Promise stores handlers (`onFulfilled`, `onRejected`) and calls them when resolved or rejected.  

2. **How Promises Work Internally**  
   - State transitions from `pending` to either `fulfilled` or `rejected`, and it cannot change afterward.  
   - Handlers are stored internally and executed when the state updates.  
   - Every `.then()` creates a new promise and passes the result forward. 
   - The `.then()` function executes **synchronously** and registers a handler for when the Promise resolves.  
   - When `resolve(value)` is called, it **queues the handler** and executes it when the JavaScript thread is free.  
   - The `.then()` line itself does **not** wait; it runs and moves on. The actual callback inside `.then()` executes later when `resolve()` is triggered. 
   - `.catch()` handles errors similar to `try-catch`.  

3. **Promises vs. Kotlin Coroutines**  
   - In JavaScript, `new Promise(executorFn)` creates an async block, while in Kotlin, `async {}` does the same.  
   - `.then()` in JavaScript is like calling `await()` in Kotlin to unwrap the result.  
   - `resolve(value)` in JavaScript is like `Deferred.complete(value)` in Kotlin to manually set a value.  
   - `.catch()` in JavaScript works like `try-catch` in Kotlin coroutines.  

4. **How `await()` Works in Kotlin**  
   - Suspends the coroutine if the value isn’t ready.  
   - Registers a callback (continuation) internally.  
   - Resumes the coroutine once the result is available.  
   - Non-blocking, so the thread continues running.  

Callbacks require you to specify what to do at each step, while promises notify you when something is done, and coroutines make async code look synchronous.

## Quick Summary of Promises
- A Promise is an object that represents an asynchronous operation that will either resolve (success) or reject (failure).
- Instead of using callbacks (callback hell), Promises provide .then() and .catch() to handle results in a more structured way.
- The executor function `(resolve, reject) => {}` runs immediately when a Promise is created, and you manually call `resolve(value)` or `reject(error)`.
- `.then()` is executed when the Promise resolves, and `.catch()` is executed if it rejects.
- Promises are immutable—once resolved/rejected, they cannot change state.
- Observer pattern-like behavior—multiple .then() handlers get attached and are executed in order when resolved.

## Some Key Questions
1. What happens if I call .then() on a Promise that hasn’t resolved yet?
The .then() function is executed immediately, but its callback is registered as a handler and will execute once resolve(value) is called.
2. What happens if .then() is called, but the Promise never resolves?
The handler inside .then() will never execute because the Promise stays in a pending state indefinitely.
3. Does .then() return a new Promise?
Yes, .then() always returns a new Promise, allowing for chaining.
4. What happens if there is no resolve(value), but .then() is called?
The .then() handler will not execute because it only runs when resolve(value) is explicitly called.
5. How does JavaScript manage the execution of Promises?
Promises use the microtask queue in the event loop, meaning .then() handlers execute after the synchronous code but before normal setTimeout/setInterval tasks.
6. Does calling .then() multiple times create multiple new Promises?
No, calling .then() multiple times on the same Promise attaches multiple handlers, which all execute when the Promise resolves.
7. How does await internally work with Promises?
await suspends execution inside an async function and pauses at that point until the Promise resolves.
Internally, await is like .then(), but written in a synchronous-looking way.
It does not block the JavaScript event loop; it pauses only the function execution.
8. What happens if I call .then() on a Promise that already resolved?
It executes immediately because the Promise has already completed, and handlers remain in memory.
9. Is resolve(value) synchronous or asynchronous?
resolve(value) is synchronous in the sense that it sets the state immediately, but the actual .then() handlers execute asynchronously via the microtask queue.
10. How does resolve() trigger .then()?
Calling resolve(value) updates the state and schedules the .then() handler in the microtask queue, ensuring it runs when the call stack is clear.
11. Is a new Promise object created every time .then() is used?
Yes, .then() always returns a new Promise, even if it’s linked to the same original Promise.