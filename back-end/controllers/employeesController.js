const router = require('express').Router();

const db = require('../config/msqlDb');
const fieldsValidator = require('../utils/fieldsValidator');
const isAuth = require('../middlewares/isAuth');


router.get('/employees', isAuth, (req, res)=>{   
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

router.get('/employee/:id', isAuth, (req, res)=>{
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

router.put('/update-employee/:id', isAuth, (req, res)=>{     
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

router.delete('/delete-employee/:id', isAuth, (req, res)=>{      
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

router.post('/add-employee', isAuth, (req, res)=>{
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


module.exports = router;