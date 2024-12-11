const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({
    origin:"*"
}))
require('dotenv').config();
require('./dbConfig/dbConfig');
app.use(express.json());

app.use(require('./Routes/Routes'));




app.listen('3001', () => {
    console.log("server running on 3001")
})