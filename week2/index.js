const express = require('express');
const app = express();
const port = 3000;

function sum(count) {
    var sum = 0;
    for (let i=0; i<count; i++) {
        sum += i;
    }

    return sum;
}

function handleReq(req, res) {
    var num = req.query.num;
    var calculatedSum = sum(num);
    res.send("the sum is: " + calculatedSum);
} 

function started() {
    console.log(`Example app listening on port ${port}`)  
}
app.get('/', handleReq);

function postUser(req, res) {
    res.send('Create user hit');
}

app.post('/createUser', postUser);

app.get('/name', (req, res) => {
    res.send('This is the name route');
});

app.get('/2000', (req, res) => {
    res.send((2000).toString());
});

app.listen(port, started);