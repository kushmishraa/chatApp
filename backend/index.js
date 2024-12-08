const express = require('express');
const app = express();
require('dotenv').config();
require('./dbConfig/dbConfig');
app.use(express.json());

app.use(require('./Routes/Routes'));




app.listen('3000', () => {
    console.log("server running on 3000")
})