const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const { SECRET, COOKIE_NAME } = require('../config/config');
const getUser = require('../services/auth');


// login password for admin@abv.bg and admin2@abv.bg is 123456
router.post('/login', (req, res)=>{
    let user = {
        email: req.body.email,
        password: req.body.password
    }
    getUser(user.email).then((response)=>{
        if(!response){
            return res.status(401).json({
                message: 'Invalid credentials'
            });
        }
        if (!bcrypt.compareSync(user.password, response.password)) {
            return res.status(401).json({
                message: 'Invalid credentials'
            });
        }
        let payloads = {
            email: response.email
        };
        let options = {expiresIn: '2d'};
        let token = jwt.sign(payloads, SECRET, options);
        res.cookie(COOKIE_NAME, token);
        res.status(200).json({
            message: 'Login succes',
            userEmail: response.email
        });  
    }).catch((err) => {
        console.log(err);
        return res.status(500).json({
            message: 'Server error'
          });
    });
});

module.exports = router;