/**
 * Write a function 'higherOrderAsync' that takes a callback function as an argument. Inside 'higherOrderAsync', call the callback function
 * asyncrhonously using setTimeout after a delay of n seconds, where n is current day of the month according to UTC time (1<= n <= 31).
 */

function higherOrderAsync(callback) {
    var dayInUTC = new Date().getUTCDate();
    setTimeout(callback, dayInUTC * 1000)
}

higherOrderAsync(() => {
    console.log("Callback called");
});