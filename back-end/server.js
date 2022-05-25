const express = require('express');
const jwt = require('jsonwebtoken');

const db = require('./config/msqlDb');
const { PORT, SECRET } = require('./config/config')

const app = express();
require('./config/express')(app);

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
    return;
}

function fieldsValidator(emp){
    if(!emp.name || !emp.address || !emp.phone || !emp.position_id || !emp.salary){
        return {status: 400, message: 'All fields required'}  
    }
    return;
};


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
    let sql = 'SELECT * FROM employees INNER JOIN positions ON employees.position_id=positions.position_id INNER JOIN departments ON positions.department_id=departments.department_id ORDER BY name ASC';    
    let query = db.query(sql, (err, result) => {
        if(err){
            console.log(err);
            return res.status(500).json({
                message: 'Server error'
            })
        }
        res.send(result)
    })
});

app.get('/api/employee/:id', (req, res)=>{
    let token = req.cookies.jwt;
    let auth = isAuth(token);
    if(auth){
        return res.status(auth.status).json({
            message: auth.message
        })
    }
    let data = req.params.id;
    let sql = 'SELECT * FROM employees INNER JOIN positions ON employees.position_id=positions.position_id WHERE id = ?';    
    let query = db.query(sql, data, (err, result) => {
        if(err){
            console.log(err);
            return res.status(500).json({
                message: 'Server error'
            })
        }
        res.send(result)
    })
});

app.put('/api/update-employee/:id', (req, res)=>{
    let token = req.cookies.jwt;
    let auth = isAuth(token);
    if(auth){
        return res.status(auth.status).json({
            message: auth.message
        })
    }       
    let id = req.params.id;
    let emp = req.body;
    let isValid = fieldsValidator(emp);
    if(isValid){
        return res.status(isValid.status).json({
            message: isValid.message
        })
    }    
    let sql = 'UPDATE employees SET name=?, address=?, phone=?, position_id=?, salary=? WHERE id=?';
    let query = db.query(sql, [emp.name, emp.address, emp.phone, emp.position_id, emp.salary, id], (err, result) => {
        if(err){
            console.log(err);
            return res.status(500).json({
                message: 'Server error'
            })
        }
        return res.status(200).json({
            message: 'Field updated successfully'
        })
    })
});

app.delete('/api/delete-employee/:id', (req, res)=>{
    let token = req.cookies.jwt;
    let auth = isAuth(token);
    if(auth){
        return res.status(auth.status).json({
            message: auth.message
        })
    }        
    let id = req.params.id;    
    let sql = 'DELETE FROM  employees WHERE id=?';    
    let query = db.query(sql, id, (err, result) => {
        if(err){
            console.log(err);
            return res.status(500).json({
                message: 'Server error'
            })
        }
        if(result.affectedRows == 0){
            return res.status(404).json({
                message: 'An employee with such id was not found'
            })
        }
        return res.status(200).json({
            message: 'Field deleted successfully'
        })
    })
});

app.post('/api/add-employee', (req, res)=>{
    let token = req.cookies.jwt;
    let auth = isAuth(token);
    if(auth){
        return res.status(auth.status).json({
            message: auth.message
        })
    } 
    let emp = req.body;
    let isValid = fieldsValidator(emp);
    if(isValid){
        return res.status(isValid.status).json({
            message: isValid.message
        })
    }    
    let sql = 'INSERT INTO employees (name, address, phone, position_id, salary) VALUES(?, ?, ?, ?, ?)';
    let query = db.query(sql, [emp.name, emp.address, emp.phone, emp.position_id, emp.salary], (err, result) => {
        if(err){
            console.log(err);
            return res.status(500).json({
                message: 'Server error'
            })
        }
        return res.status(200).json({
            message: 'The employee was added successfully'
        })
    })
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});