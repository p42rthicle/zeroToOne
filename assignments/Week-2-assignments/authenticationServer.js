/**
You need to create a HTTP server in Node.js which will handle the logic of an authentication server.
- Don't need to use any database to store the data.

- Save the users and their signup/login data in an array in a variable
- You can store the passwords in plain text (as is) in the variable for now

The expected API endpoints are defined below,
1. POST /signup - User Signup
Description: Allows users to create an account. This should be stored in an array on the server, and a unique id should be generated for every new user that is added.
Request Body: JSON object with username, password, firstName and lastName fields.
Response: 201 Created if successful, or 400 Bad Request if the username already exists.
Example: POST http://localhost:3000/signup

2. POST /login - User Login
Description: Gets user back their details like firstname, lastname and id
Request Body: JSON object with username and password fields.
Response: 200 OK with an authentication token in JSON format if successful, or 401 Unauthorized if the credentials are invalid.
Example: POST http://localhost:3000/login

3. GET /data - Fetch all user's names and ids from the server (Protected route)
Description: Gets details of all users like firstname, lastname and id in an array format. Returned object should have a key called users which contains the list of all users with their email/firstname/lastname.
The users username and password should be fetched from the headers and checked before the array is returned
Response: 200 OK with the protected data in JSON format if the username and password in headers are valid, or 401 Unauthorized if the username and password are missing or invalid.
Example: GET http://localhost:3000/data

- For any other route not defined in the server return 404

Testing the server - run `npm run test-authenticationServer` command in terminal
*/

const express = require("express")
const app = express();
// const port = 3000;
var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

let users = [];
const JWT_SECRET = 'my-super-secret-key-this-is-a-test';

function generateId() {
  return Math.random().toString(36).substring(2, 14) + Date.now().toString(36);
}

app.use(bodyParser.json());

app.get('/', (req, res) => {
res.send('Welcome to authentication server');
});

// 1. POST /signup - User Signup
app.post('/signup', (req, res) => {
const { email, password, firstName, lastName } = req.body;

if (!email || !password || !firstName) {
  return res.status(400).send('Bad request: username, password and firstName are required');
} 
if (users.find(u => u.email === email)) {
  return res.status(400).send('Bad request: email already exists');
}

const newUser = {
  id: generateId(),
  email: email,
  password: password,
  firstName: firstName,
  lastName: lastName || ''
};
users.push(newUser);
res.status(201).send('Signup successful');
});

// 
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send('Bad Request: Missing credentials');
  }
  const user = users.find(u => u.email === email && u.password === password)
  // If no user is found or password is incorrect
  if (!user) {
    return res.status(401).send('Unauthorized: Invalid credentials');
  }

  const payload = {
    id: user.id,
    email: user.email
  }

  try {
    const token = jwt.sign(
      payload,
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    const userResponse = {
      authToken: token,
      //id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    }
    res.status(200).json(userResponse);
  }
  catch (err) {
    console.err('Error signing JWT: ', err)
    res.status(500).send('Internal Server error: Could not generate token')
  }
});

// GET /data - Get user data
app.get('/data', (req, res) => {
const emailHeader = req.headers.email;
const passwordHeader = req.headers.password;
const authHeader = req.headers.authorization;

if (!emailHeader || !passwordHeader) {
  return res.status(401).send('Unauthorized');
}

const authenticatedUser = users.find(u => u.email === emailHeader && u.password === passwordHeader);

if (!authenticatedUser) {
  return res.status(401).send('Unauthorized: Missing or Invalid credentials');
}

// -- Authorization successful as per tests ---
  const allUserData = users.map(u => ({
    id: u.id,
    firstName: u.firstName,
    lastName: u.lastName
  }));

res.status(200).json({users: allUserData});
return; 
if(!authHeader || !authHeader.startsWith('Bearer ')) {
  return res.status(401).send('Unauthorized: Missing or Invalid Authorization header (expecting Bearer token)');
}
const token = authHeader.split(' ')[1];

try {
  const decodedPayload = jwt.verify(token, JWT_SECRET);
  //  --- Authorization Succeeded ---
  console.log('Access granted to user: ', decodedPayload.username);
  const allUserData = users.map(u => ({
    id: u.id,
    firstName: u.firstName,
    lastName: u.lastName
  }));

  res.status(200).json({users: allUserData});
} catch (e) {
  if (e instanceof jwt.TokenExpiredError) {
    return res.status(401).send('Unauthorized: Token expired');
  }
  if (e instanceof jwt.JsonWebTokenError) {
    // Invalid signature, malformed token etc.
    return res.status(401).send('Unauthorized: Invalid token');
  }
  console.error("Error verifying JWT: ", e);
  return res.status(500).send('Internal server error: Could not verify JWT token');
}
});

app.use((req, res) => {
res.status(404).send('Route not found');
});

// app.listen(port, () => {
//   console.log(`Server started running on port ${port}`);
// });

module.exports = app;