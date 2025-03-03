function printSingleFullRow(n) {
    var str = "";
    for (var i=0; i<n; i++) {
        str += "*";
    }
    console.log(str);
}

function printPartialRow(n) {
    var str = "*";
    for (var i=0; i<n-2; i++) {
        str += " "
    }
    str += "*"
    console.log(str)
}

function printPattern1(n) {
    printSingleFullRow(n);
    for (var i=0; i<n-2; i++) printPartialRow(n);
    printSingleFullRow(n);
}

printPattern1(5);