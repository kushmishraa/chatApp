const express = require('express');
const cors = require('cors');
const http = require('http');

const app = express();
app.use(cors({
    origin: "*"
}))
require('dotenv').config();
require('./dbConfig/dbConfig');
app.use(express.json());

app.use(require('./Routes/Routes'));
const server = http.createServer(app);

app.locals.server = server;

server.listen('3001', () => {
    console.log("server running on 3001")
})

module.exports = app;