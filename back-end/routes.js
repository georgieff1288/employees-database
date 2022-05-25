const router = require('express').Router();

const employeesController = require('./controllers/employeesController');
const authController = require('./controllers/authController');


router.use('/api/employees', employeesController);
router.use('/api/auth', authController);

module.exports = router;