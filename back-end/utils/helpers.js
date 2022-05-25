const jwt = require('jsonwebtoken');

const db = require('../config/msqlDb');
const { SECRET } = require('../config/config');

const isAuth = (token) => {
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
    return;
}

const fieldsValidator = (emp) => {
    if(!emp.name || !emp.address || !emp.phone || !emp.position_id || !emp.salary){
        return {status: 400, message: 'All fields required'}  
    }
    return;
};

module.exports = {
    isAuth,
    fieldsValidator
}