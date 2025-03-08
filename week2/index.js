const express = require('express');
var bodyParser = require('body-parser');
const app = express();
const port = 3000;
var numOfReqs = 0;

app.use(bodyParser.json());

// Interceptor
function middleware1(req, res, next) {
    console.log("Num of reqs: " + numOfReqs++);
    next();
}
app.use(middleware1);

function givePage(req, res) {
    res.send(`
        <head>
    <title>
        Hello from page
    </title>
</head>
<body>
    <b>Hi there Parth</b>
</body>
`);
}


function secondPage(req, res) {
    res.sendFile(__dirname + "/second.html");
}

function sum(count) {
    var sum = 0;
    for (let i=0; i<=count; i++) {
        sum += i;
    }

    return sum;
}

function factorial(count) {
    var fact = 1;
    for (let i=1; i<=count; i++) {
        fact *= i;
    }

    return fact;
}

function handleReq(req, res) {
    var num = req.query.num;
    var calculatedSum = sum(num);

    res.send({"sum": calculatedSum});
} 

function handleHeaderReq(req, res) {
    var num = req.headers.num;
    if (num < 1000000) {
        var calculatedSum = sum(num);
    res.send("the sum is: " + calculatedSum);
    } else {
        res.status(411).send("You have sent very big number");
    }
}

function started() {
    console.log(`Example app listening on port ${port}`)  
}

app.get('/', (req, res) => {
    res.send('POST - /handleSum');
});

function handleBodyReq(req, res) {
    console.log(req.body);
    res.status(304).send(req.body['email']);
}

function returnJsonObj(req, res) {
    var counter = req.body.counter;
    var calculatedSum = sum(counter);
    var fact = factorial(counter);

    res.status(200).send({
        sum: calculatedSum,
        factorial: fact
    });
}

app.post('/handleHeaderSum', handleHeaderReq);
app.get('/handleSum', handleReq);
app.get('/secondHtml', secondPage);

app.post('/handleBodyReq', handleBodyReq);

function postUser(req, res) {
    res.send('Create user hit');
}

app.post('/createUser', postUser);
app.get('/jsonBodySum', returnJsonObj);

app.get('/name', (req, res) => {
    res.send('This is the name route');
});

app.get('/2000', (req, res) => {
    res.send((2000).toString());
});

app.get('/htmlPage', givePage);

app.listen(port, started);