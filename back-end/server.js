const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');


const { PORT, DATABASE, SECRET } = require('./config')

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

const app = express();

app.use(cookieParser());

// app.use(cors({
//     origin: '*'
// }));

app.use(cors({origin: [
    "http://localhost:4200"
  ], credentials: true}));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());


app.post('/api/login', (req, res)=>{
    let user = {
        email: req.body.email,
        password: req.body.password
    }
    
    let sql = `SELECT * FROM users WHERE email = ? AND password = ?`;
    let query = db.query(sql, [user.email, user.password], (err, result) => {
        if(err){
            return res.status(500).json({
                message: 'Server error'
              })
        }     
        let dbUser = result[0];
        if(!dbUser){
            return res.status(401).json({
                message: 'Invalid credentials'
              })
        }
        let payloads = {
            id: dbUser.id,
            email: dbUser.email,
            password: dbUser.password
        };
        let options = {expiresIn: '2d'};

        let token = jwt.sign(payloads, SECRET, options);

        res.cookie('jwt', token);
        res.status(200).json({
            message: 'Login succes',
            userEmail: dbUser.email
        });    
    })
});




app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});