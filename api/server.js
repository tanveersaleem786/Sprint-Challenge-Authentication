const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session');
const knexSessionStore = require("connect-session-knex")(session);
const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

const server = express();

const sessionConfig = {
    name: 'userInfo',
    secret: 'myspeshulsecret',
    cookie: {
        maxAge: 3600 * 1000,
        secure: false, // should be true in production.
        httpOnly: true, // only allow access of cookie to server over http. Javascript does not allow to access this cookie.
    },
   
    resave: false,
    saveUninitialized: false,

    store: new knexSessionStore( 
        {
            knex: require("../database/dbConfig.js"),
            tablename: "sessions",
            sidfieldname: "sid",
            createtable: true,
            clearInterval: 3600 * 1000
        }
    )
}

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(session(sessionConfig));

server.use('/api/auth', authRouter);
server.use('/api/jokes', jokesRouter);
//server.use('/api/jokes', authenticate, jokesRouter);

server.use((req, res) => {
    res.status(404).json({message: "Route not found"})
})

server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({error: "Something went wrong"})
})

module.exports = server;
