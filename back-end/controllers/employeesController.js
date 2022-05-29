const router = require('express').Router();

const employee = require('../services/employee');
const fieldsValidator = require('../utils/fieldsValidator');
const isAuth = require('../middlewares/isAuth');


router.get('/employees', isAuth, (req, res)=>{   
    employee.getAllEmployees().then((response) => {
        res.send(response)
    }). catch((err) => {
        console.log(err);
        return res.status(500).json({
            message: 'Server error'
        });
    });
});

router.get('/employee/:id', isAuth, (req, res)=>{
    let id = req.params.id;
    employee.getEmployeeById(id).then((response) => {
        res.send(response);
    }).catch((err) => {
        console.log(err);
        return res.status(500).json({
            message: 'Server error'
        });
    });
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
    employee.updateEmployee(emp, id).then(() => {
        return res.status(200).json({
            message: 'Field updated successfully'
        });
    }).catch((err) => {
        console.log(err);
        return res.status(500).json({
            message: 'Server error'
        });
    });
});

router.delete('/delete-employee/:id', isAuth, (req, res)=>{      
    let id = req.params.id;
    employee.deleteEmployee(id).then(() => {
        return res.status(200).json({
            message: 'Field deleted successfully'
        });
    }).catch((err) => {
        console.log(err);
        return res.status(500).json({
            message: 'Server error'
        });
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
    employee.addEmployee(emp).then(() => {
        return res.status(200).json({
            message: 'The employee was added successfully'
        });
    }).catch((err) => {
        console.log(err);
        return res.status(500).json({
            message: 'Server error'
        });
    });
});


module.exports = router;