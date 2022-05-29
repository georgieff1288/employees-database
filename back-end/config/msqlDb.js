const { Sequelize, DataTypes } = require('sequelize');

const { DATABASE } = require('./config');

const sequelize = new Sequelize(DATABASE, 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

try {
    sequelize.authenticate();
    console.log('Connected to mysql database!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

let db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('../models/user')(sequelize, DataTypes);
db.positions = require('../models/position')(sequelize, DataTypes);
db.departments = require('../models/department')(sequelize, DataTypes);
db.employees = require('../models/employee')(sequelize, DataTypes);

db.departments.hasMany(db.positions, {
    foreignKey: 'department_id',
    as: 'position'
});
db.positions.belongsTo(db.departments, {
    foreignKey: 'department_id',
    as: 'department'
});

db.positions.hasMany(db.employees, {
  foreignKey: 'position_id',
  as: 'employee'
});
db.employees.belongsTo(db.positions, {
  foreignKey: 'position_id',
  as: 'position'
});


module.exports = db;