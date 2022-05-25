const mysql = require('mysql');
const { DATABASE } = require('./config');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: DATABASE
});

db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('Connected to mysql database!');
})

module.exports = db;