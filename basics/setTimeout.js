function expensiveOperation() {
    var sum = 0;
    for (var i=0; i<1000; i++) {
        sum += i;
    }

    console.log("expensive output = " + sum)
}

function printTimeNotif() {
    console.log("5 seconds have passed")
}
console.log("start keeping time")
setTimeout(printTimeNotif, 5 * 1000) // Delegation - to another process
expensiveOperation()