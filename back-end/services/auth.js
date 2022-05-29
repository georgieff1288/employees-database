const db = require('../config/msqlDb');
const User = db.users;


const getUser = async (email) => {    
    let result = await User.findOne({where: {email: email}});
    return result
} 

module.exports = getUser;