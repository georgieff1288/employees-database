const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const db = require('../config/msqlDb');
const { SECRET, COOKIE_NAME } = require('../config/config');


// login password for admin@abv.bg is 123456
router.post('/login', (req, res)=>{
    let user = {
        email: req.body.email,
        password: req.body.password
    }
    let sql = `SELECT * FROM users WHERE email = ?`;
    let query = db.query(sql, user.email, (err, result) => {
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
        if (!bcrypt.compareSync(user.password, dbUser.password)) {
            return res.status(401).json({
                message: 'Invalid credentials'
            })
        }
        let payloads = {
            email: dbUser.email
        };
        let options = {expiresIn: '2d'};

        let token = jwt.sign(payloads, SECRET, options);

        res.cookie(COOKIE_NAME, token);
        res.status(200).json({
            message: 'Login succes',
            userEmail: dbUser.email
        });    
    })
});

module.exports = router;