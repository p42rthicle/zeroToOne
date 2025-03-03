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