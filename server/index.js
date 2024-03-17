/* Application */
const express = require('express');
const app = express();
const cors = require('cors');

// Parse JSON and URL-encoded bodies
const bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* Authentication */
const crypto = require('crypto');
const User = require('./models/user');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const secretKey = crypto.randomBytes(32).toString('hex');

app.use(session({
    secret: secretKey,
    resave: true,
    saveUninitialized: true
}));

// Passport configuration and initialization
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/* Database */
const { InitiateMongoServer } = require('./db');
InitiateMongoServer();

/* Config */
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

/* Configure Route Handlers */
app.use(cors({
    origin: 'http://localhost:8081',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

/* Routes */
const bookRoutes = require('./routes/protected/bookRoutes');
const authRoutes = require('./routes/unprotected/authRoutes');


app.get('/', (req, res) => {
    res.send("Welcome to taskmanagement app");
});

app.get('/login', (req, res) => {});

app.get('/register', (req, res) => {});

app.use('/', authRoutes);
app.use('/', bookRoutes);

/* Set local port */
const port = 3000;

app.listen(port, () => {
    console.log(`App is listening to port no ${port}`);
});


















