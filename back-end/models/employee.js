module.exports = (sequelize, DataTypes) => {

    const Employee = sequelize.define("employee", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        position_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        salary: {
            type: DataTypes.STRING,
            allowNull: false
        },   
    }, {
        tableName: 'employees',
        timestamps: false
    })

    return Employee;
}