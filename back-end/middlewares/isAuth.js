const jwt = require('jsonwebtoken');

const { SECRET, COOKIE_NAME } = require('../config/config');
const auth = require('../services/auth');

const isAuth = (req, res, next) => {   
    let token = req.cookies[COOKIE_NAME]; 
    if(!token){
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
    let decodedToken = jwt.verify(token, SECRET);    
    auth.getUser(decodedToken.email).then((response) => {
        if(!response){            
            return res.status(401).json({
                message: 'Unauthorized'
            });  
        } 
        next();
    }).catch((err) => {
        console.log(err);
        return res.status(500).json({
            message: 'Server error'
        });
    }); 
}

module.exports = isAuth;