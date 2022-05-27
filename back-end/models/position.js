module.exports = (sequelize, DataTypes) => {

    const Position = sequelize.define("position", {
        position_id:{
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        position_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        department_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }   
    }, {
        tableName: 'positions',
        timestamps: false
    })

    return Position;
}