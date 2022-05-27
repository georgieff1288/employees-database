function fieldsValidator (emp) {
    if(!emp.name || !emp.address || !emp.phone || !emp.position_id || !emp.salary){
        return {status: 400, message: 'All fields required'}  
    }
    return;
};

module.exports = fieldsValidator;