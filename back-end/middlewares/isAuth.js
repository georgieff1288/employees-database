const jwt = require('jsonwebtoken');

const db = require('../config/msqlDb');
const { SECRET, COOKIE_NAME } = require('../config/config');

function isAuth (req, res, next) {   
    let token = req.cookies[COOKIE_NAME]; 
    if(!token){
        res.status(401).json({
            message: 'Unauthorized'
        });  
    }
    else{
    let decodedToken = jwt.verify(token, SECRET);
    let dbUser = '';
    let sql = `SELECT * FROM users WHERE email = ?`;
    let query = db.query(sql, decodedToken.email, (err, result) => {
        if(err){
            res.status(500).json({
                message: 'Server error'
            });           
        }     
        dbUser = result[0];
        if(!dbUser){            
            res.status(401).json({
                message: 'Unauthorized'
            });  
        } 
    })
    next();
    }
}

module.exports = isAuth;