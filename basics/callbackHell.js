function getMedicines() {
    console.log("Get me meds")
    setTimeout(function getMed1() {
        console.log("1st med recd")
        setTimeout(function getMed2() {
            console.log("2nd med recd")
            setTimeout(function getMed3() {
                console.log("3rd med recd")
            }, 3000)
        }, 2000)
    }, 1000)
}

function med1Got() {
    console.log("got med1")
}

function med2Got() {
    console.log("got med2")
}

function med3Got() {
    console.log("got med3")
}

function getMedicinesFaster() {
    setTimeout(med1Got, 1000)
    setTimeout(med2Got, 2000)
    setTimeout(med3Got, 3000)
}

