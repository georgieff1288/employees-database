module.exports = (sequelize, DataTypes) => {

    const Department = sequelize.define("department", {
        department_id:{
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        department_name: {
            type: DataTypes.STRING,
            allowNull: false
        }  
    }, {
        tableName: 'departments',
        timestamps: false
    })

    return Department;
}