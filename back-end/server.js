const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { PORT } = require('./config')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employees'
});

db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('Connected to mysql database!');
})

const app = express();

app.use(cors({
    origin: '*'
}));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());







app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});