const jwt = require('jsonwebtoken');

const db = require('../config/msqlDb');
const { SECRET, COOKIE_NAME } = require('../config/config');
const User = db.users;

const isAuth = async (req, res, next) => {   
    let token = req.cookies[COOKIE_NAME]; 
    if(!token){
        return res.status(401).json({
            message: 'Unauthorized'
        });  
    }
    let decodedToken = jwt.verify(token, SECRET);
    let dbUser = await User.findOne({where: { email: decodedToken. email}});
    if(!dbUser){            
        return res.status(401).json({
            message: 'Unauthorized'
        });  
    } 
    next();
}

module.exports = isAuth;