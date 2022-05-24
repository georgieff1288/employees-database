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

app.use(cors({origin: [
    "http://localhost:4200"
  ], credentials: true}));


app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

function isAuth(token){
    if(!token){
        return {status: 401, message: 'Unauthorized'}  
    }
    let decodedToken = jwt.verify(token, SECRET);
    let dbUser = '';
    let sql = `SELECT * FROM users WHERE email = ? AND password = ?`;
    let query = db.query(sql, [decodedToken.email, decodedToken.password], (err, result) => {
        if(err){
            return {status: 500, message: 'Server error'}            
        }     
        dbUser = result[0];
        if(!dbUser){            
            return {status: 401, message: 'Unauthorized'}  
        } 
    })
}


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

app.get('/api/employees', (req, res)=>{
    let token = req.cookies.jwt;
    let auth = isAuth(token);
    if(auth){
        return res.status(auth.status).json({
            message: auth.message
        })
    }
    
    let sql = 'SELECT * FROM employees INNER JOIN departments ON employees.department_id=departments.id ORDER BY name ASC';    
    let query = db.query(sql, (err, result) => {
        if(err){
            console.log(err);
        }
        console.log(result);
        res.send(result)
    })
})


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});