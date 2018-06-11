const express = require('express');
const bodyParser = require('body-parser');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const theRoot = require('./controllers/theroot'); 

const cors = require('cors');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();

const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'curtisdunne',
    password : '',
    database : 'smart-brain'
  }
});

app.use(cors());
app.use(bodyParser.json());

// Routes....
app.get('/', (req, res) => { theRoot.handleTheRoot(req, res, db) });

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) });

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt, saltRounds) });

app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) });

app.put('/image', (req, res) => { image.handleImage(req, res, db) });

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)});

///////////////////////////////////////

app.listen(3000, () => {
	console.log('app is running on port 3000');
});

/* 
ENDPOINTS: 

	/ --> res = 'this is working'
	/signin --> POST = success/fail
	/register --> POST = user
	/profile/:userId --> GET = user
	/image --> PUT = updated user

*/