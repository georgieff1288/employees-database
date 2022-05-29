const db = require('../config/msqlDb');
let Position = db.positions;
let Employee = db.employees;
let Department = db.departments;

const getAllEmployees = async () => {
    let employees = await Employee.findAll({
        include: [{
            model: Position,
            as: 'position',
            include: [{
                model: Department,
                as: 'department'
            }]
        }]
    });
    return employees
};



module.exports = {
    getAllEmployees,
}