const db = require('../config/msqlDb');
const Position = db.positions;
const Employee = db.employees;
const Department = db.departments;

const getAllEmployees = async () => {
    let employees = await Employee.findAll({
        order: [
            ['name', 'ASC']
        ],
        include: [{
            model: Position,
            as: 'position',
            include: [{
                model: Department,
                as: 'department'
            }]
        }]
    });
    return employees;
};

const getEmployeeById = async (id) => {   
    let employee = await Employee.findByPk(
        id,
        {include: [{
            model: Position,
            as: 'position',
            include: [{
                model: Department,
                as: 'department'
            }]
        }]}
    );
    return employee;
};

const updateEmployee = async (emp, id) => {    
    await Employee.update(emp,{where: {id: id}});
};

const deleteEmployee = async (id) => {
    await Employee.destroy({where: {id: id}});
};

const addEmployee = async (emp) => {        
    await Employee.create(emp);
};



module.exports = {
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
    addEmployee,
}